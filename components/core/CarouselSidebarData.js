import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Window from "~/common/window";

import { css } from "@emotion/core";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { SlatePicker } from "~/components/core/SlatePicker";
import { dispatchCustomEvent } from "~/common/custom-events";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const DEFAULT_BOOK =
  "https://slate.textile.io/ipfs/bafkreibk32sw7arspy5kw3p5gkuidfcwjbwqyjdktd5wkqqxahvkm2qlyi";
const DEFAULT_DATA =
  "https://slate.textile.io/ipfs/bafkreid6bnjxz6fq2deuhehtxkcesjnjsa2itcdgyn754fddc7u72oks2m";
const DEFAULT_DOCUMENT =
  "https://slate.textile.io/ipfs/bafkreiecdiepww52i5q3luvp4ki2n34o6z3qkjmbk7pfhx4q654a4wxeam";
const DEFAULT_VIDEO =
  "https://slate.textile.io/ipfs/bafkreibesdtut4j5arclrxd2hmkfrv4js4cile7ajnndn3dcn5va6wzoaa";
const DEFAULT_AUDIO =
  "https://slate.textile.io/ipfs/bafkreig2hijckpamesp4nawrhd6vlfvrtzt7yau5wad4mzpm3kie5omv4e";

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
    background: ${Constants.system.foreground};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_SIDEBAR = css`
  width: 420px;
  padding: 48px 24px 0px 24px;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: rgba(20, 20, 20, 0.8);

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: rgba(150, 150, 150, 0.2);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_DISMISS_BOX = css`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${Constants.system.darkGray};
  cursor: pointer;

  :hover {
    color: ${Constants.system.white};
  }
`;

const STYLES_CONTAINER = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-bottom: 88px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_META = css`
  padding: 14px 0px 8px 0px;
  overflow-wrap: break-word;
`;

const STYLES_META_TITLE = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.white};
  font-size: ${Constants.typescale.lvl2};
  text-decoration: none;

  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_TAG = css`
  margin-right: 24px;
  padding: 0px 2px;
  border-radius: 2px;
  border: 1px solid ${Constants.system.darkGray};
`;

const STYLES_META_DETAILS = css`
  color: ${Constants.system.darkGray};
  text-transform: uppercase;
  margin: 24px 0px;
  font-family: ${Constants.font.medium};
  font-size: 0.9rem;
`;

const STYLES_ACTIONS = css`
  color: ${Constants.system.white};
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  background-color: transparent;
  margin-bottom: 48px;
`;

const STYLES_ACTION = css`
  cursor: pointer;
  padding: 12px 16px;
  border-bottom: 1px solid #3c3c3c;
  display: flex;
  align-items: center;

  :hover {
    color: ${Constants.system.brand};
  }

  :last-child {
    border: none;
  }
`;

const STYLES_SECTION_HEADER = css`
  font-family: ${Constants.font.semiBold};
  font-size: 1.1rem;
  margin-bottom: 32px;
`;

const STYLES_HIDDEN = css`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const STYLES_IMAGE_BOX = css`
  max-width: 100%;
  max-height: 368px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.system.black};
  overflow: hidden;
  ${"" /* box-shadow: 0 0 0 1px ${Constants.system.border} inset; */}
  border-radius: 4px;
`;

const STYLES_GROUPING = css`
  width: 100%;
  border: 1px solid rgba(100, 100, 100, 0.5);
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
`;

export const FileTypeDefaultPreview = () => {
  if (props.type && props.type.startsWith("video/")) {
    return DEFAULT_VIDEO;
  }
  if (props.type && props.type.startsWith("audio/")) {
    return DEFAULT_AUDIO;
  }
  if (props.type && props.type.startsWith("application/epub")) {
    return DEFAULT_BOOK;
  }
  if (props.type && props.type.startsWith("application/pdf")) {
    return DEFAULT_DOCUMENT;
  }
  return DEFAULT_DATA;
};

export default class CarouselSidebarData extends React.Component {
  _ref = null;

  state = {
    selected: {},
    isPublic: false,
    copyValue: "",
    loading: false,
  };

  componentDidMount = () => {
    window.addEventListener("data-global-carousel-loading", this._handleSetLoading);
    let isPublic = false;
    let selected = {};
    const id = this.props.data.id;
    for (let slate of this.props.slates) {
      if (slate.data.objects.some((o) => o.id === id)) {
        if (slate.data.public) {
          isPublic = true;
        }
        selected[slate.id] = true;
      }
    }
    this.setState({ selected, isPublic });
  };

  componentWillUnmount = () => {
    window.removeEventListener("data-global-carousel-loading", this._handleSetLoading);
  };

  _handleSetLoading = (e) => {
    console.log("set loading to:");
    console.log(e.detail.loading);
    this.setState({ loading: e.detail.loading });
  };

