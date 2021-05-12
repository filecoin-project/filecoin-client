import * as Actions from "~/common/actions";
import * as Store from "~/common/store";
import * as Constants from "~/common/constants";
import * as Credentials from "~/common/credentials";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";

import { encode } from "blurhash";

const STAGING_DEAL_BUCKET = "stage-deal";

const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image) => {
  let ratio = Math.min(100 / image.height, 100 / image.width);
  image.height = image.height * ratio;
  image.width = image.width * ratio;
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.scale(ratio, ratio);
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (imageUrl) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

// NOTE(jim): We're speaking to a different server now.
const getCookie = (name) => {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
};

export const upload = async ({
  fileId = null,
  file,
  context,
  bucketName,
  routes,
  excludeFromLibrary,
}) => {
  let formData = new FormData();
  const HEIC2ANY = require("heic2any");

  // NOTE(jim): You must provide a file from an type="file" input field.
  if (!file) {
    return null;
  }

  const isZipFile =
    file.type.startsWith("application/zip") || file.type.startsWith("application/x-zip-compressed");
  const isUnityFile = await Validations.isUnityFile(file);

  // TODO(jim): Put this somewhere else to handle conversion cases.
  if (file.type.startsWith("image/heic")) {
    const converted = await HEIC2ANY({
      blob: file,
      toType: "image/png",
      quality: 1,
    }); //TODO(martina): figure out how to cancel an await if upload has been cancelled

    formData.append(fileId, converted);
  } else {
    formData.append(fileId, file);
  }

  if (Store.checkCancelled(`${file.lastModified}-${file.name}`)) {
    return;
  }

  const _privateUploadMethod = (path, file) =>
    new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();

      window.addEventListener(`cancel-${file.lastModified}-${file.name}`, () => {
        XHR.abort();
      });

      XHR.open("post", path, true);
      XHR.setRequestHeader("authorization", getCookie(Credentials.session.key));
      XHR.onerror = (event) => {
        console.log(event);
        XHR.abort();
      };

      // NOTE(jim): UPLOADS ONLY.
      XHR.upload.addEventListener(
        "progress",
        (event) => {
          if (!context) {
            return;
          }

          if (event.lengthComputable) {
            console.log("FILE UPLOAD PROGRESS", event);
            context.setState({
              fileLoading: {
                ...context.state.fileLoading,
                [`${file.lastModified}-${file.name}`]: {
                  name: file.name,
                  loaded: event.loaded,
                  total: event.total,
                },
              },
            });
          }
        },
        false
      );

      window.removeEventListener(`cancel-${file.lastModified}-${file.name}`, () => XHR.abort());

      XHR.onloadend = (event) => {
        console.log("FILE UPLOAD END", event);
        try {
          return resolve(JSON.parse(event.target.response));
        } catch (e) {
          return reject({
            error: "SERVER_UPLOAD_ERROR",
            failedFile: file,
          });
        }
      };
      console.log(formData);
      XHR.send(formData);
    });

  const storageDealRoute =
    routes && routes.storageDealUpload ? `${routes.storageDealUpload}/api/deal/` : null;
  const generalRoute = routes && routes.upload ? `${routes.upload}/api/data/` : null;
  const zipUploadRoute = routes && routes.uploadZip ? `${routes.uploadZip}/api/data/zip/` : null;

  if (!storageDealRoute || !generalRoute || !zipUploadRoute) {
    Events.dispatchMessage({ message: "We could not find our upload server." });

    return {
      decorator: "NO_UPLOAD_RESOURCE_URI_ATTACHED",
      error: true,
    };
  }

  let res;
  if (isZipFile && isUnityFile) {
    res = await _privateUploadMethod(`${zipUploadRoute}${file.name}`, file);
  } else if (bucketName && bucketName === STAGING_DEAL_BUCKET) {
    res = await _privateUploadMethod(`${storageDealRoute}${file.name}`, file);
  } else {
    res = await _privateUploadMethod(`${generalRoute}${file.name}`, file);
  }

  if (!res?.data || res.error) {
    if (context) {
      await context.setState({
        fileLoading: {
          ...context.state.fileLoading,
          [`${file.lastModified}-${file.name}`]: {
            name: file.name,
            failed: true,
          },
        },
      });
    }
    Events.dispatchMessage({ message: "Some of your files could not be uploaded" });

    return !res ? { decorator: "NO_RESPONSE_FROM_SERVER", error: true } : res;
  }

  let item = res.data.data;
  if (item.data.type.startsWith("image/")) {
    let url = Strings.getURLfromCID(item.cid);
    try {
      let blurhash = await encodeImageToBlurhash(url);
      item.data.blurhash = blurhash;
    } catch (e) {
      console.log(e);
    }
  }

  return item;
};
