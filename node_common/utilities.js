import * as Environment from "~/node_common/environment";
import * as Strings from "~/common/strings";
import * as Constants from "~/node_common/constants";

import JWT from "jsonwebtoken";
import BCrypt from "bcrypt";

import { Buckets, PrivateKey } from "@textile/hub";

const BUCKET_NAME = "data";

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export const checkTextile = async () => {
  try {
    const response = await fetch("https://slate.textile.io/health", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const getIdFromCookie = (req) => {
  let id = null;
  if (Strings.isEmpty(req.headers.cookie)) {
    return id;
  }

  const token = req.headers.cookie.replace(
    /(?:(?:^|.*;\s*)WEB_SERVICE_SESSION_KEY\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (!Strings.isEmpty(token)) {
    try {
      const decoded = JWT.verify(token, Environment.JWT_SECRET);
      id = decoded.id;
    } catch (e) {
      console.log(e);
    }
  }

  return id;
};

export const encryptPassword = async (text, salt) => {
  if (!text) {
    return null;
  }

  let hash = text;
  for (let i = 0; i < Environment.LOCAL_PASSWORD_ROUNDS_MANUAL; i++) {
    hash = await BCrypt.hash(hash, salt);
  }
  hash = await BCrypt.hash(hash, Environment.LOCAL_PASSWORD_SECRET);

  return hash;
};

export const parseAuthHeader = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  var matches = value.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
};

// NOTE(jim): Requires @textile/hub
export const getBucketAPIFromUserToken = async (token) => {
  const identity = await PrivateKey.fromString(token);

  // NOTE(jim): If the staging variable is present, use a different host.
  // You will be on a separate network.
  let buckets;
  if (!Strings.isEmpty(Environment.TEXTILE_HUB_STAGING_HOST)) {
    buckets = await Buckets.withKeyInfo(TEXTILE_KEY_INFO, {
      host: Environment.TEXTILE_HUB_STAGING_HOST,
    });
  } else {
    buckets = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  }

  await buckets.getToken(identity);
  const target = await buckets.getOrInit(BUCKET_NAME);

  return {
    buckets,
    bucketKey: target.root.key,
    bucketRoot: target,
    bucketName: BUCKET_NAME,
  };
};

export const getFileName = (s) => {
  let target = s;
  if (target.endsWith("/")) {
    target = target.substring(0, target.length - 1);
  }

  return target.substr(target.lastIndexOf("/") + 1);
};

export const createFolder = ({ id, name }) => {
  return {
    decorator: "FOLDER",
    id,
    folderId: id,
    icon: "FOLDER",
    name: name ? name : getFileName(id),
    pageTitle: `Exploring ${getFileName(id)}`,
    date: null,
    size: null,
    children: [],
  };
};

export const updateStateData = async (state, newState) => {
  return {
    ...state,
    ...newState,
  };
};
