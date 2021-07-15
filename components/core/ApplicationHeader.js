import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";
import * as Styles from "~/common/styles";

import {
  ApplicationUserControls,
  ApplicationUserControlsPopup,
} from "~/components/core/ApplicationUserControls";

import { css, keyframes } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system";
import { DarkSymbol } from "~/common/logo";
import { Link } from "~/components/core/Link";
import { ButtonPrimary, ButtonTertiary } from "~/components/system/components/Buttons";

const STYLES_NAV_LINKS = css`
  display: flex;
  flex-direction: row;

  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-direction: column;
    overflow: hidden;
  }
`;

const STYLES_NAV_LINK = css`
  color: ${Constants.semantic.textGray};
  text-decoration: none;
  transition: 200ms ease color;
  display: block;
  cursor: pointer;
  padding: 4px 24px;
  font-size: ${Constants.typescale.lvl1};

  :hover {
    color: ${Constants.system.blue};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    border-bottom: 1px solid ${Constants.system.grayLight2};
    margin: 0px 24px;
    padding: 12px 0px;
    ${Styles.P2};
  }
`;

const STYLES_APPLICATION_HEADER_CONTAINER = (theme) => css`
  width: 100%;
  background-color: ${theme.system.white};
  box-shadow: 0 0 0 1px ${theme.semantic.bgGrayLight};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const STYLES_APPLICATION_HEADER = css`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  ${"" /* justify-content: space-between; */}
  width: 100%;
  height: ${Constants.sizes.header}px;
  ${"" /* padding: 0 24px 0 16px; */}
  padding: 0px 32px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px 24px;
    width: 100%;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const STYLES_MIDDLE = css`
  min-width: 10%;
  width: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: center;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const STYLES_BACKGROUND = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${Constants.semantic.bgBlurDark6};
  pointer-events: auto;

  @keyframes fade-in {
    from {
      opacity: 50%;
    }
    to {
      opacity: 100%;
    }
  }
  animation: fade-in 200ms ease-out;
`;

const STYLES_UPLOAD_BUTTON = css`
  background-color: ${Constants.semantic.bgGrayLight};
  border-radius: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  pointer-events: auto;
  ${Styles.CONTAINER_CENTERED};
`;

export default class ApplicationHeader extends React.Component {
  keysPressed = {};
  searchModKey = this.props.isMac ? (
    <SVG.MacCommand height="12px" style={{ display: "block", paddingLeft: 8, paddingRight: 8 }} />
  ) : (
    <span style={{ display: "block", paddingLeft: 8, paddingRight: 8 }}>Ctrl</span>
  );

  state = {
    showDropdown: false,
    popup: null,
    isRefreshing: false,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("keyup", this._handleKeyUp);
  };

  _handleKeyDown = (e) => {
    let prevValue = this.keysPressed[e.key];
    if (prevValue) {
      return;
    }
    this.keysPressed[e.key] = true;
    if ((this.keysPressed["Control"] || this.keysPressed["Meta"]) && this.keysPressed["f"]) {
      e.preventDefault();
      e.stopPropagation();
      this._handleCreateSearch();
    }
  };

  _handleKeyUp = (e) => {
    this.keysPressed = {};
  };

  _handleCreateSearch = (e) => {
    this.setState({ showDropdown: false });
    Events.dispatchCustomEvent({
      name: "show-search",
      detail: {},
    });
  };

  _handleTogglePopup = (value) => {
    if (!value || this.state.popup === value) {
      this.setState({ popup: null });
    } else {
      this.setState({ popup: value, showDropdown: false });
    }
  };

