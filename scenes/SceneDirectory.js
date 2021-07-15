import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { SecondaryTabGroup } from "~/components/core/TabGroup";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { Link } from "~/components/core/Link";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import ProfilePhoto from "~/components/core/ProfilePhoto"; 

const STYLES_USER_ENTRY = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  cursor: pointer;
  ${"" /* border: 1px solid ${Constants.semantic.borderLight}; */}
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: ${Constants.system.white};
`;

const STYLES_USER = css`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin: 16px;
  color: ${Constants.system.blue};
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 12px 16px;
  }
`;

const STYLES_BUTTONS = css`
  justify-self: end;
  display: flex;
  flex-direction: row;
  margin-right: 16px;
  justify-content: flex-end;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 8px;
  }
`;

const STYLES_ITEM_BOX = css`
  position: relative;
  justify-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-right: 16px;
  color: ${Constants.system.grayLight2};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 8px;
  }
`;

const STYLES_ACTION_BUTTON = css`
  cursor: pointer;
  padding: 8px;
  color: ${Constants.system.blue};
  font-family: ${Constants.font.medium};
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.semantic.bgLight};
  background-size: cover;
  background-position: 50% 50%;
  height: 24px;
  width: 24px;
  margin-right: 16px;
  border-radius: 8px;
  position: relative;
`;

const STYLES_STATUS_INDICATOR = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 2px solid ${Constants.system.green};
  background-color: ${Constants.system.green};
`;

const STYLES_MESSAGE = css`
  color: ${Constants.system.black};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const STYLES_NAME = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function UserEntry({ user, button, onClick, message, checkStatus }) {
  const isOnline = checkStatus({ id: user.id });

  return (
    <div key={user.username} css={STYLES_USER_ENTRY}>
      <div css={STYLES_USER} onClick={onClick}>
        <div css={STYLES_PROFILE_IMAGE}>
          <ProfilePhoto
            user={user}
            size={24}
          />
          {isOnline ? <div css={STYLES_STATUS_INDICATOR} /> : null}
        </div>
        <span css={STYLES_NAME}>
          {user.data.name || `@${user.username}`}
          {message ? <span css={STYLES_MESSAGE}>{message}</span> : null}
        </span>
      </div>
      {button}
    </div>
  );
}

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

export default class SceneDirectory extends React.Component {
  _ref;

  state = {
    copyValue: "",
    contextMenu: null,
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
      this._handleHide();
    });
  };

  _handleHide = (e) => {
    this.setState({ contextMenu: null });
  };

  _handleClick = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.contextMenu === value) {
      this._handleHide();
    } else {
      this.setState({ contextMenu: value });
    }
  };

  _handleFollow = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    this._handleHide();
    await Actions.createSubscription({
      userId: id,
    });
  };

  checkStatus = ({ id }) => {
    const { activeUsers } = this.props;

    return activeUsers && activeUsers.includes(id);
  };

  render() {
    let following = this.props.viewer.following.map((relation) => {
      let button = (
        <div css={STYLES_ITEM_BOX} onClick={(e) => this._handleClick(e, relation.id)}>
          <SVG.MoreHorizontal height="24px" />
          {this.state.contextMenu === relation.id ? (
            <Boundary
              captureResize={true}
              captureScroll={false}
              enabled
              onOutsideRectEvent={(e) => this._handleClick(e, relation.id)}
            >
              <PopoverNavigation
                style={{
                  top: "40px",
                  right: "0px",
                }}
                navigation={[
                  [
                    {
                      text: "Unfollow",
                      onClick: (e) => this._handleFollow(e, relation.id),
                    },
                  ],
                ]}
              />
            </Boundary>
          ) : null}
        </div>
      );
      return (
        <Link key={relation.id} href={`/$/user/${relation.id}`} onAction={this.props.onAction}>
          <UserEntry
            key={relation.id}
            user={relation}
            button={button}
            checkStatus={this.checkStatus}
            // onClick={() => {
            //   this.props.onAction({
            //     type: "NAVIGATE",
            //     value: "NAV_PROFILE",
            //     shallow: true,
            //     data: relation,
            //   });
            // }}
          />
        </Link>
      );
    });

    let followers = this.props.viewer.followers.map((relation) => {
      let button = (
        <div css={STYLES_ITEM_BOX} onClick={(e) => this._handleClick(e, relation.id)}>
          <SVG.MoreHorizontal height="24px" />
          {this.state.contextMenu === relation.id ? (
            <Boundary
              captureResize={true}
              captureScroll={false}
              enabled
              onOutsideRectEvent={(e) => this._handleClick(e, relation.id)}
            >
              <PopoverNavigation
                style={{
                  top: "40px",
                  right: "0px",
                }}
                navigation={[
                  [
                    {
                      text: this.props.viewer.following.some((user) => {
                        return user.id === relation.id;
                      })
                        ? "Unfollow"
                        : "Follow",
                      onClick: (e) => this._handleFollow(e, relation.id),
                    },
                  ],
                ]}
              />
            </Boundary>
          ) : null}
        </div>
      );
      return (
        <Link key={relation.id} href={`/$/user/${relation.id}`} onAction={this.props.onAction}>
          <UserEntry
            key={relation.id}
            user={relation}
            button={button}
            checkStatus={this.checkStatus}
            // onClick={() => {
            //   this.props.onAction({
            //     type: "NAVIGATE",
            //     value: "NAV_PROFILE",
            //     shallow: true,
            //     data: relation,
            //   });
            // }}
          />
        </Link>
      );
    });

    let tab = this.props.page.params?.tab || "following";
    return (
      <WebsitePrototypeWrapper
        title={`${this.props.page.pageTitle} • Slate`}
        url={`${Constants.hostname}${this.props.page.pathname}`}
      >
        <ScenePage>
          <ScenePageHeader title="Directory" />
          <SecondaryTabGroup
            tabs={[
              { title: "Following", value: { tab: "following" } },
              { title: "Followers", value: { tab: "followers" } },
            ]}
            value={tab}
            onAction={this.props.onAction}
          />
          {tab === "following" ? (
            following && following.length ? (
              following
            ) : (
              <EmptyState>
                <SVG.Users height="24px" style={{ marginBottom: 24 }} />
                You can follow any user on the network to be updated on their new uploads and
                collections.
              </EmptyState>
            )
          ) : null}
          {tab === "followers" ? (
            followers && followers.length ? (
              followers
            ) : (
              <EmptyState>
                <SVG.Users height="24px" style={{ marginBottom: 24 }} />
                You don't have any followers yet.
              </EmptyState>
            )
          ) : null}
          <input
            readOnly
            ref={(c) => {
              this._ref = c;
            }}
            value={this.state.copyValue}
            tabIndex="-1"
            css={STYLES_COPY_INPUT}
          />
        </ScenePage>
      </WebsitePrototypeWrapper>
    );
  }
}
