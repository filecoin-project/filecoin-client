import * as Constants from "~/node_common/constants";
import * as Serializers from "~/node_common/serializers";
import * as Logging from "~/common/logging";

import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerId }) => {
  return await runQuery({
    label: "GET_LIKES_BY_USER_ID",
    queryFn: async (DB) => {
      const query = await DB.select(...Serializers.fileProperties)
        .from("files")
        .join("likes", "likes.fileId", "=", "files.id")
        .where({ "likes.userId": ownerId })
        .groupBy("files.id");

      if (!query || query.error) {
        return [];
      }

      let serialized = [];
      for (let file of query) {
        serialized.push(Serializers.sanitizeFile(file));
      }

      return JSON.parse(JSON.stringify(serialized));
    },
    errorFn: async (e) => {
      Logging.error({
        error: true,
        decorator: "GET_LIKES_BY_USER_ID",
      });

      return [];
    },
  });
};
