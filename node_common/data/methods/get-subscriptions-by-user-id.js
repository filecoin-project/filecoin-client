import * as Serializers from "~/node_common/serializers";
import * as Constants from "~/node_common/constants";
import * as Logging from "~/common/logging";

import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerId }) => {
  return await runQuery({
    label: "GET_SUBSCRIPTIONS_BY_USER_ID",
    queryFn: async (DB) => {
      // const slateFiles = () =>
      //   DB.raw("json_agg(?? order by ?? asc) as ??", ["files", "slate_files.createdAt", "objects"]);

      const ownerQueryFields = ["*", ...Constants.userPreviewProperties, "owner"];
      const ownerQuery = DB.raw(
        `??, json_build_object('id', ??, 'data', ??, 'username', ??) as ??`,
        ownerQueryFields
      );

      const slateFiles = () =>
        DB.raw("coalesce(json_agg(?? order by ?? asc) filter (where ?? is not null), '[]') as ??", [
          "files",
          "slate_files.createdAt",
          "files.id",
          "objects",
        ]);

      const query = await DB.with("slates", (db) =>
        db
          .select(...Serializers.slateProperties, slateFiles())
          .from("slates")
          .join("subscriptions", "subscriptions.slateId", "=", "slates.id")
          .join("slate_files", "slate_files.slateId", "=", "slates.id")
          .join("files", "slate_files.fileId", "=", "files.id")
          .where({ "subscriptions.ownerId": ownerId, "slates.isPublic": true })
          // .orderBy("subscriptions.createdAt", "desc");
          .groupBy("slates.id")
      )
        .select(ownerQuery)
        .from("slates")
        .join("users", "slates.ownerId", "users.id");

      if (!query || query.error) {
        return [];
      }

      let serialized = [];
      for (let slate of query) {
        serialized.push(Serializers.sanitizeSlate(slate));
      }

      return JSON.parse(JSON.stringify(serialized));
    },
    errorFn: async () => {
      Logging.error({
        error: true,
        decorator: "GET_SUBSCRIPTIONS_BY_USER_ID",
      });

      return [];
    },
  });
};
