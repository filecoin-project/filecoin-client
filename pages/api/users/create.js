import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as SlateManager from "~/node_common/managers/slate";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";
import * as EmailManager from "~/node_common/managers/emails";
import * as Monitor from "~/node_common/monitor";

import BCrypt from "bcrypt";

import { PrivateKey } from "@textile/hub";

export default async (req, res) => {
  if (!Strings.isEmpty(Environment.ALLOWED_HOST) && req.headers.host !== Environment.ALLOWED_HOST) {
    return res.status(403).send({ decorator: "SERVER_CREATE_USER_NOT_ALLOWED", error: true });
  }

  if (!Validations.username(req.body.data.username)) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_INVALID_USERNAME", error: true });
  }

  if (!Validations.password(req.body.data.password)) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_INVALID_PASSWORD", error: true });
  }

  if (Strings.isEmpty(req.body.data.token)) {
    return res
      .status(500)
      .send({ decorator: "SERVER_EMAIL_VERIFICATION_INVALID_TOKEN", error: true });
  }

  const verification = await Data.getVerificationBySid({
    sid: req.body.data.token,
  });

  if (!verification.isVerified) {
    return res.status(403).send({ decorator: "SERVER_CREATE_USER_EMAIL_UNVERIFIED", error: true });
  }

  const existing = await Data.getUserByUsername({
    username: req.body.data.username.toLowerCase(),
  });
  if (existing) {
    return res.status(403).send({ decorator: "SERVER_CREATE_USER_USERNAME_TAKEN", error: true });
  }

  const existingViaEmail = await Data.getUserByEmail({ email: verification.email });
  if (existingViaEmail) {
    return res.status(403).send({ decorator: "SERVER_CREATE_USER_EMAIL_TAKEN", error: true });
  }

  const rounds = Number(Environment.LOCAL_PASSWORD_ROUNDS);
  const salt = await BCrypt.genSalt(rounds);
  const hash = await Utilities.encryptPassword(req.body.data.password, salt);

  // TODO(jim):
  // Single Key Textile Auth.
  const identity = await PrivateKey.fromRandom();
  const api = identity.toString();

  // TODO(jim):
  // Don't do this once you refactor.
  const newUsername = req.body.data.username.toLowerCase();
  const newEmail = verification.email;

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
    password: hash,
    salt,
    username: newUsername,
    email: newEmail,
    data: {
      body: "",
      settings: {
        settings_deals_auto_approve: false,
        allow_filecoin_directory_listing: false,
        allow_automatic_data_storage: true,
        allow_encrypted_data_storage: true,
      },
      tokens: { api },
    },
  });

  if (!user) {
    return res.status(404).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  if (user.error) {
    return res.status(500).send({ decorator: "SERVER_CREATE_USER_FAILED", error: true });
  }

  // Note(amine): we can respond early to the client, sending the welcome email isn't a necessary part
  res.status(200).send({
    decorator: "SERVER_CREATE_USER",
    user: { username: user.username, id: user.id },
  });

  const welcomeTemplateId = "d-7688a09484194c06a417a434eaaadd6e";
  const slateEmail = "hello@slate.host";

  await EmailManager.sendTemplate({
    to: user.email,
    from: slateEmail,
    templateId: welcomeTemplateId,
  });

  Monitor.createUser({ user });
};
