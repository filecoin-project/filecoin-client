import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import ApplicationUserControls from "~/components/core/ApplicationUserControls";

import { css, keyframes } from "@emotion/core";
import { dispatchCustomEvent } from "~/common/custom-events";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system";

const IconMap = {
  HOME: <SVG.Home height="20px" />,
  ENCRYPTED: <SVG.SecurityLock height="20px" />,
  NETWORK: <SVG.Activity height="20px" />,
  DIRECTORY: <SVG.Directory height="20px" />,
  FOLDER: <SVG.Folder height="20px" />,
  WALLET: <SVG.OldWallet height="20px" />,
  DEALS: <SVG.Deals height="20px" />,
  MAKE_DEAL: <SVG.HardDrive height="20px" />,
  SLATES: <SVG.Layers height="20px" />,
  SLATE: <SVG.Slate height="20px" />,
  LOCAL_DATA: <SVG.HardDrive height="20px" />,
  PROFILE_PAGE: <SVG.ProfileUser height="20px" />,
  SETTINGS_DEVELOPER: <SVG.Tool height="20px" />,
  SETTINGS: <SVG.Settings height="20px" />,
  DIRECTORY: <SVG.Directory height="20px" />,
  FILECOIN: <SVG.Wallet height="20px" />,
  MINERS: <SVG.Miners height="20px" />,
};

const STYLES_ICON_ELEMENT = css`
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${Constants.system.textGray};
  user-select: none;
  cursor: pointer;
  pointer-events: auto;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_APPLICATION_HEADER = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 32px 0 32px;
  pointer-events: none;
  background-color: ${Constants.system.white};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(255, 255, 255, 0.75);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px 12px;
    width: 100%;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  ${"" /* width: 352px; */}
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const STYLES_MIDDLE = css`
  min-width: 10%;
  width: 100%;
  padding: 0 24px 0 48px;
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const STYLES_ROTATION = css`
  animation: ${rotate} 1s linear infinite;
`;

const STYLES_STATIC = css`
  transition: 200ms ease all;
`;

const STYLES_MARGIN_LEFT = css`
  margin-left: 32px;
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${Constants.system.textGray};
  user-select: none;
  cursor: pointer;
  pointer-events: auto;

  :hover {
    color: ${Constants.system.brand};
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-left: 16px;
  }
`;

export default class ApplicationHeader extends React.Component {
  keysPressed = {};

  state = {
    popup: null,
    isRefreshing: false,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("keyup", this._handleKeyUp);
  };

  //TODO toast: add a command-f light text next to svg
  //add cmd svg to header
  //add on-hover keybinds next to cmd svg
  //--> argue with haris about how that looks

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
    dispatchCustomEvent({
      name: "show-search",
      detail: {},
    });
  };

  _handleTogglePopup = (value) => {
    if (!value || this.state.popup === value) {
      this.setState({ popup: null });
    } else {
      this.setState({ popup: value });
    }
  };

  render() {
    const isBackDisabled = this.props.currentIndex === 0 || this.props.history.length < 2;

    const isForwardDisabled =
      this.props.currentIndex === this.props.history.length - 1 || this.props.history.length < 2;
    return (
      <header css={STYLES_APPLICATION_HEADER}>
        <div css={STYLES_LEFT}>
          <span css={STYLES_ICON_ELEMENT} style={{ position: "relative" }}>
            <SVG.Menu height="24px" onClick={() => this._handleTogglePopup("nav")} />
            {this.state.popup === "nav" ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={() => this._handleTogglePopup()}
                style={this.props.style}
              >
                <PopoverNavigation
                  style={{ top: 44, left: 8, width: 220, padding: "0px 24px" }}
                  itemStyle={{ margin: "24px 0" }}
                  navigation={this.props.navigation
                    .filter((item) => !item.ignore)
                    .map((item) => {
                      return {
                        text: (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: this.props.activeIds[item.id] ? Constants.system.brand : null,
                            }}
                          >
                            <span style={{ marginRight: 16 }}>{IconMap[item.decorator]}</span>
                            <span style={{ fontSize: 18 }}>{item.name}</span>
                          </div>
                        ),
                        onClick: (e) => {
                          this._handleTogglePopup();
                          this.props.onAction({
                            type: "NAVIGATE",
                            value: item.id,
                          });
                        },
                      };
                    })}
                />
              </Boundary>
            ) : null}
          </span>
          <span css={STYLES_MOBILE_HIDDEN} style={{ marginLeft: 60 }}>
            <span
              css={STYLES_ICON_ELEMENT}
              style={
                isBackDisabled ? { cursor: "not-allowed", color: Constants.system.border } : null
              }
              onClick={isBackDisabled ? () => {} : this.props.onBack}
            >
              <SVG.NavigationArrow height="24px" style={{ transform: `rotate(180deg)` }} />
            </span>
            <span
              css={STYLES_ICON_ELEMENT}
              style={
                isForwardDisabled
                  ? { cursor: "not-allowed", color: Constants.system.border, marginLeft: 8 }
                  : { marginLeft: 8 }
              }
              onClick={isForwardDisabled ? () => {} : this.props.onForward}
            >
              <SVG.NavigationArrow height="24px" />
            </span>
          </span>
          <span css={STYLES_MARGIN_LEFT} onClick={this._handleCreateSearch}>
            <SVG.Search height="24px" />
          </span>
          <span css={STYLES_MOBILE_HIDDEN} onClick={this._handleCreateSearch}>
            <span
              css={STYLES_ICON_ELEMENT}
              style={{ marginLeft: 16, color: Constants.system.border, cursor: "pointer" }}
            >
              <p>CMD+F</p>
            </span>
          </span>
        </div>
        {/* <div css={STYLES_MIDDLE} /> */}
        <div css={STYLES_RIGHT}>
          {/* <span css={STYLES_MOBILE_HIDDEN}>
            <span
              css={STYLES_ICON_ELEMENT}
              onClick={() =>
                this.props.onAction({
                  type: "SIDEBAR",
                  value: "SIDEBAR_HELP",
                })
              }
            >
              <SVG.Help height="24px" />
            </span>
          </span> */}
          <span style={{ pointerEvents: "auto", marginLeft: 24 }}>
            <ApplicationUserControls
              popup={this.state.popup}
              onTogglePopup={this._handleTogglePopup}
              viewer={this.props.viewer}
              onAction={this.props.onAction}
              onSignOut={this.props.onSignOut}
            />
          </span>
        </div>
      </header>
    );
  }
}
