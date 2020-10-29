import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";
import * as Validations from "~/common/validations";

export default async (req, res) => {
  const id = Utilities.getIdFromCookie(req);
  if (!id) {
    return res.status(500).send({ decorator: "SERVER_ONBOARDING_UPDATE", error: true });
  }

  const user = await Data.getUserById({
    id,
  });

  if (!user) {
    return res.status(404).send({
      decorator: "SERVER_ONBOARDING_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (user.error) {
    return res.status(500).send({
      decorator: "SERVER_ONBOARDING_UPDATE_USER_NOT_FOUND",
      error: true,
    });
  }

  if (!req.body.data || !req.body.data.onboarding || !req.body.data.onboarding.length) {
    return res.status(500).send({
      decorator: "SERVER_ONBOARDING_UPDATE_MUST_PROVIDE_UPDATE",
      error: true,
    });
  }

  let onboarding = user.data.onboarding;
  if (!onboarding) {
    onboarding = {};
    onboarding[item] = true;
  }
  for (let item of req.body.data.onboarding) {
    onboarding[item] = true;
  }

  const updateResponse = await Data.updateUserById({
    id: user.id,
    data: { ...user.data, onboarding },
  });

  return res.status(200).send({
    decorator: "SERVER_ONBOARDING_UPDATE",
    data: updateResponse,
  });
};
