import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";
import * as Window from "~/common/window";
import * as Validations from "~/common/validations";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import CTATransition from "~/components/core/CTATransition";

import { CheckBox } from "~/components/system/components/CheckBox";
import { css } from "@emotion/core";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { Toggle } from "~/components/system/components/Toggle";
import { dispatchCustomEvent } from "~/common/custom-events";
import { DynamicIcon } from "~/components/core/DynamicIcon";
import { Tooltip } from "~/components/core/Tooltip";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonDisabled,
  ButtonWarning,
} from "~/components/system/components/Buttons";

//NOTE(martina): sets 200px as the standard width for a 1080px wide layout with 20px margin btwn images.
//If the container is larger or smaller, it scales accordingly by that factor
const MIN_SIZE = 10;
const SIZE = 200;
const MARGIN = 20;
const CONTAINER_SIZE = 5 * SIZE + 4 * MARGIN;
const TAG_HEIGHT = 20;

const SIZE_LIMIT = 1000000; //NOTE(martina): 1mb limit for twitter preview images

const generateLayout = (items) => {
  if (!items) {
    return [];
  }

  if (!items.length) {
    return [];
  }

  return (
    items.map((item, i) => {
      return {
        x: (i % 5) * (SIZE + MARGIN),
        y: 0,
        w: SIZE,
        h: null,
        z: 0,
        id: item.id,
      };
    }) || []
  );
};

const preload = (item) =>
  new Promise((resolve, reject) => {
    if (!item.type || !Validations.isPreviewableImage(item.type)) {
      resolve(200);
    }
    const img = new Image();
    img.onload = () => {
      resolve((200 * img.height) / img.width);
    };
    img.onerror = reject;
    const url = item.url.replace("https://undefined", "https://");
    img.src = url;
  });

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_LOADER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 400px);
  width: 100%;
`;

const STYLES_EDIT_CONTAINER = css`
  border: 1px solid rgba(229, 229, 229, 0.5);
  padding: 24px;
  overflow: hidden;
`;

const STYLES_CONTAINER = css`
  width: 100%;
  position: relative;
  height: 100vh;
  z-index: ${Constants.zindex.body};
  overflow: hidden;
`;

const STYLES_CONTAINER_EDITING = css`
  ${STYLES_CONTAINER}
  background-image: radial-gradient(
    ${Constants.system.darkGray} 10%,
    transparent 0
  );
  background-size: 30px 30px;
  background-position: -50% -50%;
`;

const STYLES_BUTTONS_ROW = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const STYLES_TOOLTIP_ANCHOR = css`
  border: 1px solid #f2f2f2;
  background-color: ${Constants.system.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-around;
  box-shadow: 0px 8px 24px rgba(178, 178, 178, 0.2);
  width: 275px;
  height: auto;
  position: absolute;
  top: -11px;
  left: 50px;
  z-index: ${Constants.zindex.tooltip};
`;

const STYLES_TOOLTIP_TEXT = css`
  padding: 0 12px 0 12px;
  font-family: ${Constants.font.text};
  font-size: 12px;
`;

const STYLES_TOGGLE_BOX = css`
  ${STYLES_BUTTONS_ROW}
  border: 1px solid ${Constants.system.gray};
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;
`;

const STYLES_ITEM = css`
  position: absolute;
  transform-origin: top left;
  cursor: pointer;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`;

const STYLES_ITEM_EDITING = css`
  ${STYLES_ITEM}
  cursor: grab;

  :active {
    cursor: grabbing;
  }
`;

const STYLES_FILE_TAG = css`
  font-family: ${Constants.font.text};
  color: ${Constants.system.grayBlack};
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 4px;
  background: ${Constants.system.white};
`;

const STYLES_FILE_NAME = css`
  width: 100%;
  min-width: 10%;
  overflow: hidden;
  text-wrap: nowrap;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const STYLES_FILE_TYPE = css`
  color: ${Constants.system.darkGray};
  text-transform: uppercase;
  flex-shrink: 0;
  margin-left: 16px;
  text-align: right;
`;

const STYLES_HANDLE_BOX = css`
  cursor: nwse-resize;
  position: absolute;
  height: 24px;
  width: 24px;
  color: rgba(195, 195, 196, 0.75);
`;

const STYLES_ACTION_BAR = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 0 1px ${Constants.system.lightBorder} inset,
    0 0 4px 2px ${Constants.system.shadow};
  border-radius: 4px;
  padding: 12px 32px;
  box-sizing: border-box;
  background-color: ${Constants.system.foreground};
  position: fixed;
  bottom: 12px;
  width: calc(100vw - ${Constants.sizes.sidebar}px + 32px);
  max-width: 1660px;
  z-index: ${Constants.zindex.header};

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: calc(100vw - 48px);
  }
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
  display: flex;
  align-items: center;
`;

const STYLES_FILES_SELECTED = css`
  font-family: ${Constants.font.semiBold};

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_ICON_BOX = css`
  height: 32px;
  width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 16px;
`;

const STYLES_ICON_CIRCLE = css`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: rgba(248, 248, 248, 0.6);
  color: #4b4a4d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 8px;
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
`;

const STYLES_ICON_ROW = css`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: calc(50% - 60px);
`;

export class SlateLayout extends React.Component {
  _ref;
  _input;
  keysPressed = {};

  state = {
    unit: 10,
    items: this.props.items,
    layout: this.props.layout || generateLayout(this.props.items),
    hover: null,
    containerHeight: 1000,
    prevLayouts: [],
    zIndexMax:
      this.props.layout && this.props.layout.length
        ? Math.max(...this.props.layout.map((pos) => pos.z)) + 1
        : 1,
    fileNames: this.props.fileNames,
    defaultLayout: this.props.layout ? this.props.defaultLayout : true,
    editing: false,
    show: false,
    checked: {},
    copyValue: "",
    tooltip: null,
    keyboardTooltip: false,
    signInModal: false,
  };

  //LEFT OFF HERE:
  //make sure things work if you delete while in editing mode (haven't tested that yet)
  //add the "delete" and checkbox actions. drag handle. and make preview image
  //if there's repeats of ids (not cids), it'll style them the same way (potentially diff position though) everytime you change something
  //if width under a certain amount, set to a default mobile flex or grid layout of single items
  //add flag for following defaultLayout for last element or not. so know where to put next one. "unchanged since last add" flag. if something deleted, messes this up as well

