import * as Social from "~/node_common/social";
import * as Arrays from "~/common/arrays";
import * as Logging from "~/common/logging";

//things taht could be combined into this:
//update search (searchmanager)
//send websocket update (viewermanager)
//send slack message (Social.sendSlackMessage)
//create activity
//update summary counts

//maybe you could remove the try catch from here and put it inside the send part

const getUserURL = (user) => {
  const userProfileURL = `https://slate.host/${user.username}`;
  const userURL = `<${userProfileURL}|${user.username}>`;
  return userURL;
};

export const error = (location, e) => {
  try {
    const message = `@martina there was an error at ${location}: ${e}`;
    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const message = (location, msg) => {
  try {
    const message = `@martina there was a message at ${location}: ${msg}`;
    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const upload = ({ user, slate, files: targetFiles }) => {
  if (slate && !slate.isPublic) return;
  const files = Arrays.filterPublic(targetFiles);
  if (!files.length) {
    return;
  }
  try {
    const userURL = getUserURL(user);
    const extra =
      files.length > 1
        ? ` and ${files.length - 1} other file${files.length - 1 > 1 ? "s" : ""}`
        : "";
    let message;
    if (slate) {
      const objectURL = `<https://slate.host/${user.username}/${slate.slatename}?cid=${files[0].cid}|${files[0].filename}>`;
      const slateURL = `<https://slate.host/${user.username}/${slate.slatename}|${slate.data.name}>`;
      message = `*${userURL}* uploaded ${objectURL}${extra} to ${slateURL}`;
    } else {
      const objectURL = `<https://slate.host/${user.username}?cid=${files[0].cid}|${files[0].filename}>`;
      message = `*${userURL}* uploaded ${objectURL}${extra}`;
    }

    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const download = ({ user, files: targetFiles }) => {
  const files = Arrays.filterPublic(targetFiles);
  if (!files.length) {
    return;
  }
  try {
    const userURL = getUserURL(user);
    const objectURL = `<https://slate.host/${user.username}?cid=${files[0].cid}|${files[0].filename}>`;
    const extra =
      files.length > 1
        ? ` and ${files.length - 1} other file${files.length - 1 > 1 ? "s" : ""}`
        : "";
    const message = `*${userURL}* downloaded ${objectURL}${extra}`;
    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const saveCopy = ({ slate, user, files: targetFiles }) => {
  if (slate && !slate.isPublic) return;
  const files = Arrays.filterPublic(targetFiles);
  if (!files.length) {
    return;
  }
  try {
    const userURL = getUserURL(user);
    const extra =
      files.length > 1
        ? ` and ${files.length - 1} other file${files.length - 1 > 1 ? "s" : ""}`
        : "";
    let message;
    if (slate) {
      const objectURL = `<https://slate.host/${user.username}/${slate.slatename}?cid=${files[0].cid}|${files[0].filename}>`;
      const slateURL = `<https://slate.host/${user.username}/${slate.slatename}|${slate.data.name}>`;
      message = `*${userURL}* saved ${objectURL}${extra} to ${slateURL}`;
    } else {
      const objectURL = `<https://slate.host/${user.username}?cid=${files[0].cid}|${files[0].filename}>`;
      message = `*${userURL}* saved ${objectURL}${extra}`;
    }

    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const createSlate = ({ user, slate }) => {
  if (!slate.isPublic) return;
  try {
    const userURL = getUserURL(user);
    const slateURL = `<https://slate.host/${user.username}/${slate.slatename}|${slate.data.name}>`;
    const message = `*${userURL}* created a collection ${slateURL}`;

    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const createUser = ({ user }) => {
  try {
    const userURL = getUserURL(user);
    const message = `*${userURL}* joined slate`;

    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const subscribeUser = ({ user, targetUser }) => {
  try {
    const userURL = getUserURL(user);
    const targetUserURL = getUserURL(targetUser);

    const message = `*${userURL}* followed ${targetUserURL}`;

    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};

export const subscribeSlate = ({ user, targetSlate }) => {
  if (!targetSlate.isPublic) return;
  try {
    const userURL = getUserURL(user);
    const targetSlateURL = `<https://slate.host/$/${targetSlate.id}|${targetSlate.data.name}>`;

    const message = `*${userURL}* subscribed to ${targetSlateURL}`;

    Social.sendSlackMessage(message);
  } catch (e) {
    Logging.error(e);
  }
};
