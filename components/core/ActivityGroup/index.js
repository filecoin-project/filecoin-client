import * as React from "react";

import { css } from "@emotion/react";

import {
  ActivityFileGroup,
  ActivityCollectionGroup,
  ActivityProfileGroup,
} from "~/components/core/ActivityGroup/components";

const STYLES_GROUP_GRID = (theme) => css`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-row-gap: 32px;
  border-bottom: 1px solid ${theme.semantic.bgLight};
  padding-bottom: 24px;
`;

export default function ActivityGroup({ onAction, viewer, external, group, nbrOfCardsPerRow }) {
  const { type } = group;
  if (
    type === "CREATE_FILE" ||
    type === "CREATE_SLATE_OBJECT" ||
    type === "LIKE_FILE" ||
    type === "SAVE_COPY"
  ) {
    return (
      <ActivityFileGroup
        nbrOfObjectsPerRow={nbrOfCardsPerRow.object}
        viewer={viewer}
        onAction={onAction}
        group={group}
      />
    );
  }

  if (type === "CREATE_SLATE" || type === "SUBSCRIBE_SLATE") {
    return (
      <ActivityCollectionGroup
        onAction={onAction}
        viewer={viewer}
        group={group}
        nbrOfCollectionsPerRow={nbrOfCardsPerRow.collection}
      />
    );
  }

  if (type === "SUBSCRIBE_USER") {
    return (
      <ActivityProfileGroup
        nbrOfProfilesPerRow={nbrOfCardsPerRow.profile}
        onAction={onAction}
        viewer={viewer}
        external={external}
        group={group}
      />
    );
  }

  // TODO(amine): grouping for making files/slate public
  return (
    <div css={STYLES_GROUP_GRID}>
      <div>{type}</div>
    </div>
  );
}
