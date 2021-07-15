import * as React from "react";
import * as Styles from "~/common/styles";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { ProfileInfo } from "~/components/core/ActivityGroup/components";
import { Link } from "~/components/core/Link";
import { motion } from "framer-motion";
import { ViewMoreContent } from "~/components/core/ActivityGroup/components";

import ProfilePreview from "~/components/core/ProfilePreviewBlock";

const STYLES_GROUP_GRID = (theme) => css`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-row-gap: 32px;
  border-bottom: 1px solid ${theme.semantic.bgLight};
  padding-bottom: 24px;
  @media (max-width: ${theme.sizes.mobile}px) {
    grid-row-gap: 24px;
    grid-template-columns: 1fr;
  }
`;

const STYLES_VIEWMORE_CONTAINER = (theme) => css`
  @media (max-width: ${theme.sizes.mobile}px) {
    display: flex;
    justify-content: center;
  }
`;

export default function ActivityProfileGroup({
  viewer,
  external,
  group,
  nbrOfProfilesPerRow = 2,
  onAction,
}) {
  const { owner, user, createdAt } = group;

  const { elements, restElements } = React.useMemo(() => {
    if (!Array.isArray(user)) {
      return { elements: [user] };
    }
    return {
      elements: user.slice(0, nbrOfProfilesPerRow),
      restElements: user.slice(nbrOfProfilesPerRow),
    };
  }, [user]);

  const [showMore, setShowMore] = React.useState(false);
  const viewMoreFiles = () => setShowMore(true);

  return (
    <div css={STYLES_GROUP_GRID}>
      <ProfileInfo
        time={createdAt}
        owner={owner}
        action={"started following"}
        viewer={viewer}
        onAction={onAction}
      />
      <div>
        <div css={Styles.PROFILE_PREVIEW_GRID}>
          {elements.map((user) => (
            <Link key={user.id} href={`/$/user/${user.id}`} onAction={onAction}>
              <ProfilePreview
                onAction={onAction}
                viewer={viewer}
                external={external}
                profile={user}
              />
            </Link>
          ))}
          {showMore &&
            restElements.map((user, i) =>
              // NOTE(amine): animate only the first 8 elements
              i < 8 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={user.id}
                >
                  <Link key={user.id} href={`/$/user/${user.id}`} onAction={onAction}>
                    <ProfilePreview
                      onAction={onAction}
                      viewer={viewer}
                      external={external}
                      profile={user}
                    />
                  </Link>
                </motion.div>
              ) : (
                <Link key={user.id} href={`/$/user/${user.id}`} onAction={onAction}>
                  <ProfilePreview onAction={onAction} profile={user} />
                </Link>
              )
            )}
        </div>
        <div css={STYLES_VIEWMORE_CONTAINER}>
          {!showMore && restElements?.length ? (
            <ViewMoreContent onClick={viewMoreFiles}>
              View {restElements.length} more {Strings.pluralize("profile", restElements.length)}
            </ViewMoreContent>
          ) : null}
        </div>
      </div>
    </div>
  );
}
