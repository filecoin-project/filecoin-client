import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as Utilities from "~/common/utilities";
import * as Events from "~/common/custom-events";
import * as Window from "~/common/window";

import { useState } from "react";
import { Link } from "~/components/core/Link";
import { GlobalCarousel } from "~/components/system/components/GlobalCarousel";
import { css } from "@emotion/react";
import { ButtonPrimary, ButtonSecondary } from "~/components/system/components/Buttons";
import { TabGroup, SecondaryTabGroup } from "~/components/core/TabGroup";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import ProcessedText from "~/components/core/ProcessedText";
import SlatePreviewBlocks from "~/components/core/SlatePreviewBlock";
import CTATransition from "~/components/core/CTATransition";
import DataView from "~/components/core/DataView";
import EmptyState from "~/components/core/EmptyState";
import ProfilePhoto from "~/components/core/ProfilePhoto"; 

const STYLES_PROFILE_BACKGROUND = css`
  background-color: ${Constants.system.white};
  width: 100%;
  padding: 104px 56px 24px 56px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 80px 24px 16px 24px;
  }
`;

const STYLES_PROFILE = css`
  width: 100%;
  padding: 0px 56px 80px 56px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px 24px 16px 24px;
  }
`;

const STYLES_PROFILE_INFO = css`
  line-height: 1.3;
  width: 50%;
  max-width: 800px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin: 0 auto;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    max-width: 100%;
  }
`;

const STYLES_INFO = css`
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 48px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.semantic.bgLight};
  background-size: cover;
  background-position: 50% 50%;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  margin: 0 auto;
  position: relative;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 64px;
    height: 64px;
  }
`;

const STYLES_STATUS_INDICATOR = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${Constants.system.green};
  background-color: ${Constants.system.green};
`;

const STYLES_NAME = css`
  font-size: ${Constants.typescale.lvl4};
  font-family: ${Constants.font.semiBold};
  max-width: 100%;
  font-weight: 400;
  margin: 16px auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-bottom: 8px;
  }
`;

const STYLES_DESCRIPTION = css`
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.grayLight2};
  max-width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  ul,
  ol {
    white-space: normal;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
  }
`;

const STYLES_STATS = css`
  font-size: ${Constants.typescale.lvl0};
  margin: 16px auto;
  display: flex;
  justify-content: center;
  color: ${Constants.system.grayDark2};
`;

const STYLES_STAT = css`
  margin: 0px 12px;
  ${"" /* width: 112px; */}
  flex-shrink: 0;
`;

const STYLES_EXPLORE = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.text};
  font-weight: 400;
  margin: 64px auto 64px auto;
  width: 120px;
  padding-top: 16px;
  border-top: 1px solid ${Constants.system.black};
`;

const STYLES_BUTTON = css`
  margin-bottom: 32px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-bottom: 16px;
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

const STYLES_DIRECTORY_PROFILE_IMAGE = css`
  background-color: ${Constants.semantic.bgLight};
  background-size: cover;
  background-position: 50% 50%;
  height: 24px;
  width: 24px;
  margin-right: 16px;
  border-radius: 4px;
  position: relative;
`;

const STYLES_DIRECTORY_STATUS_INDICATOR = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.2px solid ${Constants.system.green};
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

const STYLES_DIRECTORY_NAME = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// const STYLES_COPY_INPUT = css`
//   pointer-events: none;
//   position: absolute;
//   opacity: 0;
// `;

function UserEntry({ user, button, onClick, message, checkStatus }) {
  const isOnline = checkStatus({ id: user.id });

  return (
    <div key={user.username} css={STYLES_USER_ENTRY}>
      <div css={STYLES_USER} onClick={onClick}>
        <div css={STYLES_DIRECTORY_PROFILE_IMAGE}>
          <ProfilePhoto 
            user={user} 
            size={24} 
          />
          {isOnline && <div css={STYLES_DIRECTORY_STATUS_INDICATOR} />}
        </div>
        <span css={STYLES_DIRECTORY_NAME}>
          {user.data.name || `@${user.username}`}
          {message ? <span css={STYLES_MESSAGE}>{message}</span> : null}
        </span>
      </div>
      {button}
    </div>
  );
}

function FilesPage({
  library,
  isOwner,
  isMobile,
  viewer,
  onAction,
  resources,
  page,
  tab = "grid",
}) {
  return (
    <div>
      {isMobile ? null : (
        <SecondaryTabGroup
          tabs={[
            {
              title: <SVG.GridView height="24px" style={{ display: "block" }} />,
              value: { tab: "grid", subtab: "files" },
            },
            {
              title: <SVG.TableView height="24px" style={{ display: "block" }} />,
              value: { tab: "table", subtab: "files" },
            },
          ]}
          value={tab}
          onAction={onAction}
          style={{ margin: "0 0 24px 0" }}
        />
      )}
      {library.length ? (
        <DataView
          key="scene-profile"
          onAction={onAction}
          viewer={viewer}
          isOwner={isOwner}
          items={library}
          view={tab}
          resources={resources}
          page={page}
        />
      ) : (
        <EmptyState>
          <FileTypeGroup />
          <div style={{ marginTop: 24 }}>This user does not have any public files yet</div>
        </EmptyState>
      )}
    </div>
  );
}

