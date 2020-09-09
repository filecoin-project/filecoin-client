import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";

import { Buckets, PrivateKey } from "@textile/hub";

import JWT from "jsonwebtoken";

const TEXTILE_KEY_INFO = {
  key: Environment.TEXTILE_HUB_KEY,
  secret: Environment.TEXTILE_HUB_SECRET,
};

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res
      .status(500)
      .send({ decorator: "SERVER_USER_DELETE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res
      .status(404)
      .send({ decorator: "SERVER_USER_DELETE_USER_NOT_FOUND", error: true });
  }

  if (user.error) {
    return res
      .status(500)
      .send({ decorator: "SERVER_USER_DELETE_USER_NOT_FOUND", error: true });
  }

  await Data.deleteAPIKeysForUserId({ userId: user.id });
  await Data.deleteSlatesForUserId({ userId: user.id });

  const i = await PrivateKey.fromString(user.data.tokens.api);

  let b;
  if (!Strings.isEmpty(Environment.TEXTILE_HUB_STAGING_HOST)) {
    b = await Buckets.withKeyInfo(TEXTILE_KEY_INFO, {
      host: Environment.TEXTILE_HUB_STAGING_HOST,
    });
  } else {
    b = await Buckets.withKeyInfo(TEXTILE_KEY_INFO);
  }

  const tokenResponse = await b.getToken(i);
  const openResponse = await b.getOrInit("data");

  try {
    const response = await b.remove(openResponse.root.key);
    console.log({ response });
  } catch (e) {
    console.log(e);
  }

  const deleted = await Data.deleteUserByUsername({
    username: user.username,
  });

  if (!deleted) {
    return res
      .status(200)
      .send({ decorator: "SERVER_USER_DELETE", error: true });
  }

  return res.status(200).send({ decorator: "SERVER_USER_DELETE", deleted });
};
