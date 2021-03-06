import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as SearchManager from "~/node_common/managers/search";
import * as Monitor from "~/node_common/monitor";
import * as RequestUtilities from "~/node_common/request-utilities";

export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationExternal(req, res);
  if (!userInfo) return;
  const { id, key, user } = userInfo;

  if (!req.body?.data?.name) {
    return res.status(500).send({
      decorator: "MUST_PROVIDE_DATA",
      error: true,
    });
  }

  const slatename = Strings.createSlug(req.body.data.name);

  const existingSlate = await Data.getSlateByName({
    slatename,
    ownerId: user.id,
  });

  if (existingSlate) {
    return res.status(500).send({ decorator: "EXISTING_SLATE_NAME", error: true });
  }

  const slate = await Data.createSlate({
    ownerId: id,
    slatename: Strings.createSlug(req.body.data.name),
    isPublic: req.body.data.isPublic,
    data: {
      name: req.body.data.name,
      body: req.body.data.body,
      tags: req.body.data.tags,
    },
  });

  if (!slate || slate.error) {
    return res.status(500).send({ decorator: "CREATE_COLLECTION_FAILED", error: true });
  }

  ViewerManager.hydratePartial(id, { slates: true });

  SearchManager.updateSlate(slate, "ADD");

  Monitor.createSlate({ user, slate });

  return res.status(200).send({ decorator: "CREATE_COLLECTION", slate });
};
