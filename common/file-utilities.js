
export const upload = async ({ file, slate, context, type = "lazy"/** type can be lazy(default) or parallel */ }) => {
  let formData = new FormData();
  const HEIC2ANY = require("heic2any");

  // NOTE(jim): You must provide a file from an type="file" input field.
  if (!file) {
    return null;
  }

  // TODO(jim): Put this somewhere else to handle conversion cases.
  if (file.type.startsWith("image/heic")) {
    const converted = await HEIC2ANY({
      blob: file,
      toType: "image/png",
      quality: 1,
    });

    formData.append("data", converted);
  } else {
    formData.append("data", file);
  }

  const _privateUploadMethod = (path) =>
    new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();
      XHR.open("post", path, true);
      XHR.onerror = (event) => {
        console.log(event);
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

      XHR.onloadend = (event) => {
        console.log("FILE UPLOAD END", event);
        try {
          return resolve(JSON.parse(event.target.response));
        } catch (e) {
          return resolve({
            error: "SERVER_UPLOAD_ERROR",
          });
        }
      };
      XHR.send(formData);
    });

  const json = await _privateUploadMethod(
    type === "lazy"
      ? `/api/data/${file.name}`
      : `/api/data/parallel/${file.name}`
  );
  if (!json || json.error || !json.data) {
    if (context) {
      context.setState({
        fileLoading: {
          ...context.state.fileLoading,
          [`${file.lastModified}-${file.name}`]: {
            name: file.name,
            failed: true,
          },
        },
      });
    }

    return !json ? { error: "NO_RESPONSE" } : json;
  }

  if (slate) {
    const addResponse = await fetch(`/api/slates/add-url`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slate, data: { title: file.name, ...json.data } }),
    });

    if (!addResponse || addResponse.error) {
      console.log(addResponse.error);
      alert("TODO: Adding an image to Slate went wrong.");
    }
  }

  return json;
};
