import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Styles from "~/common/styles";

import { css } from "@emotion/react";
import { GlobalTooltip } from "~/components/system/components/fragments/GlobalTooltip";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { Alert } from "~/components/core/Alert";

const MODAL_MARGIN = 56;

const STYLES_NO_VISIBLE_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${Constants.semantic.bgLight};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.grayLight2};
  }
`;

const STYLES_HEADER = css`
  z-index: ${Constants.zindex.header};
  height: ${Constants.sizes.header}px;
  pointer-events: none;
  width: 100vw;
  position: fixed;
  right: 0;
  top: 0;
  transition: top 0.25s;
`;

const STYLES_CONTENT = css`
  background: ${Constants.system.white};
  width: 100%;
  min-width: 10%;
  min-height: 100vh;
  position: relative;
  margin-top: ${Constants.sizes.topOffset}px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding-left: 0px;
    padding: 0 0 88px 0;
    margin-top: calc(${Constants.sizes.topOffset}px + 36px);
  }
`;

const STYLES_SIDEBAR_ELEMENTS = css`
  height: 100vh;
  width: ${Constants.sizes.sidebar}px;
  padding: 0;
  flex-shrink: 0;
  background-color: ${Constants.semantic.bgGrayLight};
  top: 0;
  right: 0;
  ${STYLES_NO_VISIBLE_SCROLL}

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
  /*
  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    background-color: rgba(195, 195, 196, 0.6);
  }
  */
`;

const STYLES_SIDEBAR = css`
  position: fixed;
  top: 0;
  right: 0;
  margin: auto;
  z-index: ${Constants.zindex.sidebar};
`;

const STYLES_MODAL = css`
  z-index: ${Constants.zindex.modal};
  top: ${Constants.sizes.header}px;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh - ${Constants.sizes.header}px);
  position: fixed;
  left: 0;
  padding: ${MODAL_MARGIN}px;

  background-color: ${Constants.semantic.bgBlurLight6};

  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
  }
`;

const STYLES_MODAL_ELEMENTS = css`
  border-radius: 8px;
  background-color: ${Constants.system.white};
  width: 100%;
  height: calc(100vh - ${Constants.sizes.header}px - ${MODAL_MARGIN * 2}px);
  padding: 30px;
  position: relative;
`;

const STYLES_SIDEBAR_HEADER = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const STYLES_SIDEBAR_CONTENT = css`
  padding: 56px 24px 24px 24px;
  padding-top: calc(32px + ${Constants.sizes.topOffset}px);

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding-top: 8px;
    margin-bottom: 48px;
  }
`;

const STYLES_BLOCK = css`
  margin-top: 8px;
  height: 56px;
  width: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 200ms ease all;
  cursor: pointer;
  color: ${Constants.semantic.textGray};
`;

const STYLES_DISMISS = css`
  ${Styles.ICON_CONTAINER}

  color: ${Constants.semantic.textGray};

  :focus {
    outline: none;
  }

  :hover {
    color: ${Constants.system.blue};
  }
`;

export default class ApplicationLayout extends React.Component {
  _sidebar;
  _navigation;
  _body;

  state = {
    headerTop: 0,
  };

  componentDidMount = () => {
    this.prevScrollPos = window.pageYOffset;
    if (this.props.isMobile) {
      window.addEventListener("scroll", this._handleScroll);
    }
  };

  componentWillUnmount = () => {
    if (this.props.isMobile) {
      window.removeEventListener("scroll", this._handleScroll);
    }
  };

  _handleScroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (this.prevScrollPos > currentScrollPos) {
      this.setState({ headerTop: 0 });
    } else {
      if (currentScrollPos > 56) {
        this.setState({ headerTop: -56 });
      }
    }
    this.prevScrollPos = currentScrollPos;
  };

  _handleDismiss = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.onDismissSidebar();
  };

  render() {
    let sidebarElements = null;
    if (this.props.sidebar) {
      if (this.props.sidebarName === "SIDEBAR_ADD_FILE_TO_BUCKET") {
        sidebarElements = (
          <div css={STYLES_MODAL}>
            <Boundary
              onMouseDown
              captureResize={false}
              captureScroll={false}
              enabled
              onOutsideRectEvent={this._handleDismiss}
            >
              <div
                css={STYLES_MODAL_ELEMENTS}
                ref={(c) => {
                  this._sidebar = c;
                }}
              >
                <div css={STYLES_SIDEBAR_HEADER} style={{ position: "absolute", right: 30 }}>
                  <div css={STYLES_DISMISS} onClick={this._handleDismiss}>
                    <SVG.Dismiss height="24px" />
                  </div>
                </div>
                <div
                  css={STYLES_SIDEBAR_CONTENT}
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {this.props.sidebar}
                </div>
              </div>
            </Boundary>
          </div>
        );
      } else {
        sidebarElements = (
          <Boundary
            onMouseDown
            captureResize={false}
            captureScroll={false}
            enabled
            onOutsideRectEvent={this._handleDismiss}
          >
            <div css={STYLES_SIDEBAR}>
              <div
                css={STYLES_SIDEBAR_ELEMENTS}
                ref={(c) => {
                  this._sidebar = c;
                }}
              >
                <div css={STYLES_SIDEBAR_HEADER}>
                  <div css={STYLES_BLOCK} onClick={this._handleDismiss}>
                    <SVG.Dismiss height="24px" />
                  </div>
                </div>
                <div css={STYLES_SIDEBAR_CONTENT}>{this.props.sidebar}</div>
              </div>
            </div>
          </Boundary>
        );
      }
    }
    return (
      <React.Fragment>
        <div css={STYLES_CONTENT}>
          <GlobalTooltip />
          {this.props.header && (
            <div
              css={STYLES_HEADER}
              style={{ top: this.props.isMobile ? this.state.headerTop : null }}
            >
              {this.props.header}
            </div>
          )}
          <Alert
            noWarning={
              this.props.page?.id === "NAV_SIGN_IN"
                ? true
                : this.props.viewer
                ? this.props.viewer.data.status?.hidePrivacyAlert
                : false
            }
            fileLoading={this.props.fileLoading}
            onAction={this.props.onAction}
            id={this.props.isMobile ? "slate-mobile-alert" : null}
            viewer={this.props.viewer}
            style={
              this.props.isMobile
                ? { top: this.props.page?.id === "NAV_SIGN_IN" ? 0 : this.state.headerTop + 56 }
                : {
                    top: this.props.page?.id === "NAV_SIGN_IN" ? 0 : 56,
                    paddingRight: this.props.sidebar
                      ? `calc(${Constants.sizes.sidebar}px + 48px`
                      : "auto",
                  }
            }
          />
          {this.props.children}
        </div>

        {sidebarElements ? sidebarElements : null}
      </React.Fragment>
    );
  }
}
