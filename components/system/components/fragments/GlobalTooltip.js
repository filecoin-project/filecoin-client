import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";

import { v4 as uuid } from "uuid";
import { css, keyframes } from "@emotion/react";

const STYLES_TOOLTIP = css`
  z-index: ${Constants.zindex.tooltip};
`;

export class GlobalTooltip extends React.Component {
  _root;

  state = {
    tooltips: {},
  };

  componentDidMount = () => {
    window.addEventListener("add-tooltip", this._handleAdd);
    window.addEventListener("remove-tooltip", this._handleRemove);
    window.addEventListener("show-tooltip", this._handleShow);
    window.addEventListener("hide-tooltip", this._handleHide);
    window.addEventListener("resize", this._handleResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("add-tooltip", this._handleAdd);
    window.removeEventListener("remove-tooltip", this._handleRemove);
    window.removeEventListener("show-tooltip", this._handleShow);
    window.removeEventListener("hide-tooltip", this._handleHide);
    window.removeEventListener("resize", this._handleResize);
  };

  _isOffScreenHorizontally = (leftPosition, rightPosition) =>
    leftPosition < 0 || rightPosition > window.innerWidth;

  _isOffScreenVertically = (topPosition, bottomPosition) => {
    const body = document.body;
    const documentHeight = Math.max(body.scrollHeight, body.offsetHeight);

    return topPosition < 0 || bottomPosition > documentHeight;
  };

  getXPosition = (rect, bubbleRect, horizontal) => {
    let currentHorizontalProp = horizontal;
    let xOffset = this.props.elementRef ? this.props.elementRef.scrollLeft : window.pageXOffset;
    let padding = 8;

    const getFarLeft = () => rect.left - bubbleRect.width + xOffset - padding;
    const getLeft = () => rect.right - bubbleRect.width + xOffset;
    const getCenter = () => rect.left + 0.5 * rect.width - 0.5 * bubbleRect.width + xOffset;
    const getRight = () => rect.left + xOffset;
    const getFarRight = () => rect.right + xOffset + padding;
    const getDefault = () => padding;

    const getResponsivePosition = (directions) => {
      for (const [i, direction] of directions.entries()) {
        const currentOption = direction[0];
        const getPosition = direction[1];
        if (currentOption !== currentHorizontalProp) continue;

        const position = getPosition();

        if (!this._isOffScreenHorizontally(position, position + bubbleRect.width))
          return { horizontal: currentHorizontalProp, coord: position };

        /** NOTE(Amine): if all horizontal options are offscreen 
                         then we return 0px */
        if (i + 1 >= directions.length)
          return { horizontal: currentHorizontalProp, coord: getDefault() };
        /**NOTE(Amine): if the current horizontal is off screen
         *              and there is still more option then we check for the next option*/
        currentHorizontalProp = directions[i + 1][0];
      }
    };

    if (["far-left", "left"].includes(horizontal)) {
      return getResponsivePosition([
        ["far-left", getFarLeft],
        ["left", getLeft],
        ["center", getCenter],
        ["right", getRight],
        ["far-right", getFarRight],
      ]);
    }

    if (horizontal === "center") {
      return getResponsivePosition([
        ["center", getCenter],
        ["left", getLeft],
        ["right", getRight],
      ]);
    }

    return getResponsivePosition([
      ["far-right", getFarRight],
      ["right", getRight],
      ["center", getCenter],
      ["left", getLeft],
      ["far-left", getFarLeft],
    ]);
  };

  getStyle = (rect, bubbleRect, vertical, horizontal) => {
    let yOffset = this.props.elementRef ? this.props.elementRef.scrollTop : window.pageYOffset;
    let padding = 8;
    let style = { position: "absolute" };

    const xPosition = this.getXPosition(rect, bubbleRect, horizontal);

    style.left = xPosition.coord;
    /** NOTE(Amine): if we updated the horizontal prop then
     *               we should update the vertical as well */
    if (xPosition.horizontal !== horizontal && horizontal !== "above") {
      vertical = "below";
    }

    switch (vertical) {
      case "below":
        const position = rect.bottom + yOffset + padding;
        // NOTE(Amine): if below position is offscreen then go to 'above' position
        if (
          !this._isOffScreenVertically(position + bubbleRect.height, position + bubbleRect.height)
        ) {
          style.top = `${position}px`;
          break;
        }
      case "above":
        style.top = `${rect.top - bubbleRect.height + yOffset - padding}px`;
        break;
      case "up":
        style.top = `${rect.bottom - bubbleRect.height + yOffset}px`;
        break;
      case "center":
        style.top = `${rect.top + 0.5 * rect.height - 0.5 * bubbleRect.height + yOffset}px`;
        break;
      case "down":
        style.top = `${rect.top + yOffset}px`;
        break;
    }

    // switch (horizontal) {
    //   case "far-left":
    //     style.left = `${rect.left - bubbleRect.width + xOffset - padding}px`;
    //     break;
    //   case "left":
    //     style.left = `${rect.right - bubbleRect.width + xOffset}px`;
    //     break;
    //   case "center":
    //     style.left = `${rect.left + 0.5 * rect.width - 0.5 * bubbleRect.width + xOffset}px`;
    //     break;
    //   case "right":
    //     style.left = `${rect.left + xOffset}px`;
    //     break;
    //   case "far-right":
    //     style.left = `${rect.right + xOffset + padding}px`;
    //     break;
    // }
    return style;
  };

  getOrientation = (rect, bubbleRect, vertical, horizontal) => {
    let yOffset = this.props.elementRef ? this.props.elementRef.scrollTop : window.pageYOffset;
    let xOffset = this.props.elementRef ? this.props.elementRef.scrollLeft : window.pageXOffset;
    if (!vertical) {
      if (bubbleRect.height > rect.top + yOffset) {
        vertical = "below";
      } else {
        vertical = "above";
      }
    }
    if (!horizontal) {
      if (bubbleRect.width / 2 > rect.left + rect.width / 2 + xOffset) {
        horizontal = "right";
      } else if (bubbleRect.width / 2 > rect.right + rect.width / 2 + xOffset) {
        horizontal = "left";
      } else {
        horizontal = "center";
      }
    }
    return this.getStyle(rect, bubbleRect, vertical, horizontal);
  };

  _handleResize = (e) => {
    let tooltips = this.state.tooltips;
    for (let each of Object.keys(tooltips)) {
      delete tooltips[each].style;
    }
    this.setState({ tooltips });
  };

  _handleAdd = (e) => {
    let tooltips = this.state.tooltips;
    tooltips[e.detail.id] = {
      id: e.detail.id,
      show: false,
      content: e.detail.content,
      root: e.detail.root,
      bubbleRect: e.detail.bubbleRect,
      vertical: e.detail.vertical,
      horizontal: e.detail.horizontal,
    };
    this.setState({ tooltips });
  };

  _handleRemove = (e) => {
    if (this.props.allowedTypes && !this.props.allowedTypes.includes(e.detail.type)) {
      return;
    }

    if (this.state.tooltips[e.detail.id]) {
      let tooltips = this.state.tooltips;
      delete tooltips[e.detail.id];
      this.setState({ tooltips });
    }
  };

  _handleShow = async (e) => {
    if (this.state.tooltips[e.detail.id]) {
      let tooltips = this.state.tooltips;
      if (!tooltips[e.detail.id].style) {
        let anchor = tooltips[e.detail.id].root;
        let rect = anchor.getBoundingClientRect();
        let style = this.getOrientation(
          rect,
          tooltips[e.detail.id].bubbleRect,
          tooltips[e.detail.id].vertical,
          tooltips[e.detail.id].horizontal
        );
        tooltips[e.detail.id].style = style;
      }
      tooltips[e.detail.id].show = true;
      this.setState({ tooltips });
    }
  };

  _handleHide = (e) => {
    if (this.state.tooltips[e.detail.id]) {
      let tooltips = this.state.tooltips;
      tooltips[e.detail.id].show = false;
      this.setState({ tooltips });
    }
  };

  render() {
    return (
      <div>
        {Object.values(this.state.tooltips)
          .filter((t) => {
            return t.show;
          })
          .map((t) => (
            <div key={t.id} style={t.style} css={STYLES_TOOLTIP}>
              {t.content}
            </div>
          ))}
      </div>
    );
  }
}

const STYLES_INVISIBLE = css`
  opacity: 0%;
  pointer-events: none;
  position: absolute;
`;

export class TooltipWrapper extends React.Component {
  _root;
  _bubble;

