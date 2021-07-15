import * as Constants from "~/node_common/constants";

import { runQuery } from "~/node_common/data/utilities";

export default async ({ earliestTimestamp, latestTimestamp }) => {
  const slateFilesFields = ["files", "slate_files.createdAt", "files.id", "objects"];
  const slateFilesQuery = `coalesce(json_agg(?? order by ?? asc) filter (where ?? is not null), '[]') as ??`;

  const slateOwnerFields = [
    "slate_table",
    "slate_with_objects.*",
    ...Constants.userPreviewProperties,
    "owner",
    "slate_with_objects",
    "users",
    "slate_with_objects.ownerId",
    "users.id",
  ];
  const slateOwnerQuery = `?? as (SELECT ??, json_build_object('id', ??, 'data', ??, 'username', ??) as ?? FROM ?? LEFT JOIN ?? ON ?? = ?? ) `;

  const slateFields = [
    "slate_with_objects",
    "slates.id",
    "slates.slatename",
    "slates.data",
    "slates.ownerId",
    "slates.isPublic",
    "slates.subscriberCount",
    "slates.fileCount",
    ...slateFilesFields,
    "slates",
    "slate_files",
    "slate_files.slateId",
    "slates.id",
    "files",
    "files.id",
    "slate_files.fileId",
    "slates.id",
    ...slateOwnerFields,
  ];
  const slateQuery = `WITH ?? as (SELECT ??, ??, ??, ??, ??, ??, ??, ${slateFilesQuery} FROM ?? LEFT JOIN ?? on ?? = ?? LEFT JOIN ?? on ?? = ?? GROUP BY ??), ${slateOwnerQuery}`;

  const userFilesFields = ["files", "files.createdAt", "files.id", "objects"];
  const userFilesQuery = `coalesce(json_agg(?? order by ?? asc) filter (where ?? is not null), '[]') as ??`;

  const userFields = [
    "user_table",
    "users.id",
    "users.createdAt",
    "users.username",
    "users.data",
    "users.followerCount",
    "users.fileCount",
    "users.slateCount",
    ...userFilesFields,
    "users",
    "files",
    "users.id",
    "files.ownerId",
    "users.id",
  ];
  const userQuery = `, ?? as (SELECT ??, ??, ??, ??, ??, ??, ??, ${userFilesQuery} FROM ?? LEFT JOIN ?? on ?? = ?? GROUP BY ??)`;

  const fileFields = [
    "files_table",
    "files.*",
    ...Constants.userPreviewProperties,
    "owner",
    "files",
    "users",
    "files.ownerId",
    "users.id",
  ];
  const fileQuery = `, ?? as (SELECT ??, json_build_object('id', ??, 'data', ??, 'username', ??) as ?? FROM ?? LEFT JOIN ?? on ?? = ??)`;

  const selectFields = [
    ...slateFields,
    ...userFields,
    ...fileFields,
    "activity.id",
    "activity.type",
    "activity.createdAt",
    "slate_table",
    "slate",
    "files_table",
    "file",
    "user_table",
    "user",
    "owners",
    "owner",
    "activity",
    "slate_table",
    "slate_table.id",
    "activity.slateId",
    "user_table",
    "user_table.id",
    "activity.userId",
    "files_table",
    "files_table.id",
    "activity.fileId",
    "user_table",
    "owners",
    "owners.id",
    "activity.ownerId",
  ];
  const selectQuery = `${slateQuery} ${userQuery} ${fileQuery} SELECT ??, ??, ??, row_to_json(??) as ??, row_to_json(??) as ??, row_to_json(??) as ??, row_to_json(??) as ?? FROM ?? LEFT JOIN ?? ON ?? = ?? LEFT JOIN ?? ON ?? = ?? LEFT JOIN ?? ON ?? = ?? LEFT JOIN ?? AS ?? ON ?? = ??`;

  return await runQuery({
    label: "GET_EXPLORE",
    queryFn: async (DB) => {
      let query;
      if (earliestTimestamp) {
        //NOTE(martina): for pagination, fetching the "next 100" results
        let date = new Date(earliestTimestamp);
        date.setSeconds(date.getSeconds() - 1);
        query = await DB.raw(
          `${selectQuery} WHERE ?? < '${date.toISOString()}' ORDER BY ?? DESC LIMIT 100`,
          [...selectFields, "activity.createdAt", "activity.createdAt"]
        );
      } else if (latestTimestamp) {
        //NOTE(martina): for fetching new updates since the last time they loaded
        let date = new Date(latestTimestamp);
        date.setSeconds(date.getSeconds() + 1);
        query = await DB.raw(
          `${selectQuery} WHERE ?? > '${date.toISOString()}' ORDER BY ?? DESC LIMIT 100`,
          [...selectFields, "activity.createdAt", "activity.createdAt"]
        );
      } else {
        //NOTE(martina): for the first fetch they make, when they have not loaded any explore events yet
        query = await DB.raw(`${selectQuery} ORDER BY ?? DESC LIMIT 100`, [
          ...selectFields,
          "activity.createdAt",
        ]);
      }
      if (query?.rows) {
        query = query.rows;
      } else {
        query = [];
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async () => {
      console.log({
        error: true,
        decorator: "GET_EXPLORE",
      });

      return [];
    },
  });
};
