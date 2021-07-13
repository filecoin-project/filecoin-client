import * as React from "react";
import * as Styles from "~/common/styles";

import { Link } from "~/components/core/Link";
import { css } from "@emotion/react";
import { P, H4 } from "~/components/system/components/Typography";
import { ButtonPrimary, ButtonTertiary } from "~/components/system";
import { useFollowProfileHandler } from "~/common/hooks";

const STYLES_PROFILE_CONTAINER = css`
  display: flex;
  padding-right: 12px;
  box-sizing: border-box;
  & > * + * {
    margin-left: 12px;
  }
`;

const STYLES_TEXT_BLACK = (theme) =>
  css`
    color: ${theme.system.textBlack};
    display: inline;
  `;

const STYLES_PROFILE = css`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`;

const STYLES_MOBILE_ALIGN = (theme) => css`
  @media (max-width: ${theme.sizes.mobile}px) {
    width: 100%;
    & > span {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export default function ProfileInfo({ owner, viewer, time, action, onAction }) {
  const { isFollowing, handleFollow } = useFollowProfileHandler({ viewer, user: owner, onAction });
  const { username, data = {} } = owner;
  const { photo } = data;

  const isOwner = viewer?.id === owner.id;
  return (
    <Link href={`/$/user/${owner.id}`} onAction={onAction}>
      <div css={STYLES_PROFILE_CONTAINER}>
        <img src={photo} alt={`${username} profile`} css={STYLES_PROFILE} />
        <div css={STYLES_MOBILE_ALIGN}>
          <span>
            <H4 color="textBlack" css={[STYLES_TEXT_BLACK, Styles.HEADING_04]}>
              {username}
            </H4>
            <H4
              color="textBlack"
              css={[STYLES_TEXT_BLACK, Styles.HEADING_04, Styles.MOBILE_HIDDEN]}
            >
              &nbsp;•&nbsp;
            </H4>
            <P variant="para-02" color="textGrayDark" style={{ display: "inline" }}>
              {time}
            </P>
          </span>
          <P variant="para-02" color="textGrayDark" nbrOflines={2}>
            {action}
          </P>
          {!isOwner && (
            <div style={{ marginTop: 12 }} css={Styles.MOBILE_HIDDEN}>
              {isFollowing ? (
                <ButtonTertiary
                  style={{ marginTop: "auto", maxWidth: "91px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleFollow(owner.id);
                  }}
                >
                  Following
                </ButtonTertiary>
              ) : (
                <ButtonPrimary
                  style={{ marginTop: "auto", maxWidth: "91px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleFollow(owner.id);
                  }}
                >
                  Follow
                </ButtonPrimary>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}