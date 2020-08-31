// @params: { endpoint?, file, headers?, postParams,onProgress, onFinish, onFailure }
export class Uploader {
  constructor(props) {
    this.file = props.file;
    this.headers = props.headers || {};
    this.endpoint = props.endpoint || `/api/data/chunks/${this.file.name}`;
    this.postParams = props.postParams;
    this.slate = props.slate;

    this.chunkSize = 0.2; // 5 megabytes
    this.totalChunks = Math.ceil(this.file.size / (this.chunkSize * 1024 * 1024));
    this.currentChunk = 0;
    this.retries = 5;
    this.retriesCount = 0;
    this.delayBeforeRetry = 500;

    this.headers["uploader-file-id"] = this._getUniqId(this.file.size);
    this.headers["uploader-chunks-total"] = this.totalChunks;
    this.headers["uploader-file-extension"] = this.file.name.split(".").pop();

    this.paused = false;

    //Handlers
    this.onProgress = props.onProgress;
    this.onFailure = props.onFailure;
    this.onTogglePause = props.onTogglePause;
  }

  upload = async () => {
    // NOTE(jim): You must provide a file from an type="file" input field.
    if (!this.file) {
      return null;
    }
    // TODO(jim): Put this somewhere else to handle conversion cases.
    // Note(Amine): We can handle conversions on server.
    const HEIC2ANY = require("heic2any");

    // Note(Amine) If file is small send it as two chunks
    // I think this will keep the UI consistent.
    if (this.file.size < this.chunkSize * 1024 * 1024) {
      this.chunkSize = this.file.size / 2 / 1024 / 1024;
      this.totalChunks = Math.ceil(this.file.size / (this.chunkSize * 1024 * 1024));
      this.headers["uploader-chunks-total"] = this.totalChunks;
    }

    if (this.file.type.startsWith("image/heic")) {
      const converted = await HEIC2ANY({
        blob: file,
        toType: "image/png",
        quality: 1,
      });

      this.file = converted;
    }

    const res = await this._sendChunks();

    let json = {};
    try {
      json = await res.json();
    } catch (e) {
      json = {
        error: "SERVER_UPLOAD_ERROR",
      };
    }

    if (!json || json.error || !json.data) {
      console.log("FAILED HERE", json);
      this.onFailure();
    }

    if (this.slate) {
      const addResponse = await fetch(`/api/slates/add-url`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slate: this.slate, data: { title: file.name, ...json.data } }),
      });

      if (!addResponse || addResponse.error) {
        console.log(addResponse.error);
        alert("TODO: Adding an image to Slate went wrong.");
      }
    }

    return json;
  };

  togglePause = () => {
    this.paused = !this.paused;
    this.onTogglePause(this.paused);
  };

  _getUniqId() {
    return Math.floor(Math.random() * 100000000) + Date.now() + this.file.size;
  }

  _sendChunks = async () => {
    if (this.paused) {
      await this._sleepWhilePause();
    }

    try {
      const chunk = await this._getChunk();
      const res = await this._sendChunk(chunk);

      if ([200, 201].includes(res.status)) {
        this.currentChunk++;
        if (this.onProgress) {
          const percentProgress = Math.round((100 / this.totalChunks) * this.currentChunk);
          this.onProgress(percentProgress, this.togglePause);
        }

        if (this.currentChunk < this.totalChunks) {
          return await this._sendChunks();
        } else {
          console.log("UPLOAD EVENT FINISHED", res);
          return res;
        }
      }

      return await this._manageRetries();
    } catch (error) {
      return await this._manageRetries();
    }
  };

  _sleepWhilePause = async () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!this.paused) {
          resolve("");
          clearInterval(interval);
        }
      });
    });
  };

  _getChunk = async () => {
    return new Promise((resolve) => {
      const length = this.totalChunks === 1 ? file.size : this.chunkSize * 1024 * 1024;
      const start = length * this.currentChunk;
      const _reader = new FileReader();

      _reader.onload = () => {
        const chunk = new Blob([_reader.result], {
          type: "application/octet-stream",
        });
        resolve(chunk);
      };
      _reader.readAsArrayBuffer(this.file.slice(start, start + length));
    });
  };

  _sendChunk = async (chunk) => {
    const form = new FormData();
    form.append("file", chunk);
    this.headers["uploader-chunk-number"] = this.currentChunk;
    return await fetch(this.endpoint, {
      method: "POST",
      headers: this.headers,
      body: form,
    });
  };

  _timeout = (fn, ms) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        fn().then(resolve).catch(reject);
      }, ms)
    );
  };

  _manageRetries = async () => {
    if (this.retriesCount++ < this.retries) {
      console.log(`FILE UPLOAD FAILURE ${this.retries - this.retriesCount} retries left `);
      return await this._timeout(this._sendChunks, this.delayBeforeRetry);
    }
    console.log("FILE UPLOAD FAILED");
    this.onFailure();
  };
}
