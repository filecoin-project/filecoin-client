import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css, keyframes } from "@emotion/react";
import { dispatchCustomEvent } from "~/common/custom-events";

const fadein = keyframes`
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
`;

const TOOLTIP_BUBBLE_STYLE = `
  position: absolute;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.8em;
  max-width: 440px;
`;

const STYLES_TOOLTIP_BUBBLE = css`
  ${TOOLTIP_BUBBLE_STYLE}
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};
  animation: ${fadein} 200ms ease-out 1;
  z-index: ${Constants.zindex.tooltip};
`;

const STYLES_TOOLTIP_BUBBLE_INVISIBLE = css`
  ${TOOLTIP_BUBBLE_STYLE}
  opacity: 0%;
  pointer-events: none;
`;

export class GlobalTooltip extends React.Component {
  _root;

  state = {
    tooltip: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-tooltip", this._handleCreate);
    window.addEventListener("delete-tooltip", this._handleDelete);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-tooltip", this._handleCreate);
    window.removeEventListener("delete-tooltip", this._handleDelete);
  };

  _handleCreate = (e) => {
    this.setState(
      {
        tooltip: e.detail.tooltip,
        rect: e.detail.rect,
        userStyle: e.detail.style,
      },
      () => {
        let tooltipRect = this._root.getBoundingClientRect();
        let style = {
          ...this.state.userStyle,
          ...this.props.style,
        };
        if (tooltipRect.height > this.state.rect.top) {
          style.top = `${e.detail.rect.bottom + window.pageYOffset}px`;
        } else {
          style.top = `${
            e.detail.rect.top + window.pageYOffset - tooltipRect.height
          }px`;
        }
        if (
          tooltipRect.width / 2 >
          this.state.rect.left + this.state.rect.width / 2
        ) {
          style.left = "0px";
        } else if (
          tooltipRect.width / 2 >
          window.innerWidth - this.state.rect.right + this.state.rect.width / 2
        ) {
          style.right = "0px";
        } else {
          style.left = `${
            e.detail.rect.left +
            0.5 * e.detail.rect.width +
            window.pageXOffset -
            0.5 * tooltipRect.width
          }px`;
        }
        this.setState({ style });
      }
    );
  };

  _handleDelete = (e) => {
    this.setState({ tooltip: null });
  };

  render() {
    if (!this.state.tooltip) return null;
    return (
      <div
        ref={(c) => {
          this._root = c;
        }}
        css={
          this.state.style
            ? STYLES_TOOLTIP_BUBBLE
            : STYLES_TOOLTIP_BUBBLE_INVISIBLE
        }
        style={
          this.state.style
            ? this.state.style
            : {
                ...this.state.userStyle,
                ...this.props.style,
                top: "-50vh",
                left: "-50vw",
              }
        }
      >
        {this.state.tooltip}
      </div>
    );
  }
}

const STYLES_TOOLTIP_ANCHOR = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  cursor: pointer;
`;

export class TooltipAnchor extends React.Component {
  _root;

  _handleMouseEnter = (e) => {
    let rect = this._root.getBoundingClientRect();
    dispatchCustomEvent({
      name: "create-tooltip",
      detail: {
        tooltip: this.props.tooltip,
        rect,
        style: this.props.style,
      },
    });
  };

  _handleMouseLeave = (e) => {
    dispatchCustomEvent({
      name: "delete-tooltip",
      detail: null,
    });
  };

  render() {
    return (
      <span
        ref={(c) => {
          this._root = c;
        }}
        css={STYLES_TOOLTIP_ANCHOR}
        style={this.props.anchorStyle}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        {this.props.children ? (
          this.props.children
        ) : (
          <SVG.Information
            height={this.props.height ? this.props.height : "24px"}
          />
        )}
      </span>
    );
  }
}
