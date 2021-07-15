import * as Serializers from "~/node_common/serializers";

import { runQuery } from "~/node_common/data/utilities";

//NOTE(martina): remember to include an ownerId for the file
export default async ({ owner, files, saveCopy = false }) => {
  let inputFiles;
  if (Array.isArray(files)) {
    inputFiles = files;
  } else {
    inputFiles = [files];
  }
  inputFiles = inputFiles.map((file) => {
    file.ownerId = owner.id;
    return file;
  });

  const cleanedFiles = inputFiles.map((file) => Serializers.cleanFile(file));

  return await runQuery({
    label: "CREATE_FILE",
    queryFn: async (DB) => {
      let query = await DB.insert(cleanedFiles).into("files").returning("*");

      let publicCount = 0;
      let activityItems = [];
      if (query) {
        for (let file of query) {
          if (file.isPublic) {
            activityItems.push({
              ownerId: owner.id,
              fileId: file.id,
              type: saveCopy ? "SAVE_COPY" : "CREATE_FILE",
            });
            publicCount += 1;
          } else {
            activityItems.push({
              ownerId: owner.id,
              fileId: file.id,
              type: saveCopy ? "SAVE_COPY" : "CREATE_FILE",
              ignore: true,
            });
          }
        }
      }
      console.log({ activityItems });

      if (activityItems.length) {
        const activityQuery = await DB.insert(activityItems).into("activity");

        const summaryQuery = await DB.from("users")
          .where("id", owner.id)
          .increment("fileCount", publicCount);
      }

      if (!query) {
        return null;
      }

      if (!Array.isArray(files)) {
        query = query.pop();
      }
      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "CREATE_FILE",
      };
    },
  });
};
