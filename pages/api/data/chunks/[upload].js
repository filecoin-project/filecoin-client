import fs from "fs";
import { promisify } from "util";
import Upload from "~/node_common/chunkUpload";
import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";
import * as MW from "~/node_common/middleware";
import * as Utilities from "~/node_common/utilities";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

// NOTE(jim): To support multipart request.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  try {
    const assembleChunks = await new Upload({ req, maxFileSize: 200, maxChunkSize: 10 }).upload();

    if (!assembleChunks) {
      return res.status(201).send({
        decorator: "SERVER_CHUNK_UPLOADED",
        data: {},
      });
    }

    // Note(Aminejvm) Handling the request after receiving the last chunk.
    const { mime, filePath } = await assembleChunks();
    const file = await promisify(fs.readFile)(filePath);

    const data = LibraryManager.createLocalDataIncomplete({
      name: "simo",
      type: mime,
    });

    const id = Utilities.getIdFromCookie(req);
    const user = await Data.getUserById({
      id,
    });

    const token = user.data.tokens.api;
    const { buckets, bucketKey } = await await Utilities.getBucketAPIFromUserToken(token);
    const {
      path: { path: ipfs },
    } = await buckets.pushPath(bucketKey, data.id, file);
    const newUpload = await await buckets.listIpfsPath(ipfs);
    data.size = newUpload.size;

    const finalData = LibraryManager.updateDataIPFS(data, {
      ipfs,
    });

    const updatedUserDataFields = LibraryManager.addData({
      user,
      data: finalData,
    });

    await Data.updateUserById({
      id: user.id,
      data: updatedUserDataFields,
    });

    // Cleaning file from local.
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`FILE DELETED AT ${filePath}`);
    });

    return res.status(200).send({
      decorator: "SERVER_UPLOAD",
      data: finalData,
    });
  } catch (err) {
    console.log("FILE UPLOAD ERROR", err);
    return res.status(err?.statusCode || 500).send({
      message: err?.message || "Internal Server Error",
    });
  }
};
