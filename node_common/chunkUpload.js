import Busboy from "busboy";
import fs from "fs";
import mime from "mime-types";
import path from "path";
import { promisify } from "util";

// Experimental way to handle errors with status code
class ServerError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default class Uploader {
  constructor(props) {
    this.req = props.req;
    this.maxFileSize = props.maxFileSize;
    this.maxChunkSize = props.maxChunkSize;
    this.totalChunks = +this.req.headers["uploader-chunks-total"];
    this.fileId = this.req.headers["uploader-file-id"];
    this.fileExtension = this.req.headers["uploader-file-extension"];
    this.currentChunk = this.req.headers["uploader-chunk-number"];
    this.mime = mime.lookup(this.fileExtension); // Will be updated in the last chunk;

    this.tmpDir = "./tmp";
    this.postParams = {};
  }

  upload() {
    console.log(`CHUNK UPLOAD ${this.currentChunk}/${this.totalChunks - 1}`);

    return new Promise((resolve, reject) => {
      if (!this._checkHeaders()) {
        reject(new ServerError(400, "missing Headers"));
        return;
      }

      if (!this._checkTotalSize) {
        reject(new ServerError(413, "File is above size limit, Chunk number must be between 0 and total chunks - 1 (0 indexed)"));
        return;
      }
      try {
        let limitReached = false;
        let getFileStatus;

        const busboy = new Busboy({
          headers: this.req.headers,
          limits: { files: 1, fileSize: this.maxChunkSize * 1024 * 1024 },
        });

        busboy.on("file", (field, file) => {
          file.on("limit", () => {
            limitReached = true;
            file.resume();
          });
          getFileStatus = this._handleFile(file);
        });

        busboy.on("field", (key, val) => {
          console.log(`BUSBOY FIELD ${(key, val)}`);
        });

        busboy.on("finish", () => {
          if (limitReached) {
            reject(new ServerError(413, `Chunk is out of range, Chunk is too large. Max chunkSize is: ${this.maxChunkSize}MB`));
            retur;
          }

          getFileStatus((fileErr, assembleChunksF) => {
            if (fileErr) reject(fileErr);
            else {
              resolve(assembleChunksF);
            }
          });
        });
        this.req.pipe(busboy);
      } catch (error) {
        reject(error);
      }
    });
  }

  _checkTotalSize() {
    this.totalChunks = this.req.headers["uploader-chunks-total"];
    if (this.maxChunkSize * this.totalChunks > this.maxFileSize) return false;
    return true;
  }

  _assembleChunks(dirPath) {
    console.log("ASSEMBLING THEM CHUNKS");
    const asyncReadFile = promisify(fs.readFile);
    const asyncAppendFile = promisify(fs.appendFile);
    const assembledFile = path.join(this.tmpDir, `${this.fileId}.${this.fileExtension}`);
    console.log("ASSEMBLED FILES", assembledFile);
    let currentChunk = 0;

    return () => {
      return new Promise((resolve, reject) => {
        const pipeChunk = async () => {
          try {
            const chunk = await asyncReadFile(path.join(dirPath, currentChunk.toString()));
            await asyncAppendFile(assembledFile, chunk);

            if (this.totalChunks > ++currentChunk) await pipeChunk();
            else {
              this._cleanChunks(dirPath);
              resolve({ filePath: assembledFile, mime: this.mime });
            }
          } catch (err) {
            reject(err);
          }
        };

        pipeChunk();
      });
    };
  }

  _handleFile(file) {
    const dirPath = path.join(this.tmpDir, `${this.req.headers["uploader-file-id"]}_tmp`);
    const chunkPath = path.join(dirPath, this.req.headers["uploader-chunk-number"]);
    const currentChunk = +this.req.headers["uploader-chunk-number"];

    let error;
    let assembledChunksPromise;
    let finished = false;
    let writeStream;

    const writeFile = () => {
      writeStream = fs.createWriteStream(chunkPath);
      writeStream.on("error", (err) => {
        error = err;
        file.resume();
      });

      writeStream.on("close", () => {
        finished = true;

        // if all chunks are uploaded
        if (currentChunk === this.totalChunks - 1) {
          assembledChunksPromise = this._assembleChunks(dirPath);
        }
      });

      file.pipe(writeStream);
    };

    // make sure current chunk is in range of ids
    if (currentChunk < 0 || currentChunk >= this.totalChunks) {
      error = new ServerError(413, `Chunk is out of range, Chunk is too large. Max chunkSize is: ${this.maxChunkSize}MB`);
      file.resume();
    }

    // Create file upload dir if it's first chunk
    else if (currentChunk === 0) {
      this._mkdirIfDoesntExist(dirPath, (err) => {
        if (err) {
          error = err;
          file.resume();
        } else {
          writeFile();
        }
      });
    }

    // make sure dir exists if it's not the first chunk
    else {
      fs.stat(dirPath, (err) => {
        if (err) {
          // this error is triggered if a chunk with uploader-chunk-number header != 0
          // is sent and there is no corresponding temp dir.
          // It means that the upload dir has been deleted in the meantime.
          // Although uploads should be re`sumable, you can't keep partial uploads for days on your server
          error = new ServerError("Upload has expired", err);
          file.resume();
        } else {
          writeFile();
        }
      });
    }

    return (callback) => {
      if (finished && !error) callback(null, assembledChunksPromise);
      else if (error) callback(error);
      else {
        writeStream.on("error", callback);
        writeStream.on("close", () => callback(null, assembledChunksPromise));
      }
    };
  }

  _mkdirIfDoesntExist(dirPath, callback) {
    fs.stat(dirPath, (err) => {
      if (err) fs.mkdir(dirPath, callback);
      else callback();
    });
  }

  _checkHeaders() {
    const req = this.req;
    if (
      !req.headers["uploader-chunk-number"] ||
      !req.headers["uploader-chunks-total"] ||
      !req.headers["uploader-file-id"] ||
      !req.headers["uploader-chunks-total"].match(/^[0-9]+$/) ||
      !req.headers["uploader-chunk-number"].match(/^[0-9]+$/) ||
      !req.headers["uploader-file-id"].match(/^[0-9]+$/)
    )
      return false;
    return true;
  }

  _cleanChunks(dirPath) {
    fs.readdir(dirPath, (err, files) => {
      let filesLength = files.length;

      files.forEach((file) => {
        fs.unlink(path.join(dirPath, file), () => {
          if (--filesLength === 0) fs.rmdir(dirPath, () => {}); // cb does nothing but required
        });
      });
    });
  }

  _checkTotalSize(maxFileSize, maxChunkSize, totalChunks) {
    if (maxChunkSize * totalChunks > maxFileSize) return false;
    return true;
  }
}