  render() {
    const navigation = this.props.navigation.filter((item) => item.mainNav);

    if (!this.props.viewer) {
      const searchComponent = (
        <div
          onClick={this._handleCreateSearch}
          css={Styles.HORIZONTAL_CONTAINER_CENTERED}
          style={{ border: "none", pointerEvents: "auto", cursor: "pointer", paddingLeft: 12 }}
        >
          <SVG.Search
            height="16px"
            style={{ color: Constants.semantic.textGrayDark, marginRight: 8 }}
          />
          <span css={Styles.P2} style={{ color: Constants.semantic.textGray }}>
            Search Slate...
          </span>
        </div>
      );

      //NOTE(martina): signed out view
      return (
        <header css={STYLES_APPLICATION_HEADER_CONTAINER}>
          <div css={STYLES_APPLICATION_HEADER}>
            <div css={STYLES_LEFT}>
              <Link
                onAction={this.props.onAction}
                href="/_/activity"
                style={{ pointerEvents: "auto" }}
              >
                <DarkSymbol style={{ height: 24, display: "block" }} />
              </Link>
              <div css={Styles.MOBILE_ONLY}>{searchComponent}</div>
            </div>
            <div css={STYLES_MIDDLE}>
              <span css={Styles.MOBILE_HIDDEN}>{searchComponent}</span>
            </div>
            <div css={STYLES_RIGHT}>
              <Link
                href="/_/auth?tab=signin"
                onAction={this.props.onAction}
                style={{ pointerEvents: "auto" }}
              >
                <span css={Styles.MOBILE_HIDDEN}>
                  <ButtonTertiary
                    style={{
                      padding: "0px 12px",
                      minHeight: "30px",
                      fontFamily: Constants.font.text,
                      marginRight: 8,
                    }}
                  >
                    Sign in
                  </ButtonTertiary>
                </span>
              </Link>
              <Link
                href="/_/auth?tab=signup"
                onAction={this.props.onAction}
                style={{ pointerEvents: "auto" }}
              >
                <ButtonPrimary
                  style={{
                    padding: "0px 12px",
                    minHeight: "30px",
                    fontFamily: Constants.font.text,
                  }}
                >
                  Sign up
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </header>
      );
    }
    const mobilePopup = (
      // <Boundary
      //   captureResize={false}
      //   captureScroll={false}
      //   enabled={this.state.popup === "profile"}
      //   onOutsideRectEvent={(e) => {
      //     e.stopPropagation();
      //     e.preventDefault();
      //     this._handleTogglePopup(e);
      //   }}
      // >
      <>
        <ApplicationUserControlsPopup
          popup={this.state.popup}
          onTogglePopup={this._handleTogglePopup}
          viewer={this.props.viewer}
          onAction={this.props.onAction}
          style={{ pointerEvents: "auto", paddingBottom: 16 }}
        />
        <div css={STYLES_BACKGROUND} />
      </>
      // </Boundary>
    );

    const mobileDropdown = (
      <>
        <Boundary
          captureResize={false}
          captureScroll={false}
          enabled={this.state.showDropdown}
          onOutsideRectEvent={(e) => {
            e.stopPropagation();
            e.preventDefault();
            this.setState({ showDropdown: false });
          }}
        >
          <div css={STYLES_NAV_LINKS} style={{ pointerEvents: "auto", paddingBottom: 16 }}>
            {this.props.navigation
              .filter((item) => item.mainNav)
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.pathname}
                  onAction={this.props.onAction}
                  onClick={() => this.setState({ showDropdown: false })}
                >
                  <div
                    css={STYLES_NAV_LINK}
                    style={{
                      color: this.props.activePage === item.id ? Constants.system.black : null,
                    }}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
            <div
              onClick={this._handleCreateSearch}
              css={STYLES_NAV_LINK}
              style={{ border: "none" }}
            >
              Search
            </div>
          </div>
        </Boundary>
        <div css={STYLES_BACKGROUND} />
      </>
    );

    return (
      <>
        <div style={{ width: "100vw", height: "100vh", position: "absolute" }} />
        <header css={STYLES_APPLICATION_HEADER_CONTAINER}>
          <span css={Styles.MOBILE_HIDDEN}>
            <div css={STYLES_APPLICATION_HEADER}>
              <div css={STYLES_LEFT}>
                <Link
                  onAction={this.props.onAction}
                  href="/_/activity"
                  style={{ pointerEvents: "auto" }}
                >
                  <DarkSymbol style={{ height: 24, display: "block" }} />
                </Link>
                <div
                  css={STYLES_UPLOAD_BUTTON}
                  onClick={() => {
                    this.props.onAction({
                      type: "SIDEBAR",
                      value: "SIDEBAR_ADD_FILE_TO_BUCKET",
                    });
                  }}
                  style={{ marginRight: 24, marginLeft: 24 }}
                >
                  <SVG.Plus height="16px" />
                </div>
              </div>
              <div css={STYLES_MIDDLE}>
                <div css={STYLES_NAV_LINKS} style={{ pointerEvents: "auto" }}>
                  {navigation.map((item, i) => (
                    <Link key={item.id} href={item.pathname} onAction={this.props.onAction}>
                      <div
                        css={STYLES_NAV_LINK}
                        style={{
                          color: this.props.activePage === item.id ? Constants.system.black : null,
                        }}
                      >
                        {item.name}
                      </div>
                    </Link>
                  ))}
                  <div onClick={this._handleCreateSearch} css={STYLES_NAV_LINK}>
                    Search
                  </div>
                </div>
              </div>
              <div css={STYLES_RIGHT}>
                <span style={{ pointerEvents: "auto", marginLeft: 24 }}>
                  <ApplicationUserControls
                    popup={this.state.popup}
                    onTogglePopup={this._handleTogglePopup}
                    viewer={this.props.viewer}
                    onAction={this.props.onAction}
                  />
                </span>
              </div>
            </div>
          </span>
          <span css={Styles.MOBILE_ONLY}>
            <div css={STYLES_APPLICATION_HEADER}>
              <div css={STYLES_LEFT}>
                <div
                  css={Styles.ICON_CONTAINER}
                  style={{ pointerEvents: "auto" }}
                  onClick={() =>
                    this.setState({ showDropdown: !this.state.showDropdown, popup: null })
                  }
                >
                  <SVG.MenuMinimal height="16px" />
                </div>
              </div>
              <div css={STYLES_MIDDLE}>
                <Link
                  onAction={this.props.onAction}
                  href="/_/activity"
                  style={{ pointerEvents: "auto" }}
                >
                  <DarkSymbol style={{ height: 24, display: "block" }} />
                </Link>
              </div>
              <div css={STYLES_RIGHT}>
                <span style={{ pointerEvents: "auto", marginLeft: 24 }}>
                  <ApplicationUserControls
                    popup={false}
                    onTogglePopup={this._handleTogglePopup}
                    viewer={this.props.viewer}
                    onAction={this.props.onAction}
                  />
                </span>
              </div>
            </div>
            {this.state.popup === "profile"
              ? mobilePopup
              : this.state.showDropdown
              ? mobileDropdown
              : null}
          </span>
        </header>
      </>
    );
  }
}
