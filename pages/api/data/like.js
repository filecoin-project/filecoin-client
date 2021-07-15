import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as RequestUtilities from "~/node_common/request-utilities";
import * as ViewerManager from "~/node_common/managers/viewer";

export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) return;
  const { id, user } = userInfo;

  if (!req.body.data?.id) {
    return res.status(500).send({ decorator: "SERVER_LIKE_FILE_NO_FILE_PROVIDED", error: true });
  }

  const fileId = req.body.data.id;

  const existingResponse = await Data.getLikeByFile({ userId: user.id, fileId });

  if (existingResponse && existingResponse.error) {
    return res.status(500).send({
      decorator: "SERVER_LIKE_FILE_CHECK_ERROR",
      error: true,
    });
  }

  let response;

  // NOTE(martina): If it exists, we unlike instead.
  if (existingResponse) {
    response = await Data.deleteLikeByFile({
      userId: user.id,
      fileId,
    });

    if (!response) {
      return res.status(404).send({ decorator: "SERVER_UNLIKE_FILE_FAILED", error: true });
    }

    if (response.error) {
      return res.status(500).send({ decorator: "SERVER_UNLIKE_FILE_FAILED", error: true });
    }
  } else {
    response = await Data.createLike({ userId: user.id, fileId });

    if (!response) {
      return res.status(404).send({ decorator: "SERVER_LIKE_FILE_FAILED", error: true });
    }

    if (response.error) {
      return res.status(500).send({ decorator: "SERVER_LIKE_FILE_FAILED", error: true });
    }
  }

  ViewerManager.hydratePartial(id, { likes: true });

  return res.status(200).send({
    decorator: "SERVER_LIKE_FILE",
    data: response,
  });
};