  componentDidMount = async () => {
    this.debounceInstance = this.debounce(this._recalculate, 250);
    window.addEventListener("resize", this.debounceInstance);
    window.addEventListener("remote-object-update", this._handleRemoteEditObject);
    await this.calculateUnit();
    if (this.props.layout) {
      let layout = await this.repairLayout(this.state.items);
      if (layout) {
        this.setState({ show: true, layout });
        this.props.onSaveLayout(
          {
            ver: "2.0",
            fileNames: this.state.fileNames,
            defaultLayout: this.state.defaultLayout,
            layout,
          },
          true
        );
      } else {
        this.setState({ show: true });
      }
    } else {
      let layout = await this.calculateLayout();
      this.props.onSaveLayout(
        {
          ver: "2.0",
          fileNames: this.state.fileNames,
          defaultLayout: this.state.defaultLayout,
          layout,
        },
        true
      );
      this.setState({ show: true, layout });
    }
    this.calculateContainer();
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.debounceInstance);
    window.removeEventListener("remote-object-update", this._handleRemoteEditObject);
    if (this.state.editing) {
      window.removeEventListener("keydown", this._handleKeyDown);
      window.removeEventListener("keyup", this._handleKeyUp);
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.slateId !== this.props.slateId) {
      //NOTE(martina): to handle when you navigate between two slates, so it registers the change properly
      await this.setState({ show: false });
      let defaultLayout = this.props.layout ? this.props.defaultLayout : true;
      let fileNames = this.props.fileNames;
      let layout;
      if (this.props.layout) {
        layout = await this.repairLayout(this.props.items, {
          defaultLayout,
          fileNames,
          layout: this.props.layout,
        });
        if (layout) {
          this.props.onSaveLayout(
            {
              ver: "2.0",
              fileNames,
              defaultLayout,
              layout,
            },
            true
          );
        } else {
          layout = this.props.layout;
        }
      } else {
        layout = generateLayout(this.props.items);
        await this.setState({ layout, items: this.props.items });
        layout = await this.calculateLayout(layout);
        this.props.onSaveLayout(
          {
            ver: "2.0",
            fileNames,
            defaultLayout,
            layout,
          },
          true
        );
      }
      await this.setState({
        items: this.props.items,
        layout,
        prevLayouts: [],
        zIndexMax: layout && layout.length ? Math.max(...layout.map((pos) => pos.z)) + 1 : 1,
        fileNames,
        defaultLayout,
        editing: false,
        show: true,
      });
      this.calculateContainer();
    } else if (prevProps.items.length !== this.props.items.length) {
      //NOTE(martina): to handle when items are added / deleted from the slate, and recalculate the layout
      //NOTE(martina): if there is a case that allows simultaneous add / delete (aka modify but same length), this will not work.
      //would need to replace it with event listener + custom events
      let layout = await this.repairLayout(this.props.items);
      if (layout) {
        await this.setState({ layout, items: this.props.items });
        this.calculateContainer();
        if (!this.state.editing) {
          this.props.onSaveLayout(
            {
              ver: "2.0",
              fileNames: this.state.fileNames,
              defaultLayout: this.state.defaultLayout,
              layout,
            },
            true
          );
        }
      }
    }
  };

  _handleRemoteEditObject = async ({ detail }) => {
    const { object } = detail;

    const items = [...this.state.items];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === object.id) {
        items[i] = object;
        break;
      }
    }
    this.setState({ items });
  };

  debounce = (func, ms) => {
    let timer;

    return () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(func, ms);
    };
  };

  _recalculate = async () => {
    let prevUnit = this.state.unit;
    await this.calculateUnit();
    this.setState({ containerHeight: this.state.containerHeight * (this.state.unit / prevUnit) });
  };

  calculateUnit = () => {
    let ref = this._ref;
    if (!ref) {
      return;
    }
    let unit = ref.clientWidth / CONTAINER_SIZE;
    if (unit === 0) {
      return;
    }
    this.setState({ unit });
  };

  calculateContainer = () => {
    let highestPoints = this.state.layout.map((pos) => {
      return pos.y + pos.h;
    });
    let containerHeight = Math.max(...highestPoints) * this.state.unit;
    this.setState({ containerHeight });
  };

  repairLayout = async (items, layouts) => {
    let defaultLayout = layouts ? layouts.defaultLayout : this.state.defaultLayout;
    let fileNames = layouts ? layouts.fileNames : this.state.fileNames;
    let layout = layouts ? this.cloneLayout(layouts.layout) : this.cloneLayout(this.state.layout);
    let layoutIds = layout.map((pos) => pos.id);
    let repairNeeded = false;
    if (items.length === layout.length) {
      let itemIds = items.map((item) => item.id);
      for (let i = 0; i < itemIds.length; i++) {
        if (itemIds[i] !== layoutIds[i]) {
          repairNeeded = true;
          break;
        }
      }
      if (!repairNeeded) {
        return;
      }
    }
    let newLayout = items.map((item) => null) || [];
    for (let i = 0; i < items.length; i++) {
      let layoutIndex = layoutIds.indexOf(items[i].id);
      if (layoutIndex === -1) {
        continue;
      } else {
        newLayout[i] = layout[layoutIndex];
      }
    }
    let added = [];
    for (let i = 0; i < newLayout.length; i++) {
      if (!newLayout[i]) {
        added.push(items[i]);
      }
    }
    let results = await Promise.allSettled(added.map((item) => preload(item)));
    let heights = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return 200;
      }
    });
    let yMax;
    if (!defaultLayout) {
      let highestPoints = layout.map((pos) => {
        return pos.y + pos.h;
      });
      yMax = Math.max(...highestPoints) + MARGIN;
      if (fileNames) {
        yMax += TAG_HEIGHT;
      }
    }
    let h = 0;
    for (let i = 0; i < newLayout.length; i++) {
      if (!newLayout[i]) {
        let itemAbove = h - 5 < 0 ? null : newLayout[i - 5];
        let height = heights[h];
        newLayout[i] = {
          x: defaultLayout ? (i % 5) * (SIZE + MARGIN) : (h % 5) * (SIZE + MARGIN),
          y: defaultLayout
            ? 0
            : itemAbove
            ? fileNames
              ? itemAbove.y + itemAbove.h + MARGIN + TAG_HEIGHT
              : itemAbove.y + itemAbove.h + MARGIN
            : yMax,
          h: height,
          w: SIZE,
          z: 0,
          id: items[i].id,
        };
        h += 1;
      }
    }
    if (defaultLayout) {
      for (let i = 0; i < newLayout.length; i++) {
        let itemAbove = i - 5 < 0 ? null : newLayout[i - 5];
        newLayout[i].x = (i % 5) * (SIZE + MARGIN);
        newLayout[i].y = itemAbove
          ? fileNames
            ? itemAbove.y + itemAbove.h + MARGIN + TAG_HEIGHT
            : itemAbove.y + itemAbove.h + MARGIN
          : 0;
      }
    }
    return newLayout;
  };

  calculateLayout = async (oldLayout) => {
    let heights = await this.calculateHeights();
    let layout = oldLayout ? oldLayout : this.state.layout;
    for (let i = 0; i < this.state.items.length; i++) {
      let height = heights[i];
      if (height === 0) continue;
      let itemAbove = i - 5 < 0 ? null : layout[i - 5];
      layout[i] = {
        x: (i % 5) * (SIZE + MARGIN),
        y: itemAbove
          ? this.state.fileNames
            ? itemAbove.y + itemAbove.h + MARGIN + TAG_HEIGHT
            : itemAbove.y + itemAbove.h + MARGIN
          : 0,
        w: SIZE,
        h: oldLayout && oldLayout.length > i ? oldLayout[i].h || height : height,
        z: 0,
        id: this.state.items[i].id,
      };
    }
    return layout;
  };

  calculateHeights = async () => {
    let results = await Promise.allSettled(this.state.items.map((item, i) => preload(item, i)));
    let heights = results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return 200;
      }
    });
    return heights;
  };

  cloneLayout = (layout) => {
    let copy = [];
    for (let pos of layout) {
      copy.push({ ...pos });
    }
    return copy;
  };

  _toggleEditing = async (e, discardChanges) => {
    if (this.state.editing) {
      window.removeEventListener("keydown", this._handleKeyDown);
      window.removeEventListener("keyup", this._handleKeyUp);
      if (discardChanges) {
        let layout = await this.repairLayout(this.state.items, this.state.savedProperties);
        let { fileNames, defaultLayout } = this.state.savedProperties;
        if (
          layout ||
          fileNames !== this.state.fileNames ||
          defaultLayout !== this.state.defaultLayout
        ) {
          this.props.onSaveLayout(
            {
              ver: "2.0",
              fileNames,
              defaultLayout,
              layout,
            },
            true
          );
        }
        await this.setState({
          editing: false,
          fileNames,
          defaultLayout,
          layout: layout ? layout : this.state.savedProperties.layout,
          prevLayouts: [],
        });
        this.calculateContainer();
      } else {
        await this.setState({ editing: false, prevLayouts: [] });
      }
    } else {
      window.addEventListener("keydown", this._handleKeyDown);
      window.addEventListener("keyup", this._handleKeyUp);
      await this.setState({
        editing: true,
        savedProperties: {
          defaultLayout: this.state.defaultLayout,
          fileNames: this.state.fileNames,
          layout: this.cloneLayout(this.state.layout),
        },
      });
    }
    this.calculateUnit();
  };

  _toggleFileNames = (e) => {
    if (!this.state.defaultLayout) {
      this.setState({
        fileNames: !this.state.fileNames,
        prevLayouts: [
          ...this.state.prevLayouts,
          {
            defaultLayout: this.state.defaultLayout,
            fileNames: this.state.fileNames,
            layout: this.cloneLayout(this.state.layout),
          },
        ],
      });
    } else {
      let layout = this.cloneLayout(this.state.layout);
      for (let i = 5; i < this.state.items.length; i++) {
        let itemAbove = layout[i - 5];
        if (this.state.fileNames) {
          layout[i].y = itemAbove.y + itemAbove.h + MARGIN;
        } else {
          layout[i].y = itemAbove.y + itemAbove.h + MARGIN + TAG_HEIGHT;
        }
      }
      this.setState({
        layout,
        fileNames: !this.state.fileNames,
        prevLayouts: [
          ...this.state.prevLayouts,
          {
            defaultLayout: this.state.defaultLayout,
            fileNames: this.state.fileNames,
            layout: this.cloneLayout(this.state.layout),
          },
        ],
      });
    }
  };

  _handleKeyDown = (e) => {
    let prevValue = this.keysPressed[e.key];
    this.keysPressed[e.key] = true;
    if (
      (this.keysPressed["Control"] || this.keysPressed["Meta"]) &&
      this.keysPressed["z"] &&
      prevValue !== this.keysPressed[e.key]
    ) {
      e.preventDefault();
      e.stopPropagation();
      this._handleUndo();
    } else if (
      (this.keysPressed["Control"] || this.keysPressed["Meta"]) &&
      this.keysPressed["s"] &&
      prevValue !== this.keysPressed[e.key]
    ) {
      e.preventDefault();
      e.stopPropagation();
      this._handleSaveLayout();
    } else if (
      (this.keysPressed["Control"] || this.keysPressed["Meta"]) &&
      prevValue !== this.keysPressed[e.key]
    ) {
      e.preventDefault();
      e.stopPropagation();
      this._handleHelpKeybind();
    }
  };

  _handleKeyUp = (e) => {
    this.keysPressed[e.key] = false;
    if (!this.keysPressed["Meta"] || !this.keysPressed["Control"]) {
      this._handleHelpKeybind();
    }
    this.keysPressed = {};
  };

  _handleHelpKeybind = () => {
    if (!this.state.keyboardTooltip) {
      this.setState({ keyboardTooltip: true });
    } else {
      this.setState({ keyboardTooltip: false });
    }
  };

  _handleUndo = () => {
    if (this.state.prevLayouts.length) {
      let prevLayouts = this.state.prevLayouts;
      let layouts = prevLayouts.pop();
      this.setState({ ...layouts, prevLayouts });
    }
  };

  _handleMouseDown = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let layout = this.cloneLayout(this.state.layout);
    layout[i].z = this.state.zIndexMax;
    this.setState({
      xStart: e.clientX,
      yStart: e.clientY,
      dragIndex: i,
      origLayout: this.cloneLayout(layout),
      layout,
      zIndexMax: this.state.zIndexMax + 1,
      prevLayouts: [
        ...this.state.prevLayouts,
        {
          defaultLayout: this.state.defaultLayout,
          fileNames: this.state.fileNames,
          layout: this.cloneLayout(this.state.layout),
        },
      ],
    });
    window.addEventListener("mousemove", this._handleDrag);
    window.addEventListener("mouseup", this._handleMouseUp);
  };

  _handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let layout = this.cloneLayout(this.state.origLayout);
    let pos = layout[this.state.dragIndex];
    let dX = (e.clientX - this.state.xStart) / this.state.unit;
    let dY = (e.clientY - this.state.yStart) / this.state.unit;
    if (e.shiftKey) {
      if (Math.abs(dY) > Math.abs(dX)) {
        pos.y += dY;
      } else {
        pos.x += dX;
      }
    } else {
      pos.x += dX;
      pos.y += dY;
    }
    if (pos.x >= CONTAINER_SIZE || pos.x + pos.w <= 0 || pos.y + pos.h <= 0) {
      return;
    }
    this.setState({ layout });
  };

  _handleMouseUp = (e) => {
    window.removeEventListener("mousemove", this._handleDrag);
    window.removeEventListener("mouseup", this._handleMouseUp);
    let layout = this.state.layout;
    let pos = layout[this.state.dragIndex];
    if (!e.ctrlKey && !e.metaKey) {
      pos.x = Math.round(pos.x / 10) * 10;
      pos.y = Math.round(pos.y / 10) * 10;
    }
    let state = { dragIndex: null, layout };
    if (this.state.defaultLayout) {
      if (e.clientX !== this.state.xStart || e.clientX !== this.state.yStart) {
        state.defaultLayout = false;
      }
    }
    if ((pos.y + pos.h) * this.state.unit > this.state.containerHeight) {
      state.containerHeight = (pos.y + pos.h) * this.state.unit;
    }
    this.setState(state);
  };

  _handleMouseDownResize = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let layout = this.cloneLayout(this.state.layout);
    layout[i].z = this.state.zIndexMax;
    this.setState({
      xStart: e.clientX,
      yStart: e.clientY,
      dragIndex: i,
      origLayout: this.cloneLayout(layout),
      layout,
      zIndexMax: this.state.zIndexMax + 1,
      prevLayouts: [
        ...this.state.prevLayouts,
        {
          defaultLayout: this.state.defaultLayout,
          fileNames: this.state.fileNames,
          layout: this.cloneLayout(this.state.layout),
        },
      ],
      ratio: [layout[i].w, layout[i].h],
      freeRatio: !Validations.isPreviewableImage(this.state.items[i].type),
    });
    window.addEventListener("mousemove", this._handleDragResize);
    window.addEventListener("mouseup", this._handleMouseUpResize);
  };

  _handleDragResize = (e) => {
    let state = {};
    e.preventDefault();
    e.stopPropagation();
    let layout = this.cloneLayout(this.state.origLayout);
    let pos = layout[this.state.dragIndex];
    let dX = (e.clientX - this.state.xStart) / this.state.unit;
    let dY;
    if (this.state.freeRatio && !e.shiftKey) {
      dY = (e.clientY - this.state.yStart) / this.state.unit;
    } else {
      dY = (dX * this.state.ratio[1]) / this.state.ratio[0];
    }
    pos.w += dX;
    pos.h += dY;
    if (
      pos.w < MIN_SIZE ||
      pos.h < MIN_SIZE ||
      pos.w > CONTAINER_SIZE ||
      pos.x >= CONTAINER_SIZE ||
      pos.x + pos.w <= 0 ||
      pos.y + pos.h <= 0
    ) {
      return;
    }
    this.setState({ layout, ...state });
  };

  _handleMouseUpResize = (e) => {
    window.removeEventListener("mousemove", this._handleDragResize);
    window.removeEventListener("mouseup", this._handleMouseUpResize);
    let layout = this.state.layout;
    let pos = layout[this.state.dragIndex];
    if (!e.ctrlKey && !e.metaKey) {
      pos.w = Math.round(pos.w / 10) * 10;
      if (this.state.freeRatio) {
        pos.h = Math.round(pos.h / 10) * 10;
      } else {
        pos.h = (pos.w * this.state.ratio[1]) / this.state.ratio[0];
      }
    }
    let state = { dragIndex: null, layout, ratio: null };
    if (this.state.defaultLayout) {
      if (e.clientX !== this.state.xStart || e.clientX !== this.state.yStart) {
        state.defaultLayout = false;
      }
    }
    if ((pos.y + pos.h) * this.state.unit > this.state.containerHeight) {
      state.containerHeight = (pos.y + pos.h) * this.state.unit;
    }
    this.setState(state);
  };

  _handleResetLayout = async () => {
    if (
      !window.confirm("Are you sure you want to reset your layout to the default column layout?")
    ) {
      return;
    }
    let prevLayout = this.cloneLayout(this.state.layout);
    let layout = await this.calculateLayout();
    this.setState({
      defaultLayout: true,
      prevLayouts: [
        ...this.state.prevLayouts,
        {
          defaultLayout: this.state.defaultLayout,
          fileNames: this.state.fileNames,
          layout: prevLayout,
        },
      ],
      layout,
      zIndexMax: 1,
    });
  };

  _handleSaveLayout = async () => {
    //NOTE(martina): collapses the z-indexes back down to 0 through n-1 (so they don't continuously get higher)
    let zIndexes = this.state.layout.map((pos) => pos.z);
    zIndexes = [...new Set(zIndexes)];
    zIndexes.sort(function (a, b) {
      return a - b;
    });
    let layout = this.cloneLayout(this.state.layout);
    for (let pos of layout) {
      pos.z = zIndexes.indexOf(pos.z);
    }
    await this.props.onSaveLayout({
      ver: "2.0",
      fileNames: this.state.fileNames,
      defaultLayout: this.state.defaultLayout,
      layout: layout,
    });
    await this.setState({ layout });
    this._toggleEditing();
  };

  _handleCheckBox = (e) => {
    let checked = this.state.checked;
    if (e.target.value === false) {
      delete checked[e.target.name];
      this.setState({ checked });
      return;
    }
    this.setState({
      checked: { ...this.state.checked, [e.target.name]: true },
    });
  };

  _handleDelete = (ids) => {
    dispatchCustomEvent({ name: "remote-delete-object", detail: { ids } });
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ copyValue: value }, () => {
      this._input.select();
      document.execCommand("copy");
    });
  };

  _handleSetPreview = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let url = this.state.items[i].url.replace("https://undefined", "https://");
    if (this.props.preview === url) return;
    this.props.onSavePreview(url);
  };

  _handleDownload = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    if (i !== undefined) {
      let filename = this.state.items[i].name || this.state.items[i].title;
      let uri = this.state.items[i].url.replace("https://undefined", "https://");
      Window.saveAs(uri, filename);
    }
    // else {
    //   for (let i of Object.keys(this.state.checked)) {
    //     console.log(i);
    //     download = this.state.items[i].name || this.state.items[i].title;
    //     uri = this.state.items[i].url.replace("https://undefined", "https://");
    //     let link = document.createElement("a");
    //     document.body.appendChild(link);
    //     link.target = "_blank";
    //     link.download = download;
    //     link.href = uri;
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // }
    // this.setState({ checked: {} });
  };

  _handleSaveCopy = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let items = [];
    if (i !== undefined) {
      items = [
        {
          ownerId: this.state.items[i].ownerId,
          cid: this.state.items[i].cid || Strings.urlToCid(this.state.items[i].url),
        },
      ];
    } else {
      for (let i of Object.keys(this.state.checked)) {
        items.push({
          ownerId: this.state.items[i].ownerId,
          cid: this.state.items[i].cid || Strings.urlToCid(this.state.items[i].url),
        });
      }
    }
    this.props.onSaveCopy(items);
    this.setState({ checked: {} });
  };

  _handleAddToSlate = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let items = [];
    if (i !== undefined) {
      items = [this.state.items[i]];
    } else if (Object.keys(this.state.checked).length) {
      for (let index of Object.keys(this.state.checked)) {
        items.push(this.state.items[index]);
      }
    }
    this.setState({ checked: {} });
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_ADD_FILE_TO_SLATE",
      data: { files: items, fromSlate: true },
    });
  };

  _handleRemoveFromSlate = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let ids = [];
    if (i !== undefined) {
      ids = [this.state.items[i].id];
    } else {
      for (let index of Object.keys(this.state.checked)) {
        ids.push(this.state.items[index].id);
      }
    }
    this.props.onRemoveFromSlate({ detail: { ids } });
    this.setState({ checked: {} });
  };

  _handleDeleteFiles = (e, i) => {
    e.stopPropagation();
    e.preventDefault();
    let ids = [];
    if (i !== undefined) {
      ids = [this.state.items[i].id];
    } else {
      for (let index of Object.keys(this.state.checked)) {
        ids.push(this.state.items[index].id);
      }
    }
    let cids = [];
    for (let file of this.props.viewer.library[0].children) {
      if (ids.includes(file.id)) {
        cids.push(file.cid || file.ipfs.replace("/ipfs/", ""));
      }
    }
    this.props.onDeleteFiles(cids);
    this.setState({ checked: {} });
  };

  _stopProp = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  _handleLoginModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ signInModal: true });
  };

  render() {
    let numChecked = Object.keys(this.state.checked).length;
    let unit = this.state.unit;
    return (
      <div>
        {this.props.isOwner ? (
          this.state.editing ? (
            <div
              css={STYLES_BUTTONS_ROW}
              style={{ marginBottom: 16, justifyContent: "space-between" }}
            >
              <div css={STYLES_BUTTONS_ROW} style={{ width: "100%", minWidth: "10%" }}>
                <div css={STYLES_TOGGLE_BOX} style={{ marginRight: 16, paddingLeft: 24 }}>
                  <span
                    style={{
                      fontFamily: Constants.font.semiBold,
                      fontSize: 14,
                      letterSpacing: "0.2px",
                    }}
                  >
                    Display titles
                  </span>
                  <div
                    style={{
                      transform: "scale(0.7)",
                      marginLeft: 8,
                    }}
                  >
                    <Toggle active={this.state.fileNames} onChange={this._toggleFileNames} />
                  </div>
                </div>
                {this.state.defaultLayout ? (
                  <ButtonDisabled
                    style={{
                      marginRight: 16,
                      backgroundColor: Constants.system.white,
                    }}
                  >
                    Reset layout
                  </ButtonDisabled>
                ) : (
                  <ButtonSecondary onClick={this._handleResetLayout} style={{ marginRight: 16 }}>
                    Reset layout
                  </ButtonSecondary>
                )}
                {this.state.prevLayouts.length ? (
                  <ButtonSecondary style={{ marginRight: 16 }} onClick={this._handleUndo}>
                    Undo
                  </ButtonSecondary>
                ) : (
                  <ButtonDisabled
                    style={{
                      marginRight: 16,
                      backgroundColor: Constants.system.white,
                    }}
                  >
                    Undo
                  </ButtonDisabled>
                )}
                {!this.state.keyboardTooltip ? (
                  <div onMouseEnter={() => this.setState({ keyboardTooltip: true })}>
                    <SVG.MacCommand
                      height="15px"
                      style={{ marginLeft: "14px", color: Constants.system.darkGray }}
                      onMouseEnter={() => this.setState({ keyboardTooltip: true })}
                    />
                  </div>
                ) : (
                  <div css={STYLES_BUTTONS_ROW} style={{ position: "relative" }}>
                    <span
                      style={{ marginRight: "14px" }}
                      onMouseLeave={() => this.setState({ keyboardTooltip: false })}
                    >
                      <SVG.MacCommand
                        height="15px"
                        style={{
                          marginLeft: "14px",
                          marginRight: "7px",
                          color: Constants.system.darkGray,
                        }}
                      />
                    </span>
                    <div css={STYLES_TOOLTIP_ANCHOR}>
                      <div>
                        <p
                          css={STYLES_TOOLTIP_TEXT}
                          style={{
                            fontFamily: Constants.font.semiBold,
                            fontSize: "14px",
                            paddingTop: "12px",
                          }}
                        >
                          Keyboard shortcuts
                        </p>
                      </div>
                      <div>
                        <p css={STYLES_TOOLTIP_TEXT}>shift + click and drag</p>
                        <p css={STYLES_TOOLTIP_TEXT} style={{ color: Constants.system.darkGray }}>
                          keep x value or y value while moving file
                        </p>
                      </div>
                      <div>
                        <p css={STYLES_TOOLTIP_TEXT}>shift + click and resize</p>
                        <p css={STYLES_TOOLTIP_TEXT} style={{ color: Constants.system.darkGray }}>
                          keep aspect ratio while resizing
                        </p>
                      </div>
                      <div>
                        <p css={STYLES_TOOLTIP_TEXT}>ctrl + click and drag</p>
                        <p css={STYLES_TOOLTIP_TEXT} style={{ color: Constants.system.darkGray }}>
                          move without snapping to the dot grid
                        </p>
                      </div>
                      <div>
                        <p css={STYLES_TOOLTIP_TEXT}>ctrl + click and resize</p>
                        <p
                          css={STYLES_TOOLTIP_TEXT}
                          style={{ color: Constants.system.darkGray, paddingBottom: "12px" }}
                        >
                          resize without snapping to the dot grid
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div css={STYLES_BUTTONS_ROW} style={{ flexShrink: 0 }}>
                <ButtonSecondary
                  onClick={(e) => this._toggleEditing(e, true)}
                  style={{ cursor: "pointer", marginLeft: 16 }}
                >
                  Cancel
                </ButtonSecondary>
                <ButtonPrimary
                  onClick={this._handleSaveLayout}
                  style={{ cursor: "pointer", marginLeft: 16 }}
                >
                  Save
                </ButtonPrimary>
              </div>
            </div>
          ) : (
            <div css={STYLES_BUTTONS_ROW} style={{ justifyContent: "flex-end", marginBottom: 16 }}>
              <ButtonSecondary
                onClick={this._toggleEditing}
                style={{ cursor: "pointer", marginLeft: 16 }}
              >
                Edit
              </ButtonSecondary>
              {/* <div
                css={STYLES_TOGGLE_BOX}
                style={{ marginLeft: 16, padding: "0px 12px" }}
              >
                <div
                  style={{
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  <SVG.GridView height="24px" />
                </div>
                <div
                  style={{ padding: 4, display: "flex", alignItems: "center" }}
                >
                  <SVG.TableView height="24px" />
                </div>
              </div> */}
            </div>
          )
        ) : null}
        <div
          css={this.state.editing ? STYLES_EDIT_CONTAINER : null}
          style={{ opacity: this.state.show ? 1 : 0 }}
        >
          <div
            css={this.state.editing ? STYLES_CONTAINER_EDITING : STYLES_CONTAINER}
            style={{
              height: this.state.editing
                ? `calc(100vh + ${this.state.containerHeight}px)`
                : `calc(96px + ${this.state.containerHeight}px)`,
              backgroundSize: `${(CONTAINER_SIZE / 108) * this.state.unit}px ${
                10 * this.state.unit
              }px`,
              backgroundPosition: `-${(CONTAINER_SIZE / 220) * this.state.unit}px -${
                (CONTAINER_SIZE / 220) * this.state.unit
              }px`,
            }}
            ref={(c) => {
              this._ref = c;
            }}
          >
            {this.state.show ? (
              this.state.layout.map((pos, i) => (
                <div
                  css={this.state.editing ? STYLES_ITEM_EDITING : STYLES_ITEM}
                  key={i}
                  name={i}
                  onMouseEnter={() => this.setState({ hover: i })}
                  onMouseLeave={() => this.setState({ hover: null })}
                  onMouseDown={this.state.editing ? (e) => this._handleMouseDown(e, i) : () => {}}
                  onClick={this.state.editing ? () => {} : () => this.props.onSelect(i)}
                  style={{
                    top: pos.y * unit,
                    left: pos.x * unit,
                    width: pos.w * unit,
                    height: this.state.fileNames ? (pos.h + TAG_HEIGHT) * unit : pos.h * unit,
                    zIndex: pos.z,
                    boxShadow: this.state.dragIndex === i ? `0 0 44px 0 rgba(0, 0, 0, 0.25)` : null,
                    backgroundColor: Constants.system.foreground,
                  }}
                >
                  <div>
                    <SlateMediaObjectPreview
                      blurhash={this.state.items[i].blurhash}
                      iconOnly={this.state.fileNames}
                      charCap={70}
                      type={this.state.items[i].type}
                      url={this.state.items[i].url}
                      title={this.state.items[i].title || this.state.items[i].name}
                      previewImage={this.state.previewImage}
                      height={pos.h * unit}
                      width={pos.w * unit}
                      style={{
                        height: pos.h * unit,
                        width: pos.w * unit,
                        background: Constants.system.white,
                      }}
                      imageStyle={{
                        width: pos.w * unit,
                        height: pos.h * unit,
                        maxHeight: "none",
                      }}
                    />
                    {numChecked || this.state.hover === i ? (
                      <div css={STYLES_MOBILE_HIDDEN}>
                        {this.props.external ? null : (
                          <div
                            onMouseDown={this._stopProp}
                            onMouseUp={this._stopProp}
                            onClick={(e) => {
                              this._stopProp(e);
                              let checked = this.state.checked;
                              if (checked[i]) {
                                delete checked[i];
                              } else {
                                checked[i] = true;
                              }
                              this.setState({ checked });
                            }}
                          >
                            <CheckBox
                              name={i}
                              value={!!this.state.checked[i]}
                              onChange={this._handleCheckBox}
                              boxStyle={{
                                height: 24,
                                width: 24,
                                backgroundColor: this.state.checked[i]
                                  ? Constants.system.brand
                                  : "rgba(255, 255, 255, 0.75)",
                                boxShadow: this.state.checked[i]
                                  ? "none"
                                  : "0 0 0 2px #C3C3C4 inset",
                              }}
                              style={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                              }}
                            />
                          </div>
                        )}
                        {this.state.hover !== i ? null : this.state.editing ? (
                          <React.Fragment>
                            {this.state.tooltip && this.state.tooltip.startsWith(`${i}-`) ? (
                              <Tooltip
                                light
                                style={
                                  this.state.tooltip === `${i}-remove`
                                    ? {
                                        position: "absolute",
                                        top: 36,
                                        right: 8,
                                      }
                                    : this.state.tooltip === `${i}-view`
                                    ? {
                                        position: "absolute",
                                        bottom: this.state.fileNames ? 52 + TAG_HEIGHT : 52,
                                        right: "calc(50% + 28px)",
                                      }
                                    : this.state.tooltip === `${i}-download`
                                    ? {
                                        position: "absolute",
                                        bottom: this.state.fileNames ? 52 + TAG_HEIGHT : 52,
                                        right: "calc(50% - 12px)",
                                      }
                                    : {
                                        position: "absolute",
                                        bottom: this.state.fileNames ? 52 + TAG_HEIGHT : 52,
                                        right: "calc(50% - 52px)",
                                        color: Constants.system.red,
                                      }
                                }
                              >
                                {this.state.tooltip === `${i}-remove`
                                  ? "Remove from slate"
                                  : this.state.tooltip === `${i}-view`
                                  ? "View file"
                                  : this.state.tooltip === `${i}-download`
                                  ? "Download"
                                  : "Delete file"}
                              </Tooltip>
                            ) : null}
                            <div
                              onMouseDown={this._stopProp}
                              onMouseUp={this._stopProp}
                              onMouseEnter={() => this.setState({ tooltip: `${i}-remove` })}
                              onMouseLeave={() => this.setState({ tooltip: null })}
                              onClick={(e) => {
                                this._handleRemoveFromSlate(e, i);
                              }}
                              style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                cursor: "pointer",
                                margin: 0,
                              }}
                              css={STYLES_ICON_CIRCLE}
                            >
                              <SVG.DismissCircle height="24px" />
                            </div>
                            <div
                              css={STYLES_ICON_ROW}
                              style={{
                                bottom: this.state.fileNames
                                  ? `calc(24px + ${TAG_HEIGHT}px)`
                                  : "24px",
                              }}
                            >
                              <div
                                css={STYLES_ICON_CIRCLE}
                                onMouseDown={this._stopProp}
                                onMouseUp={this._stopProp}
                                onMouseEnter={() => this.setState({ tooltip: `${i}-view` })}
                                onMouseLeave={() => this.setState({ tooltip: null })}
                                onClick={(e) => {
                                  this._stopProp(e);
                                  this.props.onSelect(i);
                                }}
                              >
                                <SVG.Eye height="16px" />
                              </div>
                              <div
                                css={STYLES_ICON_CIRCLE}
                                onMouseDown={this._stopProp}
                                onMouseUp={this._stopProp}
                                onMouseEnter={() => this.setState({ tooltip: `${i}-download` })}
                                onMouseLeave={() => this.setState({ tooltip: null })}
                                onClick={(e) => {
                                  this._handleDownload(e, i);
                                }}
                              >
                                <SVG.Download height="16px" />
                              </div>
                              <div
                                css={STYLES_ICON_CIRCLE}
                                onMouseDown={this._stopProp}
                                onMouseUp={this._stopProp}
                                onMouseEnter={() => this.setState({ tooltip: `${i}-delete` })}
                                onMouseLeave={() => this.setState({ tooltip: null })}
                                onClick={
                                  this.state.items[i].ownerId === this.props.viewer.id
                                    ? (e) => {
                                        this._handleDeleteFiles(e, i);
                                      }
                                    : () => {}
                                }
                                style={{
                                  cursor:
                                    this.state.items[i].ownerId === this.props.viewer.id
                                      ? "pointer"
                                      : "not-allowed",
                                }}
                              >
                                <SVG.Trash
                                  height="16px"
                                  style={{
                                    color:
                                      this.state.items[i].ownerId === this.props.viewer.id
                                        ? Constants.system.red
                                        : "#999999",
                                  }}
                                />
                              </div>
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {this.state.tooltip && this.state.tooltip.startsWith(`${i}-`) ? (
                              <Tooltip
                                light
                                style={
                                  this.state.tooltip === `${i}-add`
                                    ? {
                                        position: "absolute",
                                        top: 36,
                                        right: 8,
                                      }
                                    : this.state.tooltip === `${i}-copy`
                                    ? {
                                        position: "absolute",
                                        bottom: this.state.fileNames ? 52 + TAG_HEIGHT : 52,
                                        right: "calc(50% + 28px)",
                                      }
                                    : this.state.tooltip === `${i}-download`
                                    ? {
                                        position: "absolute",
                                        bottom: this.state.fileNames ? 52 + TAG_HEIGHT : 52,
                                        right: "calc(50% - 12px)",
                                      }
                                    : {
                                        position: "absolute",
                                        bottom: this.state.fileNames ? 52 + TAG_HEIGHT : 52,
                                        right: "calc(50% - 52px)",
                                      }
                                }
                              >
                                {this.state.tooltip === `${i}-add`
                                  ? "Add to slate"
                                  : this.state.tooltip === `${i}-copy`
                                  ? "Copy link"
                                  : this.state.tooltip === `${i}-download`
                                  ? "Download"
                                  : this.state.tooltip === `${i}-preview`
                                  ? "Make preview image"
                                  : "Save copy"}
                              </Tooltip>
                            ) : null}
                            <div
                              onMouseDown={this._stopProp}
                              onMouseUp={this._stopProp}
                              onMouseEnter={() => this.setState({ tooltip: `${i}-add` })}
                              onMouseLeave={() => this.setState({ tooltip: null })}
                              onClick={
                                this.props.external
                                  ? this._handleLoginModal
                                  : (e) => {
                                      this._handleAddToSlate(e, i);
                                    }
                              }
                              style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                cursor: "pointer",
                                margin: 0,
                              }}
                              css={STYLES_ICON_CIRCLE}
                            >
                              <SVG.PlusCircle height="24px" />
                            </div>
                            <div
                              css={STYLES_ICON_ROW}
                              style={{
                                bottom: this.state.fileNames
                                  ? `calc(24px + ${TAG_HEIGHT}px)`
                                  : "24px",
                              }}
                            >
                              <DynamicIcon
                                onClick={(e) => {
                                  this._handleCopy(
                                    e,
                                    this.props.link
                                      ? `${this.props.link}/cid:${Strings.urlToCid(
                                          this.state.items[i].url
                                        )}`
                                      : this.state.items[i].url.replace(
                                          "https://undefined",
                                          "https://"
                                        )
                                  );
                                }}
                                onMouseDown={this._stopProp}
                                onMouseUp={this._stopProp}
                                onMouseEnter={() => this.setState({ tooltip: `${i}-copy` })}
                                onMouseLeave={() => this.setState({ tooltip: null })}
                                successState={
                                  <SVG.CheckBox height="16px" style={{ color: "#4b4a4d" }} />
                                }
                                style={{
                                  height: 24,
                                  width: 24,
                                  borderRadius: "50%",
                                  backgroundColor: "rgba(248, 248, 248, 0.6)",
                                  color: "#4b4a4d",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                  margin: "0 8px",
                                  WebkitBackdropFilter: "blur(25px)",
                                  backdropFilter: "blur(25px)",
                                }}
                              >
                                <SVG.DeepLink height="16px" style={{ color: "#4b4a4d" }} />
                              </DynamicIcon>
                              <div
                                css={STYLES_ICON_CIRCLE}
                                onMouseDown={this._stopProp}
                                onMouseUp={this._stopProp}
                                onMouseEnter={() => this.setState({ tooltip: `${i}-download` })}
                                onMouseLeave={() => this.setState({ tooltip: null })}
                                onClick={
                                  this.props.external
                                    ? this._handleLoginModal
                                    : (e) => {
                                        this._handleDownload(e, i);
                                      }
                                }
                              >
                                <SVG.Download height="16px" />
                              </div>
                              {this.props.isOwner ? (
                                <div
                                  css={STYLES_ICON_CIRCLE}
                                  onMouseDown={this._stopProp}
                                  onMouseUp={this._stopProp}
                                  onMouseEnter={() => this.setState({ tooltip: `${i}-preview` })}
                                  onMouseLeave={() => this.setState({ tooltip: null })}
                                  onClick={
                                    this.props.external
                                      ? this._handleLoginModal
                                      : this.state.items[i].type &&
                                        Validations.isPreviewableImage(this.state.items[i].type) &&
                                        this.state.items[i].size &&
                                        this.state.items[i].size < SIZE_LIMIT
                                      ? (e) => this._handleSetPreview(e, i)
                                      : () => {}
                                  }
                                  style={
                                    this.props.preview ===
                                    this.state.items[i].url.replace("https://undefined", "https://")
                                      ? {
                                          backgroundColor: "rgba(0, 97, 187, 0.75)",
                                        }
                                      : this.state.items[i].type &&
                                        Validations.isPreviewableImage(this.state.items[i].type) &&
                                        this.state.items[i].size &&
                                        this.state.items[i].size < SIZE_LIMIT
                                      ? {}
                                      : {
                                          color: "#999999",
                                          cursor: "not-allowed",
                                        }
                                  }
                                >
                                  {this.props.preview ===
                                  this.state.items[i].url.replace(
                                    "https://undefined",
                                    "https://"
                                  ) ? (
                                    <SVG.DesktopEye
                                      height="16px"
                                      style={{
                                        color: Constants.system.white,
                                      }}
                                    />
                                  ) : (
                                    <SVG.Desktop height="16px" />
                                  )}
                                </div>
                              ) : (
                                <div
                                  css={STYLES_ICON_CIRCLE}
                                  onMouseDown={this._stopProp}
                                  onMouseUp={this._stopProp}
                                  onMouseEnter={() => this.setState({ tooltip: `${i}-save` })}
                                  onMouseLeave={() => this.setState({ tooltip: null })}
                                  onClick={
                                    this.props.external
                                      ? this._handleLoginModal
                                      : (e) => this._handleSaveCopy(e, i)
                                  }
                                >
                                  <SVG.Save height="16px" />
                                </div>
                              )}
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    ) : null}
                  </div>
                  {this.state.fileNames ? (
                    <div
                      css={STYLES_FILE_TAG}
                      style={{
                        fontSize: `${Math.min(TAG_HEIGHT * unit * 0.7, 14)}px`,
                        height: `${TAG_HEIGHT * unit}px`,
                      }}
                    >
                      <span css={STYLES_FILE_NAME}>
                        {this.state.items[i].title || this.state.items[i].name}
                      </span>
                      <span css={STYLES_FILE_TYPE}>
                        {Strings.getFileExtension(this.state.items[i].name)}
                      </span>
                    </div>
                  ) : null}
                  {this.state.editing ? (
                    <div
                      css={STYLES_HANDLE_BOX}
                      onMouseDown={(e) => this._handleMouseDownResize(e, i)}
                      style={{
                        bottom: this.state.fileNames ? `calc(0px + ${TAG_HEIGHT}px)` : 0,
                        right: 0,
                        display:
                          this.state.hover === i || this.state.dragIndex === i ? "block" : "none",
                      }}
                    >
                      <SVG.DragHandle height="24px" />
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div css={STYLES_LOADER}>
                <LoaderSpinner />
              </div>
            )}
          </div>
        </div>
        {numChecked ? (
          <div css={STYLES_ACTION_BAR}>
            <div css={STYLES_LEFT}>
              <span css={STYLES_FILES_SELECTED}>
                {numChecked} file{numChecked > 1 ? "s" : ""} selected
              </span>
            </div>
            {this.props.isOwner ? (
              <div css={STYLES_RIGHT}>
                <ButtonPrimary transparent onClick={this._handleAddToSlate}>
                  Add to slate
                </ButtonPrimary>
                {/* <ButtonPrimary transparent onClick={this._handleDownload}>
                  Download
                </ButtonPrimary> */}
                <ButtonWarning
                  transparent
                  style={{ marginLeft: 8 }}
                  onClick={this._handleRemoveFromSlate}
                  loading={
                    this.state.loading &&
                    Object.values(this.state.loading).some((elem) => {
                      return !!elem;
                    })
                  }
                >
                  Remove
                </ButtonWarning>
                <ButtonWarning
                  transparent
                  style={{ marginLeft: 8 }}
                  onClick={this._handleDeleteFiles}
                  loading={
                    this.state.loading &&
                    Object.values(this.state.loading).some((elem) => {
                      return !!elem;
                    })
                  }
                >
                  Delete files
                </ButtonWarning>
                <div css={STYLES_ICON_BOX} onClick={() => this.setState({ checked: {} })}>
                  <SVG.Dismiss height="20px" style={{ color: Constants.system.darkGray }} />
                </div>
              </div>
            ) : (
              <div css={STYLES_RIGHT}>
                <ButtonPrimary transparent onClick={this._handleAddToSlate}>
                  Add to slate
                </ButtonPrimary>
                <ButtonPrimary transparent onClick={this._handleSaveCopy}>
                  Save copy
                </ButtonPrimary>
                {/* <ButtonPrimary transparent onClick={this._handleDownload}>
                  Download
                </ButtonPrimary> */}
                <div css={STYLES_ICON_BOX} onClick={() => this.setState({ checked: {} })}>
                  <SVG.Dismiss height="20px" style={{ color: Constants.system.darkGray }} />
                </div>
              </div>
            )}
          </div>
        ) : null}
        <input
          ref={(c) => {
            this._input = c;
          }}
          readOnly
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
        {this.props.external && this.state.signInModal && (
          <div>
            <CTATransition
              onClose={() => this.setState({ signInModal: false })}
              viewer={this.props.viewer}
              open={this.state.signInModal}
              redirectURL={`/_?scene=V1_NAVIGATION_SLATE&user=${this.props.creator.username}&slate=${this.props.slate.slatename}`}
            />
          </div>
        )}
      </div>
    );
  }
}
