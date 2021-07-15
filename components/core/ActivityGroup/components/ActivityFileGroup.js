import * as React from "react";
import * as Strings from "~/common/strings";
import * as Styles from "~/common/styles";

import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { ViewMoreContent, ProfileInfo } from "~/components/core/ActivityGroup/components";

import ObjectPreview from "~/components/core/ObjectPreview";

const STYLES_GROUP_GRID = (theme) => css`
  display: grid;
  grid-template-columns: ${theme.grids.activity.profileInfo.width}px 1fr;
  grid-row-gap: 32px;
  border-bottom: 1px solid ${theme.semantic.bgLight};
  padding-bottom: 24px;

  @media (max-width: ${theme.sizes.mobile}px) {
    grid-template-columns: 1fr;
  }
`;

const STYLES_VIEWMORE_CONTAINER = (theme) => css`
  @media (max-width: ${theme.sizes.mobile}px) {
    display: flex;
    justify-content: center;
  }
`;

export default function ActivityFileGroup({ viewer, group, onAction, nbrOfObjectsPerRow = 4 }) {
  const { file, owner, slate, type, createdAt } = group;

  const { elements, restElements } = React.useMemo(() => {
    if (!Array.isArray(file)) {
      return { elements: [file] };
    }
    return {
      elements: file.slice(0, nbrOfObjectsPerRow),
      restElements: file.slice(nbrOfObjectsPerRow),
    };
  }, [file]);

  const [showMore, setShowMore] = React.useState(false);
  const viewMoreFiles = () => setShowMore(true);

  const nbrOfFiles = elements.length + (restElements?.length || 0);
  const action = React.useMemo(() => {
    if (type === "CREATE_FILE")
      return `uploaded ${nbrOfFiles} ${Strings.pluralize("file", nbrOfFiles)} ${
        slate ? `to ${slate.slatename}` : ""
      }`;

    if (type === "LIKE_FILE") return `liked ${nbrOfFiles} ${Strings.pluralize("file", nbrOfFiles)}`;

    if (type === "SAVE_COPY") return `saved ${nbrOfFiles} ${Strings.pluralize("file", nbrOfFiles)}`;

    return `added ${nbrOfFiles} ${Strings.pluralize("file", nbrOfFiles)} ${
      slate && `to ${slate.slatename}`
    }`;
  }, []);

  return (
    <div css={STYLES_GROUP_GRID}>
      <ProfileInfo
        time={createdAt}
        owner={owner}
        action={action}
        viewer={viewer}
        onAction={onAction}
      />
      <div>
        <div css={Styles.OBJECTS_PREVIEW_GRID}>
          {elements.map((file) => (
            <ObjectPreview viewer={viewer} owner={file.owner} key={file.id} file={file} />
          ))}
          {showMore &&
            restElements.map((file, i) =>
              // NOTE(amine): animate only the first 8 elements
              i < 8 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={file.id}
                >
                  <ObjectPreview viewer={viewer} owner={file.owner} file={file} />
                </motion.div>
              ) : (
                <ObjectPreview viewer={viewer} owner={file.owner} file={file} />
              )
            )}
        </div>
        <div css={STYLES_VIEWMORE_CONTAINER}>
          {!showMore && restElements?.length ? (
            <ViewMoreContent items={restElements} onClick={viewMoreFiles}>
              View {restElements.length} more {Strings.pluralize("file", restElements.length)}
            </ViewMoreContent>
          ) : null}
        </div>
      </div>
    </div>
  );
}