  _handleDownload = () => {
    const filename = this.props.data.file;
    let cid = this.props.data.cid || this.props.data.ipfs.replace("/ipfs/", "");
    const uri = Strings.getCIDGatewayURL(cid);
    Window.saveAs(uri, filename);
  };

  _handleCreateSlate = async () => {
    this.props.onClose();
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
      data: { files: [this.props.data] },
    });
  };

  _handleAdd = (slate) => {
    //NOTE(martina): triggers action through DataView.js (which is always mounted if this carousel is open)
    if (this.state.selected[slate.id]) {
      dispatchCustomEvent({
        name: "remote-slate-object-remove",
        detail: { id: this.props.data.id, slate: slate, data: this.props.data },
      });
      this.setState({
        selected: { ...this.state.selected, [slate.id]: false },
      });
    } else {
      dispatchCustomEvent({
        name: "remote-slate-object-add",
        detail: { id: this.props.data.id, slate: slate, data: this.props.data },
      });
      this.setState({
        selected: { ...this.state.selected, [slate.id]: slate },
      });
    }
  };

  _handleCopy = (copyValue, loading) => {
    this.setState({ copyValue, loading }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  _handleDelete = async (cid) => {
    //NOTE(martina): triggers action through DataView.js (which is always mounted if this carousel is open)
    await this.setState({ loading: cid });
    dispatchCustomEvent({
      name: "remote-data-deletion",
      detail: { cid },
    });
  };

  render() {
    const { cid, file, type, size, url } = this.props.data;
    const elements = [];

    if (this.props.onClose) {
      elements.push(
        <div key="s-1" css={STYLES_DISMISS_BOX} onClick={this.props.onClose}>
          <SVG.Dismiss height="24px" />
        </div>
      );
    }

    elements.push(
      <div key="s-2" css={STYLES_CONTAINER}>
        <div css={STYLES_META}>
          <a css={STYLES_META_TITLE} target="_blank" href={Strings.getCIDGatewayURL(cid)}>
            {file}
          </a>
          <div css={STYLES_META_DETAILS}>
            <span css={STYLES_TAG}>{type}</span> <span>{Strings.bytesToSize(size)}</span>
          </div>
        </div>
        <div css={STYLES_ACTIONS}>
          <div css={STYLES_ACTION} onClick={() => this._handleCopy(cid, "cidCopying")}>
            <SVG.CopyAndPaste height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.state.loading === "cidCopying" ? "Copied!" : "Copy file CID"}
            </span>
          </div>
          <div css={STYLES_ACTION} onClick={() => this._handleCopy(url, "gatewayUrlCopying")}>
            <SVG.Data height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.state.loading === "gatewayUrlCopying" ? "Copied!" : "Copy gateway URL"}
            </span>
          </div>
          <div css={STYLES_ACTION} onClick={this._handleDownload}>
            <SVG.Download height="24px" />
            <span style={{ marginLeft: 16 }}>Download</span>
          </div>
          <div css={STYLES_ACTION} onClick={() => this._handleDelete(cid)}>
            <SVG.Trash height="24px" />
            {this.state.loading === cid ? (
              <LoaderSpinner style={{ height: 20, width: 20, marginLeft: 16 }} />
            ) : (
              <span style={{ marginLeft: 16 }}>Delete</span>
            )}
          </div>
        </div>
        <div css={STYLES_SECTION_HEADER}>Connected Slates</div>
        <SlatePicker
          dark
          slates={this.props.slates}
          selected={this.state.selected}
          onAdd={this._handleAdd}
          onCreateSlate={this._handleCreateSlate}
          loading={this.props.loading}
          selectedColor={Constants.system.white}
        />
        {type && type.startsWith("image/") ? null : (
          <div>
            <System.P css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
              Preview image
            </System.P>
            <System.P style={{ color: Constants.system.darkGray, lineHeight: "1.5" }}>
              This is the preview image of your file.
            </System.P>
            <div css={STYLES_IMAGE_BOX} style={{ marginTop: 24 }}>
              <div>
                <SlateMediaObjectPreview
                  style={{ color: `${Constants.system.black}`, height: "240px" }}
                  blurhash={true}
                  url={url}
                  title={file}
                  type={type}
                />
              </div>
            </div>
            <System.ButtonPrimary full style={{ marginTop: 16 }}>
              Upload image
            </System.ButtonPrimary>{" "}
          </div>
        )}
        <div css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
          Privacy
        </div>
        <div style={{ color: Constants.system.darkGray, lineHeight: "1.5" }}>
          {this.state.isPublic
            ? "Public. This file is currently visible to others and searchable within Slate through public slates."
            : "Private. This file is currently not visible to others unless they have the link."}
        </div>
        <input
          css={STYLES_HIDDEN}
          ref={(c) => {
            this._ref = c;
          }}
          readOnly
          value={this.state.copyValue}
        />
      </div>
    );

    if (!elements.length) {
      return null;
    }

    return (
      <div css={STYLES_SIDEBAR} style={{ display: this.props.display }}>
        {elements}
      </div>
    );
  }
}
