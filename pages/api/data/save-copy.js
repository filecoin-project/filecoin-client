import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";
import * as ArrayUtilities from "~/node_common/array-utilities";
import * as Monitor from "~/node_common/monitor";
import * as RequestUtilities from "~/node_common/request-utilities";

/**
 * Save copy is equivalent to downloading then reuploading. So an entirely new files table entry should
 * be created with a new id, ownerId, and createdAt
 */
export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) return;
  const { id, user } = userInfo;

  let decorator = "SERVER_SAVE_COPY";

  let { buckets, bucketKey, bucketRoot } = await Utilities.getBucketAPIFromUserToken({
    user,
  });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_NO_BUCKET_DATA",
      error: true,
    });
  }

  const { files } = req.body.data;
  if (!files?.length) {
    return res.status(400).send({
      decorator: "SERVER_SAVE_COPY_NO_CIDS",
      error: true,
    });
  }

  const slateId = req.body.data.slate?.id;
  let slate;
  if (slateId) {
    slate = await Data.getSlateById({ id: slateId });

    if (!slate || slate.error) {
      slate = null;
      decorator = "SERVER_SAVE_COPY_SLATE_NOT_FOUND";
    }
  }

  let { duplicateFiles, filteredFiles } = await ArrayUtilities.removeDuplicateUserFiles({
    files,
    user,
  });

  const foundFiles = await Data.getFilesByCids({ cids: files.map((file) => file.cid) });
  const foundCids = foundFiles.map((file) => file.cid);

  filteredFiles = filteredFiles
    .filter((file) => foundCids.includes(file.cid)) //NOTE(martina): make sure the file being copied exists
    .map(({ createdAt, likeCount, downloadCount, saveCount, ...keepAttrs }) => {
      //NOTE(martina): remove the old file's id, ownerId, createdAt, and privacy so new fields can be used
      return { ...keepAttrs, isPublic: slate?.isPublic || false };
    });

  let copiedFiles = [];

  for (let file of filteredFiles) {
    if (file.isLink) {
      copiedFiles.push(file);
      continue;
    }

    const { id, ...rest } = file;
    let response = await Utilities.addExistingCIDToData({
      buckets,
      key: bucketKey,
      path: bucketRoot.path,
      cid: rest.cid,
    });
    Data.incrementFileSavecount({ id });
    if (response && !response.error) {
      copiedFiles.push(rest);
    }
  }

  let createdFiles = [];
  if (copiedFiles?.length) {
    createdFiles =
      (await Data.createFile({ owner: user, files: copiedFiles, saveCopy: true })) || [];
  }

  let added = createdFiles?.length || 0;

  //NOTE(martina): adding to the slate if there is one
  const filesToAddToSlate = createdFiles.concat(duplicateFiles); //NOTE(martina): files that are already owned by the user are included in case they aren't yet in that specific slate
  if (slate && filesToAddToSlate.length) {
    const { decorator: returnedDecorator, added: addedToSlate } = await Utilities.addToSlate({
      slate,
      files: filesToAddToSlate,
      user,
      saveCopy: true,
    });

    if (returnedDecorator) {
      decorator = returnedDecorator;
    }
    added = addedToSlate;
  }

  if (slate?.isPublic) {
    SearchManager.updateFile(createdFiles, "ADD");
  }
  ViewerManager.hydratePartial(id, { library: true, slates: slate ? true : false });

  if (!slate) {
    Monitor.saveCopy({ user, files: filteredFiles });
  }

  return res.status(200).send({
    decorator,
    data: { added, skipped: files.length - added },
  });
};

// const addToSlate = async ({ slate, files, user }) => {
//   let { filteredFiles } = await ArrayUtilities.removeDuplicateSlateFiles({
//     files,
//     slate,
//   });

//   if (!filteredFiles.length) {
//     return { added: 0 };
//   }

//   let response = await Data.createSlateFiles({ owner: user, slate, files: filteredFiles });
//   if (!response || response.error) {
//     return { decorator: "SERVER_SAVE_COPY_ADD_TO_SLATE_FAILED", added: 0 };
//   }

//   Monitor.saveCopy({ user, slate, files: filteredFiles });

//   await Data.updateSlateById({ id: slate.id, updatedAt: new Date() });

//   return { added: response.length };
// };
