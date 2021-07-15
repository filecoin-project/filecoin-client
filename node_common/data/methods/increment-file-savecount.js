import { runQuery } from "~/node_common/data/utilities";

//NOTE(martina): remember to include an ownerId for the file
export default async ({ id }) => {
  return await runQuery({
    label: "CREATE_FILE",
    queryFn: async (DB) => {
      const query = await DB.from("files").where("id", id).increment("saveCount", 1);

      if (!query) {
        return null;
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async () => {
      return {
        error: true,
        decorator: "CREATE_FILE",
      };
    },
  });
};
