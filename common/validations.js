import * as Strings from "~/common/strings";

import JSZip from "jszip";

const USERNAME_REGEX = new RegExp("^[a-zA-Z0-9_]{0,}[a-zA-Z]+[0-9]*$");
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[\w.!#$%&'*+\/=?^_`{|}~-]+@[-a-zA-Z0-9_.]+?\.[a-zA-Z]{2,50}$/;
const CONTAINS_DIGIT_REGEX = /\d/;
const CONTAINS_UPPERCASE_REGEX = /[A-Z]/;
const CONTAINS_LOWERCASE_REGEX = /[a-z]/;
const CONTAINS_SYMBOL_REGEX = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
const PIN_REGEX = /^[0-9]{6}$/;
// const URL_REGEX = /(http(s)?:\/\/.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/=]*)/;
const IFRAMELY_URL_REGEX = /^https?:\/\//i;

// TODO(jim): Regex should cover some of this.
const REJECT_LIST = [
  "..",
  "$",
  "#",
  "_",
  "_next",
  "next",
  "webpack",
  "system",
  "experience",
  "root",
  "www",
  "website",
  "index",
  "api",
  "public",
  "static",
  "admin",
  "administrator",
  "webmaster",
  "download",
  "downloads",
  "403",
  "404",
  "500",
  "maintenance",
  "guidelines",
  "updates",
  "login",
  "authenticate",
  "sign-in",
  "sign_in",
  "signin",
  "log-in",
  "log_in",
  "logout",
  "terms",
  "terms-of-service",
  "community",
  "privacy",
  "reset-password",
  "reset",
  "logout",
  "dashboard",
  "analytics",
  "data",
  "timeout",
  "please-dont-use-timeout",
];

export const userRoute = (text) => {
  if (!USERNAME_REGEX.test(text)) {
    return false;
  }

  if (REJECT_LIST.includes(text)) {
    return false;
  }

  return true;
};

export const slatename = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length > 48) {
    return false;
  }

  return true;
};

export const username = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length > 48 || text.length < 1) {
    return false;
  }

  if (!userRoute(text)) {
    return false;
  }

  return true;
};

export const email = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length > 254 || text.length < 5) {
    return false;
  }

  if (!EMAIL_REGEX.test(text)) {
    return false;
  }

  //NOTE(toast): add this if the sendgrid plan is upgraded
  //  const sgEmailValidation = validateEmail({ email: text });
  //  if (sgEmailValidation.verdict !== "Valid") {
  //    return false;
  //  }

  return true;
};

// NOTE(amine): used to validate old users password (currently only used in signin)
export const legacyPassword = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length < MIN_PASSWORD_LENGTH) {
    return false;
  }

  return true;
};

export const passwordForm = (text) => {
  const validations = {
    validLength: false,
    containsLowerCase: false,
    containsUpperCase: false,
    containsSymbol: false,
    containsNumbers: false,
  };

  if (Strings.isEmpty(text)) return validations;

  if (text.length >= MIN_PASSWORD_LENGTH) validations.validLength = true;
  if (CONTAINS_DIGIT_REGEX.test(text)) validations.containsNumbers = true;
  if (CONTAINS_LOWERCASE_REGEX.test(text)) validations.containsLowerCase = true;
  if (CONTAINS_UPPERCASE_REGEX.test(text)) validations.containsUpperCase = true;
  if (CONTAINS_SYMBOL_REGEX.test(text)) validations.containsSymbol = true;

  return validations;
};

export const password = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length <= MIN_PASSWORD_LENGTH) {
    return false;
  }

  let reqCount = 0;

  if (CONTAINS_DIGIT_REGEX.test(text)) {
    reqCount += 1;
  }
  if (CONTAINS_LOWERCASE_REGEX.test(text)) {
    reqCount += 1;
  }
  if (CONTAINS_UPPERCASE_REGEX.test(text)) {
    reqCount += 1;
  }
  if (CONTAINS_SYMBOL_REGEX.test(text)) {
    reqCount += 1;
  }

  return reqCount === 4;
};

export const endsWithAny = (options, string = "") =>
  options.some((option) => {
    if (string) {
      return string.endsWith(option);
    } else {
      return false;
    }
  });

export const verificationPin = (pin) => {
  if (Strings.isEmpty(pin)) {
    return false;
  }

  return PIN_REGEX.test(pin);
};

export const link = (text) => {
  if (Strings.isEmpty(text)) {
    return false;
  }

  if (text.length < 4) {
    return false;
  }

  return IFRAMELY_URL_REGEX.test(text);
};

export const isPreviewableImage = (type = "") => {
  if (type.startsWith("image/svg")) return false;

  return type.startsWith("image/");
};

export const isImageType = (type = "") => {
  return type.startsWith("image/");
};

export const isAudioType = (type = "") => {
  return type.startsWith("audio/");
};

export const isVideoType = (type = "") => {
  return type.startsWith("video/");
};

export const isPdfType = (type = "") => {
  return type.startsWith("application/pdf");
};

export const isEpubType = (type = "") => {
  return type.startsWith("application/epub");
};

export const isUnityType = (type = "") => {
  return type === "application/unity";
};

export const is3dFile = (filename = "") => {
  return endsWithAny(
    [".stl", ".obj", ".fbx", ".blend", ".c4d", ".glb", ".dae", ".3ds", ".wrl"],
    filename.toLowerCase()
  );
};

export const isCodeFile = (filename = "") => {
  return endsWithAny([".js"], filename.toLowerCase());
};

export const isFontFile = (fileName = "") => {
  return endsWithAny([".ttf", ".otf", ".woff", ".woff2"], fileName.toLowerCase());
};

export const isMarkdown = (filename = "", type = "") => {
  return filename.toLowerCase().endsWith(".md") || type.startsWith("text/plain");
};

export const isUnityFile = async (file) => {
  try {
    const zip = new JSZip();

    const contents = await zip.loadAsync(file);
    const fileNames = Object.keys(contents.files);

    // NOTE(daniel): every Unity game file will have this file
    const isUnityLoaderFile = (fileName) =>
      [/unityloader.js/i, /(.*)\.loader.js/i].some((item) => item.test(fileName));

    return fileNames.some((file) => isUnityLoaderFile(file));
  } catch (e) {
    return false;
  }
};
