import * as Strings from "~/common/strings";
import * as Utilities from "~/common/utilities";

import JSZip from "jszip";

const USERNAME_REGEX = new RegExp("^[a-z0-9_]{0,}[a-z]+[0-9]*$");
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[\w.!#$%&'*+\/=?^_`{|}~-]+@[-a-zA-Z0-9_.]+?\.[a-zA-Z]{2,50}$/;
const CONTAINS_DIGIT_REGEX = /\d/;
const CONTAINS_UPPERCASE_REGEX = /[A-Z]/;
const CONTAINS_LOWERCASE_REGEX = /[a-z]/;
const CONTAINS_SYMBOL_REGEX = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
const PIN_REGEX = /^[0-9]{6}$/;

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

export const verificationPin = (pin) => {
  if (Strings.isEmpty(pin)) {
    return false;
  }

  return PIN_REGEX.test(pin);
};

export const isPreviewableImage = (type = "") => {
  if (type.startsWith("image/svg")) return false;

  return type.startsWith("image/");
};

export const isImageType = (type = "") => {
  if (type.startsWith("image/")) {
    return true;
  }
};

export const isAudioType = (type = "") => {
  if (type.startsWith("audio/")) {
    return true;
  }
};

export const isVideoType = (type = "") => {
  if (type.startsWith("video/")) {
    return true;
  }
};

export const isPdfType = (type = "") => {
  if (type.startsWith("application/pdf")) {
    return true;
  }
};

export const isEpubType = (type = "") => {
  if (type.startsWith("application/epub")) {
    return true;
  }
};

export const isFontFile = (fileName = "") => {
  return Utilities.endsWithAny([".ttf", ".otf", ".woff", ".woff2"], fileName.toLowerCase());
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