function CollectionsPage({
  user,
  viewer,
  fetched,
  subscriptions,
  tab = "collections",
  isOwner,
  onAction,
}) {
  let slates = [];
  if (tab === "collections") {
    slates = user.slates
      ? isOwner
        ? user.slates.filter((slate) => slate.isPublic === true)
        : user.slates
      : slates;
  } else {
    slates = subscriptions;
  }
  slates = slates || [];
  return (
    <div>
      <SecondaryTabGroup
        tabs={[
          { title: "Collections", value: { tab: "collections", subtab: "collections" } },
          { title: "Subscribed", value: { tab: "subscribed", subtab: "collections" } },
        ]}
        value={tab}
        onAction={onAction}
        style={{ margin: "0 0 24px 0" }}
      />
      {slates?.length ? (
        <SlatePreviewBlocks external={!viewer} slates={slates || []} onAction={onAction} />
      ) : (
        <EmptyState>
          {tab === "collections" || fetched ? (
            <React.Fragment>
              <SVG.Slate height="24px" style={{ marginBottom: 24 }} />
              {tab === "collections"
                ? `This user does not have any public collections yet`
                : `This user is not following any collections yet`}
            </React.Fragment>
          ) : (
            <LoaderSpinner style={{ height: 24, width: 24 }} />
          )}
        </EmptyState>
      )}
    </div>
  );
}

function PeersPage({
  checkStatus,
  viewer,
  following,
  followers,
  fetched,
  tab = "following",
  onAction,
  onLoginModal,
}) {
  const [selectedUser, setSelectedUser] = useState(false);
  const selectUser = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (!id || selectedUser === id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(id);
    }
  };
  const followUser = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    selectUser(e, null);
    if (!viewer) {
      onLoginModal();
      return;
    }
    await Actions.createSubscription({
      userId: id,
    });
  };

  let peers = tab === "following" ? following : followers;
  peers = peers.map((relation) => {
    const following = !!(
      viewer &&
      viewer.following.some((subscription) => {
        return subscription.id === relation.id;
      }).length
    );
    let button =
      !viewer || relation.id !== viewer?.id ? (
        <div css={STYLES_ITEM_BOX} onClick={(e) => selectUser(e, relation.id)}>
          <SVG.MoreHorizontal height="24px" />
          {selectedUser === relation.id ? (
            <Boundary
              captureResize={true}
              captureScroll={false}
              enabled
              onOutsideRectEvent={(e) => selectUser(e)}
            >
              <PopoverNavigation
                style={{
                  top: "40px",
                  right: "0px",
                }}
                navigation={[
                  [
                    {
                      text: following ? "Unfollow" : "Follow",
                      onClick: (e) => followUser(e, relation.id),
                    },
                  ],
                ]}
              />
            </Boundary>
          ) : null}
        </div>
      ) : null;

    return (
      <Link href={`/$/user/${relation.id}`} onAction={onAction}>
        <UserEntry key={relation.id} user={relation} button={button} checkStatus={checkStatus} />
      </Link>
    );
  });

  return (
    <div>
      <SecondaryTabGroup
        tabs={[
          { title: "Following", value: { tab: "following", subtab: "peers" } },
          { title: "Followers", value: { tab: "followers", subtab: "peers" } },
        ]}
        value={tab}
        onAction={onAction}
        style={{ margin: "0 0 24px 0" }}
      />
      <div>
        {peers?.length ? (
          peers
        ) : (
          <EmptyState>
            {fetched ? (
              <React.Fragment>
                <SVG.Users height="24px" style={{ marginBottom: 24 }} />
                {tab === "following"
                  ? `This user is not following anyone yet`
                  : `This user does not have any followers yet`}
              </React.Fragment>
            ) : (
              <LoaderSpinner style={{ height: 24, width: 24 }} />
            )}
          </EmptyState>
        )}
      </div>
    </div>
  );
}

export default class Profile extends React.Component {
  _ref = null;

  state = {
    contextMenu: null,
    subscriptions: [],
    followers: [],
    following: [],
    isFollowing:
      this.props.external || this.props.user.id === this.props.viewer?.id
        ? false
        : !!this.props.viewer?.following.some((entry) => {
            return entry.id === this.props.user.id;
          }),
    fetched: false,
  };

  componentDidMount = () => {
    this.fetchSocial();
  };

  componentDidUpdate = (prevProps) => {
    if (!this.state.fetched && this.props.page.params !== prevProps.page.params) {
      this.fetchSocial();
    }
  };

