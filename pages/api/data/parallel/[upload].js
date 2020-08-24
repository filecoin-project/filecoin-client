import * as Data from "~/node_common/data";
import * as LibraryManager from "~/node_common/managers/library";
import * as MW from "~/node_common/middleware";
import * as Upload from "~/node_common/upload";
import * as Utilities from "~/node_common/utilities";

const initCORS = MW.init(MW.CORS);
const initAuth = MW.init(MW.RequireCookieAuthentication);

// NOTE(jim): To support multipart request.
export const config = {
  api: {
    bodyParser: false,
  },
};

/** NOTE(aminejvm) This cache is gonna store a queue to each user currently uploading on parallel,
 *  we'll use this queue to avoid any data collision */
let cache = {};

async function waitUntil(condition) {
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      // NOTE(aminejvm) Debug the condition if something goes wrong with queue
      // to remove
      console.log("___condition", condition);
      if (condition) {
        resolve("");
        clearInterval(interval);
      }
    }, 1000);
  });
}

export default async (req, res) => {
  initCORS(req, res);
  initAuth(req, res);

  const id = Utilities.getIdFromCookie(req);

  //NOTE(aminejvm) Initiate the users queue
  cache[id] = id in cache ? cache[id] : Utilities.createQueue();

  let user = await Data.getUserById({
    id,
  });

  const response = await Upload.formMultipart(req, res, {
    user,
  });

  if (!response) {
    return res
      .status(404)
      .send({ decorator: "SERVER_UPLOAD_ERROR", error: true });
  }

  if (response.error) {
    // NOTE(jim): To debug potential textile issues with matching CIDs.
    console.log({ message: response.message });
    return res
      .status(500)
      .send({ decorator: response.decorator, error: response.error });
  }

  // NOTE(aminejvm) Add this file to the queue
  cache[id].queue(response.data.name);

  console.log(
    "__________FIlE________",
    response.data.name,
    cache[id].head,
    cache[id].toList(),
    "____IPFS_____",
    response.ipfs
  );
  // NOTE(aminejvm) Wait until the file is ready to be added to the database.
  await waitUntil(response.data.name === cache[id].head);
  // NOTE(aminejvm) Refetch user data
  user = await Data.getUserById({
    id,
  });

  const { data, ipfs } = response;

  const finalData = LibraryManager.updateDataIPFS(data, {
    ipfs,
  });

  const updatedUserDataFields = LibraryManager.addData({
    user,
    data: finalData,
  });

  await Data.updateUserById({
    id: user.id,
    data: updatedUserDataFields,
  });

  // NOTE(aminejvm) Clear the current file from  the queue
  cache[id].dequeue();

  return res.status(200).send({
    decorator: "SERVER_UPLOAD",
    data: finalData,
  });
};