  state = {
    sample: true,
  };

  componentDidMount = () => {
    let bubbleRect = this._bubble.getBoundingClientRect();

    Events.dispatchCustomEvent({
      name: "add-tooltip",
      detail: {
        type: this.props.type,
        id: this.props.id,
        content: this.props.content,
        vertical: this.props.vertical,
        horizontal: this.props.horizontal,
        root: this._root,
        bubbleRect,
      },
    });
    this.setState({ sample: false });
  };

  componentWillUnmount = () => {
    Events.dispatchCustomEvent({
      name: "remove-tooltip",
      detail: { id: this.props.id, type: this.props.type },
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.sample ? (
          <div
            ref={(c) => {
              this._bubble = c;
            }}
            style={{ display: "inline-flex" }}
            css={STYLES_INVISIBLE}
          >
            {this.props.content}
          </div>
        ) : null}
        <div
          ref={(c) => {
            this._root = c;
          }}
          style={{ display: "inline-flex" }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

const fadein = keyframes`
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
`;

const STYLES_TOOLTIP_BUBBLE = css`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.8em;
  word-wrap: break-word;
  max-width: 440px;
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};
  animation: ${fadein} 200ms ease-out 1;
`;

const STYLES_EXPANDED_TOOLTIP = css`
  box-sizing: border-box;
  max-width: 256px;
  font-size: 0.75rem;
  border-radius: 2px;
  background-color: ${Constants.system.white};
  color: ${Constants.system.black};
  animation: ${fadein} 200ms ease-out 1;
  box-shadow: 0px 8px 24px rgba(178, 178, 178, 0.2);
`;
const STYLES_EXPANDED_TOOLTIP_TITLE = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  padding: 8px 16px;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.05);
`;

const STYLES_EXPANDED_TOOLTIP_CONTENT = css`
  padding: 8px 16px 12px;
`;

const STYLES_TOOLTIP_ANCHOR = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  cursor: pointer;
`;

export class ExpandedTooltip extends React.Component {
  constructor() {
    super();
    this._id = uuid();
  }

  _handleMouseEnter = (e) => {
    Events.dispatchCustomEvent({
      name: "show-tooltip",
      detail: {
        id: this._id,
        type: this.props.type,
      },
    });
  };

  _handleClick = (e) => {
    Events.dispatchCustomEvent({
      name: "hide-tooltip",
      detail: {
        id: this._id,
        type: this.props.type,
      },
    });
  };

  render() {
    let content = (
      <div css={STYLES_EXPANDED_TOOLTIP}>
        <div css={STYLES_EXPANDED_TOOLTIP_TITLE}>
          <div>{this.props.title}</div>
          <div onClick={this._handleClick}>
            <SVG.Dismiss height="12px" style={{ padding: "4px", marginRight: "-4px" }} />
          </div>
        </div>
        <div css={STYLES_EXPANDED_TOOLTIP_CONTENT}>{this.props.content}</div>
      </div>
    );
    return (
      <TooltipWrapper
        id={this._id}
        content={content}
        horizontal={this.props.horizontal}
        vertical={this.props.vertical}
        type={this.props.type}
      >
        <span onMouseEnter={this._handleMouseEnter}>{this.props.children}</span>
      </TooltipWrapper>
    );
  }
}

export class TooltipAnchor extends React.Component {
  constructor() {
    super();
    this._id = uuid();
  }

  _handleMouseEnter = (e) => {
    Events.dispatchCustomEvent({
      name: "show-tooltip",
      detail: {
        id: this._id,
        type: this.props.type,
      },
    });
  };

  _handleMouseLeave = (e) => {
    Events.dispatchCustomEvent({
      name: "hide-tooltip",
      detail: {
        id: this._id,
        type: this.props.type,
      },
    });
  };

  render() {
    let content = (
      <div css={STYLES_TOOLTIP_BUBBLE} style={this.props.style}>
        {this.props.tooltip}
      </div>
    );
    return (
      <TooltipWrapper
        id={this._id}
        content={content}
        horizontal={this.props.horizontal}
        vertical={this.props.vertical}
        type={this.props.type}
      >
        <span
          css={STYLES_TOOLTIP_ANCHOR}
          style={this.props.anchorStyle}
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}
        >
          {this.props.children ? (
            this.props.children
          ) : (
            <SVG.Information height={this.props.height ? this.props.height : "24px"} />
          )}
        </span>
      </TooltipWrapper>
    );
  }
}