  fetchSocial = async () => {
    if (this.state.fetched) return;
    if (this.props.page.params?.subtab !== "peers" && this.props.page.params?.tab !== "subscribed")
      return;
    let following, followers, subscriptions;
    if (this.props.user.id === this.props.viewer?.id) {
      following = this.props.viewer?.following;
      followers = this.props.viewer?.followers;
      subscriptions = this.props.viewer?.subscriptions;
    } else {
      const query = { id: this.props.user.id };
      let response = await Actions.getSocial(query);
      if (Events.hasError(response)) {
        return;
      }
      following = response.following;
      followers = response.followers;
      subscriptions = response.subscriptions;
    }
    this.setState({
      following: following,
      followers: followers,
      subscriptions: subscriptions,
      fetched: true,
    });
  };

  _handleHide = (e) => {
    this.setState({ contextMenu: null });
  };

  // _handleClick = (e, value) => {
  //   e.stopPropagation();
  //   if (this.state.contextMenu === value) {
  //     this._handleHide();
  //   } else {
  //     this.setState({ contextMenu: value });
  //   }
  // };

  _handleFollow = async (e, id) => {
    if (this.props.external) {
      this._handleLoginModal();
      return;
    }
    this._handleHide();
    e.stopPropagation();
    await Actions.createSubscription({
      userId: id,
    });
  };

  _handleLoginModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
  };

  checkStatus = ({ id }) => {
    const { activeUsers } = this.props;
    return activeUsers && activeUsers.includes(id);
  };

  render() {
    let subtab = this.props.page.params?.subtab
      ? this.props.page.params?.subtab
      : this.props.page.params?.cid
      ? "files"
      : "collections";
    let tab = this.props.page.params?.tab;
    let library = this.props.user.library;
    let isOwner = this.props.isOwner;
    let user = this.props.user;

    const showStatusIndicator = this.props.isAuthenticated;

    return (
      <div>
        <GlobalCarousel
          carouselType="PROFILE"
          resources={this.props.resources}
          viewer={this.props.viewer}
          objects={library}
          isOwner={this.props.isOwner}
          onAction={this.props.onAction}
          isMobile={this.props.isMobile}
          external={this.props.external}
          params={this.props.page.params}
        />
        <div css={STYLES_PROFILE_BACKGROUND}>
          <div css={STYLES_PROFILE_INFO}>
            <div css={STYLES_PROFILE_IMAGE}>
              <ProfilePhoto 
                user={user} 
                size={120} 
              />
              {showStatusIndicator && this.checkStatus({ id: user.id }) && (
                <div css={STYLES_STATUS_INDICATOR} />
              )}
            </div>
            <div css={STYLES_INFO}>
              <div css={STYLES_NAME}>{Strings.getPresentationName(user)}</div>
              {!isOwner && (
                <div css={STYLES_BUTTON}>
                  {this.state.isFollowing ? (
                    <ButtonSecondary
                      onClick={(e) => {
                        this.setState({ isFollowing: false });
                        this._handleFollow(e, this.props.user.id);
                      }}
                    >
                      Unfollow
                    </ButtonSecondary>
                  ) : (
                    <ButtonPrimary
                      onClick={(e) => {
                        this.setState({ isFollowing: true });
                        this._handleFollow(e, this.props.user.id);
                      }}
                    >
                      Follow
                    </ButtonPrimary>
                  )}
                </div>
              )}
              {user.data.body ? (
                <div css={STYLES_DESCRIPTION}>
                  <ProcessedText text={user.data.body} />
                </div>
              ) : null}
              <div css={STYLES_STATS}>
                <div css={STYLES_STAT}>
                  <div style={{ fontFamily: `${Constants.font.text}` }}>
                    {library.length}{" "}
                    <span style={{ color: `${Constants.system.grayLight2}` }}>Files</span>
                  </div>
                </div>
                <div css={STYLES_STAT}>
                  <div style={{ fontFamily: `${Constants.font.text}` }}>
                    {user.slates?.length || 0}{" "}
                    <span style={{ color: `${Constants.system.grayLight2}` }}>Collections</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div css={STYLES_PROFILE}>
          <TabGroup
            tabs={[
              { title: "Files", value: { subtab: "files" } },
              { title: "Collections", value: { subtab: "collections" } },
              { title: "Peers", value: { subtab: "peers" } },
            ]}
            value={subtab}
            onAction={this.props.onAction}
            style={{ marginTop: 0, marginBottom: 32 }}
            itemStyle={{ margin: "0px 16px" }}
          />
          {subtab === "files" ? <FilesPage {...this.props} library={library} tab={tab} /> : null}
          {subtab === "collections" ? (
            <CollectionsPage
              {...this.props}
              tab={tab}
              fetched={this.state.fetched}
              subscriptions={this.state.subscriptions}
            />
          ) : null}
          {subtab === "peers" ? (
            <PeersPage
              {...this.props}
              tab={tab}
              onLoginModal={this._handleLoginModal}
              checkStatus={this.checkStatus}
              following={this.state.following}
              followers={this.state.followers}
              fetched={this.state.fetched}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
