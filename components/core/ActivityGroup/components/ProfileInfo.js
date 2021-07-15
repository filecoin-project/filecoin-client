import * as React from "react";
import * as Styles from "~/common/styles";
import * as Utilities from "~/common/utilities";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

import { Link } from "~/components/core/Link";
import { css } from "@emotion/react";
import { P2, H4 } from "~/components/system/components/Typography";
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
    color: ${theme.semantic.textBlack};
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

  const formattedDate = Utilities.getTimeDifferenceFromNow(time);
  const mobileFormattedDate = Utilities.getTimeDifferenceFromNow(time, {
    seconds: (time) => `${time} ${Strings.pluralize("second", time)} ago`,
    minutes: (time) => `${time} ${Strings.pluralize("minute", time)} ago`,
    hours: (time) => `${time} ${Strings.pluralize("hour", time)} ago`,
    days: (time) => `${time} ${Strings.pluralize("day", time)} ago`,
  });

  const isOwner = viewer?.id === owner.id;
  return (
    <Link href={`/$/user/${owner.id}`} onAction={onAction}>
      <div css={STYLES_PROFILE_CONTAINER}>
        <img
          src={photo}
          alt={`${username} profile`}
          css={STYLES_PROFILE}
          onError={(e) => (e.target.src = Constants.profileDefaultPicture)}
        />
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
            <P2 color="textGrayDark" style={{ display: "inline" }}>
              <span css={Styles.MOBILE_HIDDEN}>{formattedDate}</span>
              <span css={Styles.MOBILE_ONLY}>{mobileFormattedDate}</span>
            </P2>
          </span>
          <P2 color="textGrayDark" nbrOflines={2}>
            {action}
          </P2>
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
