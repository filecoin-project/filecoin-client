import * as LibraryManager from "~/node_common/managers/library";
import * as Utilities from "~/node_common/utilities";
import * as Social from "~/node_common/social";

import B from "busboy";
import unzip from "unzip-stream";

const HIGH_WATER_MARK = 1024 * 1024 * 3;

const uploadZipToDirectory = ({ stream, token, path }) =>
  new Promise((resolve, reject) => {
    stream
      .pipe(unzip.Parse())
      .on("entry", async (entry) => {
        const fileName = entry.path;
        const filePath = `${path}/${fileName}`;
        if (entry.type === "File") {
          console.log(
            "UPLOADING FILE FROM ZIP",
            filePath,
            entry.type === "File"
          );
          const {
            buckets,
            bucketKey,
          } = await Utilities.getBucketAPIFromUserToken(token);
          await buckets.pushPath(
            bucketKey,
            filePath,
            {
              path: filePath,
              content: entry,
            },
            {
              progress: (num) => console.log("PROGRESS", num),
            }
          );
          console.log("UPLOADED FILE", fileName);
        }
        entry.autodrain();
      })
      .on("finish", async () => {
        const {
          buckets,
          bucketKey,
        } = await Utilities.getBucketAPIFromUserToken(token);
        const { item } = await buckets.listPath(bucketKey, path);
        console.log("FINISHED UPLAODING ZIPPED FILES", item.path);
        resolve({ path: { path: item.path } });
      })
      .on("error", (e) => reject(e));
  });

export const formMultipart = async (req, res, { user }) => {
  let data = null;
  // Note(Amine): there are multiple mime types for zips, we need to cover them.
  const isZipType = (mime) =>
    ["application/x-zip-compressed", "application/zip"].some(
      (item) => item === mime
    );

  const upload = () =>
    new Promise(async (resolve, reject) => {
      const form = new B({
        headers: req.headers,
        highWaterMark: HIGH_WATER_MARK,
      });

      form.on("file", async function (
        fieldname,
        stream,
        filename,
        encoding,
        mime
      ) {
        data = LibraryManager.createLocalDataIncomplete({
          name: filename,
          type: mime,
        });
        let push;
        try {
          const token = user.data.tokens.api;
          if (isZipType(mime)) {
            data.type = "Unity";
            push = await uploadZipToDirectory({ stream, path: data.id, token });
          } else {
            const {
              buckets,
              bucketKey,
            } = await Utilities.getBucketAPIFromUserToken(token);
            push = await buckets.pushPath(bucketKey, data.id, stream);
          }
        } catch (e) {
          Social.sendTextileSlackMessage({
            file: "/node_common/upload.js",
            user,
            message: e.message,
            code: e.code,
            functionName: `buckets.pushPath`,
          });

          return reject({
            decorator: "SERVER_BUCKETS_PUSH_ISSUE",
            error: true,
            message: e,
          });
        }

        return resolve({
          decorator: "SERVER_BUCKET_STREAM_SUCCESS",
          data: push.path.path,
        });
      });

      form.on("error", (e) =>
        reject({
          decorator: "SERVER_BUCKET_STREAM_FAILURE",
          error: true,
          message: e,
        })
      );

      req.pipe(form);
    });

  const response = await upload();

  if (response.error) {
    return response;
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  try {
    const token = user.data.tokens.api;
    const { buckets } = await Utilities.getBucketAPIFromUserToken(token, user);
    const newUpload = await buckets.listIpfsPath(response.data);
    data.size = newUpload.size;
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/node_common/upload.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listIpfsPath`,
    });

    return {
      decorator: "SERVER_BUCKETS_VERIFY_ISSUE",
      error: true,
      message: e,
    };
  }

  return { decorator: "SERVER_UPLOAD_SUCCESS", data, ipfs: response.data };
};
