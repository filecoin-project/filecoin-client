import * as React from "react";
import * as Constants from "~/common/constants";
import * as Styles from "~/common/styles";

import { css } from "@emotion/react";
import { SecondaryTabGroup } from "~/components/core/TabGroup";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { useIntersection } from "common/hooks";
import { useActivity } from "./hooks";

import ScenePage from "~/components/core/ScenePage";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import ActivityGroup from "~/components/core/ActivityGroup";

const STYLES_GROUPS_CONTAINER = css`
  margin-top: 32px;
  & > * + * {
    margin-top: 32px;
  }
`;

const STYLES_LOADING_CONTAINER = css`
  height: 48px;
  margin-top: 32px;
  ${Styles.CONTAINER_CENTERED}
`;

const STYLES_LOADER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 400px);
  width: 100%;
`;

export default function SceneActivity({ page, viewer, external, onAction }) {
  const { feed, tab, isLoading, updateFeed } = useActivity({
    page,
    viewer,
    onAction,
  });

  const divRef = React.useRef();

  const nbrOfCardsInRow = useNbrOfCardsPerRow(divRef);

  useIntersection({
    ref: divRef,
    onIntersect: () => {
      if (feed?.length === 0 || isLoading[tab]) return;
      updateFeed();
    },
  });

  return (
    <WebsitePrototypeWrapper
      title={`${page.pageTitle} • Slate`}
      url={`${Constants.hostname}${page.pathname}`}
    >
      <ScenePage>
        {viewer && (
          <SecondaryTabGroup
            tabs={[
              { title: "My network", value: { tab: "activity" } },
              { title: "Explore", value: { tab: "explore" } },
            ]}
            value={tab}
            onAction={onAction}
            style={{ marginTop: 0 }}
          />
        )}
        <div css={STYLES_GROUPS_CONTAINER}>
          {feed?.map((group) => (
            <ActivityGroup
              nbrOfCardsPerRow={nbrOfCardsInRow}
              key={group.id}
              viewer={viewer}
              external={external}
              onAction={onAction}
              group={group}
            />
          ))}
        </div>
        <div ref={divRef} css={feed?.length ? STYLES_LOADING_CONTAINER : STYLES_LOADER}>
          {isLoading[tab] && <LoaderSpinner style={{ height: 32, width: 32 }} />}
        </div>
      </ScenePage>
    </WebsitePrototypeWrapper>
  );
}

let NbrOfCardsInRow = {};

function useNbrOfCardsPerRow(ref) {
  const calculateNbrOfCards = (card) => {
    const isMobile = window.matchMedia(`(max-width: ${Constants.sizes.mobile}px)`).matches;

    const profileInfoWidth = isMobile ? 0 : Constants.grids.activity.profileInfo.width;
    const containerWidth = ref.current.offsetWidth - profileInfoWidth;

    const nbrOfCardsWithoutGap = Math.floor(containerWidth / card.width);
    const gapsWidth = (nbrOfCardsWithoutGap - 1) * card.gap;
    return Math.floor((containerWidth - gapsWidth) / card.width) || 1;
  };

  React.useEffect(() => {
    if (JSON.stringify(NbrOfCardsInRow) !== "{}") return;

    const isMobile = window.matchMedia(`(max-width: ${Constants.sizes.mobile}px)`).matches;
    const responsiveKey = isMobile ? "mobile" : "desktop";

    const { width: objectPreviewWidth, rowGap: objectPreviewGridRowGap } =
      Constants.grids.object[responsiveKey];

    NbrOfCardsInRow.object = calculateNbrOfCards({
      width: objectPreviewWidth,
      gap: objectPreviewGridRowGap,
    });

    const { width: collectionPreviewWidth, rowGap: collectionPreviewGridRowGap } =
      Constants.grids.collection[responsiveKey];

    NbrOfCardsInRow.collection = calculateNbrOfCards({
      width: collectionPreviewWidth,
      gap: collectionPreviewGridRowGap,
    });

    const { width: profilePreviewWidth, rowGap: profilePreviewGridRowGap } =
      Constants.grids.profile[responsiveKey];
    NbrOfCardsInRow.profile = calculateNbrOfCards({
      width: profilePreviewWidth,
      gap: profilePreviewGridRowGap,
    });
  }, []);

  return NbrOfCardsInRow;
}
