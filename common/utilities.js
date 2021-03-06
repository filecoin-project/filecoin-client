import BCrypt from "bcryptjs";

import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";

//NOTE(martina): this file is for utility functions that do not involve API calls
//For API related utility functions, see common/user-behaviors.js
//And for uploading related utility functions, see common/file-utilities.js

export const getImageUrlIfExists = (file, sizeLimit = null) => {
  if (!file) return;
  const coverImage = file.data?.coverImage;
  if (coverImage) {
    if (sizeLimit && coverImage.data.size && coverImage.data.size > sizeLimit) {
      return;
    }
    if (coverImage?.data.url) {
      return coverImage.data.url;
    }
    if (coverImage?.cid) {
      return Strings.getURLfromCID(coverImage.cid);
    }
  }

  if (Validations.isPreviewableImage(file.data.type)) {
    if (sizeLimit && file.data.size > sizeLimit) {
      return;
    }
    return Strings.getURLfromCID(file.cid);
  }
};

export const getPublicAndPrivateFiles = ({ viewer }) => {
  let publicFileIds = [];
  for (let slate of viewer.slates) {
    if (slate.isPublic) {
      publicFileIds.push(...slate.objects.map((obj) => obj.id));
    }
  }

  let publicFiles = [];
  let privateFiles = [];
  let library = viewer.library || [];
  for (let file of library) {
    if (file.isPublic || publicFileIds.includes(file.id)) {
      publicFiles.push(file);
    } else {
      privateFiles.push(file);
    }
  }
  return { publicFiles, privateFiles };
};

export const generateNumberByStep = ({ min, max, step = 1 }) => {
  var numbers = [];
  for (var n = min; n <= max; n += step) {
    numbers.push(n);
  }

  const randomIndex = Math.floor(Math.random() * numbers.length);
  return numbers[randomIndex];
};

export const encryptPasswordClient = async (text) => {
  const salt = "$2a$06$Yl.tEYt9ZxMcem5e6AbeUO";
  let hash = text;
  const rounds = 5;

  for (let i = 1; i <= rounds; i++) {
    hash = await BCrypt.hash(text, salt);
  }

  return hash;
};

export const coerceToArray = (input) => {
  if (!input) {
    return [];
  }
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
};
