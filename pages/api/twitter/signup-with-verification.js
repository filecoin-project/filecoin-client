import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as SlateManager from "~/node_common/managers/slate";
import * as Constants from "~/node_common/constants";

import JWT from "jsonwebtoken";

import { PrivateKey } from "@textile/hub";

export default async (req, res) => {
  const { pin, username } = req.body.data;

  if (!Strings.isEmpty(Environment.ALLOWED_HOST) && req.headers.host !== Environment.ALLOWED_HOST) {
    return res.status(403).send({ decorator: "SERVER_TWITTER_OAUTH_NOT_ALLOWED", error: true });
  }

  if (Strings.isEmpty(req.body.data.token)) {
    return res.status(500).send({ decorator: "SERVER_TWITTER_OAUTH_NO_OAUTH_TOKEN", error: true });
  }

  if (!Validations.verificationPin(pin)) {
    return res
      .status(500)
      .send({ decorator: "SERVER_EMAIL_VERIFICATION_INVALID_PIN", error: true });
  }

  if (!Validations.username(username)) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_INVALID_USERNAME", error: true });
  }

  const verification = await Data.getVerificationBySid({
    sid: req.body.data.token,
  });

  if (!verification) {
    return res.status(404).send({ decorator: "SERVER_EMAIL_VERIFICATION_FAILED", error: true });
  }

  if (verification.error) {
    return res.status(404).send({ decorator: "SERVER_EMAIL_VERIFICATION_FAILED", error: true });
  }

  const isTokenExpired =
    new Date() - new Date(verification.createdAt) > Constants.TOKEN_EXPIRATION_TIME;
  if (isTokenExpired) {
    return res.status(401).send({ decorator: "SERVER_EMAIL_VERIFICATION_FAILED", error: true });
  }

  if (verification.type !== "email_twitter_verification") {
    return res.status(401).send({ decorator: "SERVER_EMAIL_VERIFICATION_FAILED", error: true });
  }

  if (verification.pin !== req.body.data.pin) {
    return res
      .status(401)
      .send({ decorator: "SERVER_EMAIL_VERIFICATION_INVALID_PIN", error: true });
  }

  const twitterUser = await Data.getTwitterToken({ token: verification.twitterToken });
  if (!twitterUser) {
    return res.status(401).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  const userByTwitterId = await Data.getUserByTwitterId({ twitterId: twitterUser.id_str });
  // NOTE(Amine): If a user with TwitterId exists
  if (userByTwitterId) {
    return res.status(201).send({ decorator: "SERVER_CREATE_USER_TWITTER_EXISTS" });
  }

  const newUsername = username.toLowerCase();
  const newEmail = verification.email.toLowerCase();

  // NOTE(Amine): If there is an account with the user's twitter email
  const userByEmail = await Data.getUserByEmail({ email: newEmail });
  if (userByEmail) return res.status(201).send({ decorator: "SERVER_CREATE_USER_EMAIL_TAKEN" });

  // NOTE(Amine): If there is an account with the provided username
  const userByUsername = await Data.getUserByUsername({ username });
  if (userByUsername) {
    return res.status(201).send({ decorator: "SERVER_CREATE_USER_USERNAME_TAKEN" });
  }

  // TODO(jim):
  // Single Key Textile Auth.
  const identity = await PrivateKey.fromRandom();
  const api = identity.toString();

  // TODO(jim):
  // Don't do this once you refactor.
  const { buckets, bucketKey, bucketName } = await Utilities.getBucketAPIFromUserToken({
    user: {
      username: newUsername,
      data: { tokens: { api } },
    },
  });

  if (!buckets) {
    return res
      .status(500)
      .send({ decorator: "SERVER_CREATE_USER_BUCKET_INIT_FAILURE", error: true });
  }

  const user = await Data.createUser({
    username: newUsername,
    email: newEmail,
    twitterId: twitterUser.id_str,
    data: {
      body: "",
      settings: {
        settings_deals_auto_approve: false,
        allow_filecoin_directory_listing: false,
        allow_automatic_data_storage: true,
        allow_encrypted_data_storage: true,
      },
      tokens: { api },
      twitter: {
        username: twitterUser.screen_name,
        verified: twitterUser.verified,
      },
    },
  });

  if (!user) {
    return res.status(404).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  const token = JWT.sign({ id: user.id, username: user.username }, Environment.JWT_SECRET);
  return res.status(200).send({ decorator: "SERVER_SIGN_IN", success: true, token });
};
