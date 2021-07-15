import * as React from "react";
import * as Constants from "~/common/constants";
import * as Styles from "~/common/styles";

import { css } from "@emotion/react";
import { H4, P2, P3 } from "~/components/system/components/Typography";
import { AspectRatio } from "~/components/system";
import { LikeButton, SaveButton } from "./components";
import { useLikeHandler, useSaveHandler } from "~/common/hooks";
import { Link } from "~/components/core/Link";

import ImageObjectPreview from "./ImageObjectPreview";

const STYLES_BACKGROUND_LIGHT = (theme) => css`
  background-color: ${theme.semantic.bgLight};
  box-shadow: 0 0 0 1px ${theme.semantic.bgLight};
  border-radius: 8px;
`;

const STYLES_WRAPPER = css`
  border-radius: 8px;
  overflow: hidden;
`;

const STYLES_DESCRIPTION = (theme) => css`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 16px 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${theme.system.white};

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    backdrop-filter: blur(75px);
    -webkit-backdrop-filter: blur(75px);
  }

  @media (max-width: ${theme.sizes.mobile}px) {
    padding: 8px;
  }
`;

const STYLES_DESCRIPTION_META = css`
  justify-content: space-between;
  margin-top: 12px;
`;

const STYLES_REACTIONS_CONTAINER = css`
  display: flex;
  & > * + * {
    margin-left: 32px;
  }
`;

const STYLES_REACTION = css`
  display: flex;
  & > * + * {
    margin-left: 8px;
  }
`;

const STYLES_PROFILE_IMAGE = css`
  display: block;
  background-color: ${Constants.semantic.bgLight};
  flex-shrink: 0;
  object-fit: cover;
  height: 20px;
  width: 20px;
  border-radius: 2px;
`;

const STYLES_DESCRIPTION_TAG = (theme) => css`
  position: absolute;
  top: -32px;
  left: 12px;
  text-transform: uppercase;
  border: 1px solid ${theme.system.grayLight5};
  background-color: ${theme.semantic.bgLight};
  padding: 2px 8px;
  border-radius: 4px;
`;

const STYLES_SELECTED_RING = (theme) => css`
  box-shadow: 0 0 0 2px ${theme.system.blue};
`;

export default function ObjectPreviewPremitive({
  children,
  tag,
  file,
  isSelected,
  viewer,
  owner,
  // NOTE(amine): internal prop used to display
  isImage,
  onAction,
}) {
  const { like, isLiked, likeCount } = useLikeHandler({ file, viewer });
  const { save, isSaved, saveCount } = useSaveHandler({ file, viewer });

  const title = file.data.name || file.filename;

  if (file?.data?.coverImage && !isImage) {
    return (
      <ImageObjectPreview file={file} owner={owner} isSelected={isSelected} onAction={onAction} />
    );
  }
  const showSaveButton = viewer?.id !== file?.ownerId;
  return (
    <div
      css={[
        css({
          boxShadow: `0 0 0 0px ${Constants.system.blue}`,
          transition: "box-shadow 0.2s",
          borderRadius: 8,
        }),
        isSelected && STYLES_SELECTED_RING,
      ]}
    >
      <AspectRatio ratio={295 / 248} css={STYLES_BACKGROUND_LIGHT}>
        <div css={STYLES_WRAPPER}>
          <AspectRatio ratio={1}>
            <div>{children}</div>
          </AspectRatio>

          <article css={STYLES_DESCRIPTION}>
            {tag && (
              <div css={STYLES_DESCRIPTION_TAG}>
                <P3>{tag}</P3>
              </div>
            )}
            <H4 nbrOflines={1} color="textBlack">
              {title}
            </H4>

            <div css={[Styles.HORIZONTAL_CONTAINER_CENTERED, STYLES_DESCRIPTION_META]}>
              <div css={STYLES_REACTIONS_CONTAINER}>
                <div css={STYLES_REACTION}>
                  <LikeButton onClick={like} isLiked={isLiked} />
                  <P2 color="textGrayDark">{likeCount}</P2>
                </div>
                {showSaveButton && (
                  <div css={STYLES_REACTION}>
                    <SaveButton onSave={save} isSaved={isSaved} />
                    <P2 color="textGrayDark">{saveCount}</P2>
                  </div>
                )}
              </div>
              {owner && (
                <Link
                  href={`/$/user/${owner.id}`}
                  onAction={onAction}
                  aria-label={`Visit ${owner.username}'s profile`}
                  title={`Visit ${owner.username}'s profile`}
                >
                  <img
                    css={STYLES_PROFILE_IMAGE}
                    src={owner.data.photo}
                    alt={`${owner.username} profile`}
                    onError={(e) => (e.target.src = Constants.profileDefaultPicture)}
                  />
                </Link>
              )}
            </div>
          </article>
        </div>
      </AspectRatio>
    </div>
  );
}
