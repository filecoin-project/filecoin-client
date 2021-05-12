import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as UserBehaviors from "~/common/user-behaviors";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";
import * as Window from "~/common/window";

import { css, withTheme } from "@emotion/react";
import { RadioGroup } from "~/components/system/components/RadioGroup";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { SlatePicker } from "~/components/core/SlatePicker";
import { Input } from "~/components/system/components/Input";
import { Toggle } from "~/components/system/components/Toggle";
import { Textarea } from "~/components/system/components/Textarea";
import { Tag } from "~/components/system/components/Tag";

import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import ProcessedText from "~/components/core/ProcessedText";

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

const STYLES_BODY = css`
  font-size: 16px;
  line-height: 1.225;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 32px;
`;

const STYLES_SIDEBAR_INPUT_LABEL = css`
  font-size: 16px;
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.darkGray};
  margin-bottom: 8px;
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
  ${STYLES_NO_VISIBLE_SCROLL}

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

const STYLES_HEADING = css`
  font-family: ${Constants.font.semiBold};
  font-size: 20px;
  font-weight: 400;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 32px;
`;

const STYLES_META = css`
  text-align: start;
  padding: 14px 0px 8px 0px;
  overflow-wrap: break-word;
`;

const STYLES_META_TITLE = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.white};
  font-size: ${Constants.typescale.lvl2};
  text-decoration: none;
  word-break: break-all;
  overflow-wrap: anywhere;

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

const STYLES_OPTIONS_SECTION = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 16px 0;
`;

const STYLES_META_DETAILS = css`
  color: ${Constants.system.darkGray};
  text-transform: uppercase;
  margin: 24px 0px;
  font-family: ${Constants.font.medium};
  font-size: 0.9rem;
`;

const STYLES_SIDEBAR_SECTION = css`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 16px;
`;

const STYLES_ACTIONS = css`
  color: ${Constants.system.white};
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  background-color: transparent;
  margin-bottom: 48px;
  margin-top: 36px;
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
  margin-top: 24px;
  display: flex;
  align-items: center;
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

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_TEXT = css`
  color: ${Constants.system.darkGray};
  line-height: 1.5;
`;

const STYLES_INPUT = {
  marginBottom: 8,
  backgroundColor: "transparent",
  boxShadow: "0 0 0 1px #3c3c3c inset",
  color: Constants.system.white,
  height: 48,
};

const STYLES_AUTOSAVE = css`
  font-size: 12px;
  line-height: 1.225;
  display: flex;
  justify-content: baseline;
  color: ${Constants.system.yellow};
  opacity: 0;
  ${"" /* margin: 26px 24px; */}
  position: absolute;
  top: 24px;
  left: 16px;

  @keyframes slate-animations-autosave {
    0% {
      opacity: 0;
      transform: translateX(0);
    }
    10% {
      opacity: 1;
      transform: translateX(12px);
    }
    90% {
      opacity: 1;
      transform: translateX(12px);
    }
    100% {
      opacity: 0;
    }
  }
  animation: slate-animations-autosave 4000ms ease;
`;

const STYLES_SPINNER = css`
  width: 24px;
  height: 24px;
`;

export const FileTypeDefaultPreview = (props) => {
  if (props.type) {
    if (Validations.isVideoType(type)) {
      return DEFAULT_VIDEO;
    } else if (Validations.isAudioType(type)) {
      return DEFAULT_AUDIO;
    } else if (Validations.isPdfType(type)) {
      return DEFAULT_DOCUMENT;
    } else if (Validations.isEpubType(type)) {
      return DEFAULT_BOOK;
    }
  }
  return DEFAULT_DATA;
};

class CarouselSidebar extends React.Component {
  state = {
    name: this.props.data.data.name || this.props.data.filename,
    body: this.props.data.data.body,
    source: this.props.data.data.source,
    author: this.props.data.data.author,
    tags: this.props.data.data.tags || [],
    suggestions: this.props.viewer?.tags || [],
    selected: {},
    isPublic: false,
    inPublicSlates: 0,
    isUploading: false,
    isDownloading: false,
    showSavedMessage: false,
    showConnectedSection: false,
    showFileSection: true,
  };

  componentDidMount = () => {
    const editingAllowed = !this.props.external && this.props.isOwner && !this.props.isRepost;
    if (editingAllowed) {
      this.debounceInstance = Window.debounce(() => this._handleSave(), 3000);
      this.calculateSelected();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!isEqual(prevState.tags, this.state.tags)) {
      this.updateSuggestions();
    }
  };

  updateSuggestions = () => {
    let newSuggestions = new Set([...this.state.suggestions, ...this.state.tags]);
    this.setState({ suggestions: Array.from(newSuggestions) });
  };

  calculateSelected = () => {
    let inPublicSlates = 0;
    let selected = {};
    const id = this.props.data.id;
    for (let slate of this.props.viewer.slates) {
      if (slate.objects.some((obj) => obj.id === id)) {
        if (slate.isPublic) {
          inPublicSlates += 1;
        }
        selected[slate.id] = true;
      }
    }
    this.setState({ selected, inPublicSlates, isPublic: this.props.data.isPublic });
  };

  _handleToggleAccordion = (tab) => {
    this.setState({ [tab]: !this.state[tab] });
  };

  _handleDarkMode = async (e) => {
    Events.dispatchCustomEvent({
      name: "set-slate-theme",
      detail: { darkmode: e.target.value },
    });
  };

  _handleChange = (e) => {
    if (this.props.external || !this.props.isOwner) return;
    this.debounceInstance();
    this.setState(
      {
        [e.target.name]: e.target.value,
        showSavedMessage: false,
      },
      () => {
        if (e.target.name === "Tags") {
          this.updateSuggestions();
        }
      }
    );
  };

  _handleCapitalization(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  _handleSave = async () => {
    if (this.props.external || !this.props.isOwner) return;
    this.props.onUpdateViewer({ tags: this.state.suggestions });
    const response = await Actions.updateFile({
      id: this.props.data.id,
      data: {
        name: this.state.name,
        body: this.state.body,
        source: this.state.source,
        author: this.state.author,
        tags: this.state.tags,
      },
    });
    Events.hasError(response);
    this.setState({ showSavedMessage: true });
  };

  _handleSaveCopy = async (data) => {
    this.setState({ loading: "savingCopy" });

    await UserBehaviors.saveCopy({ files: [data] });
    this.setState({ loading: false });
  };

  _handleUpload = async (e) => {
    if (this.props.external || !this.props.isOwner) return;
    e.persist();
    this.setState({ isUploading: true });
    let previousCoverId = this.props.data.data.coverImage?.id;
    if (!e || !e.target) {
      this.setState({ isUploading: false });
      return;
    }
    let file = await UserBehaviors.uploadImage(e.target.files[0], this.props.resources, true);
    if (!file) {
      this.setState({ isUploading: false });
      return;
    }

    let coverImage = file;

    //TODO(martina): create an endpoint specifically for cover images instead of this, which will delete original cover image etc

    let updateReponse = await Actions.updateFile({
      id: this.props.data.id,
      data: {
        coverImage,
      },
    });

    if (previousCoverId) {
      if (!this.props.viewer.library.some((obj) => obj.id === previousCoverId)) {
        await UserBehaviors.deleteFiles(previousCoverId, true);
      }
    }

    Events.hasError(updateReponse);
    this.setState({ isUploading: false });
  };

  _handleDownload = () => {
    if (this.props.data.decorator?.startsWith("OPTIMISTIC")) {
      return;
    }

    if (this.props.data.data.type === "application/unity") {
      this.setState({ isDownloading: true }, async () => {
        const response = await UserBehaviors.downloadZip(this.props.data);
        this.setState({ isDownloading: false });
        Events.hasError(response);
      });
    } else {
      UserBehaviors.download(this.props.data);
    }
  };

  _handleCreateSlate = async () => {
    if (this.props.data.decorator?.startsWith("OPTIMISTIC")) {
      return;
    }

    if (this.props.external) return;
    this.props.onClose();
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
      data: { files: [this.props.data] },
    });
  };

  _handleDelete = () => {
    if (
      this.props.external ||
      !this.props.isOwner ||
      this.props.data.decorator.startsWith("OPTIMISTIC")
    )
      return;
    const message =
      "Are you sure you want to delete this? It will be removed from your collections as well";
    if (!window.confirm(message)) {
      return;
    }
    const id = this.props.data.id;

    let updatedLibrary = this.props.viewer.library.filter((obj) => obj.id !== id);
    if (this.props.carouselType === "SLATE") {
      const slateId = this.props.current.id;
      let slates = this.props.viewer.slates;
      for (let slate of slates) {
        if (slate.id === slateId) {
          slate.objects = slate.objects.filter((obj) => obj.id !== id);
          break;
        }
      }
      this.props.onUpdateViewer({ library: updatedLibrary, slates });
    } else {
      this.props.onUpdateViewer({ library: updatedLibrary });
    }

    UserBehaviors.deleteFiles(id);
  };

  _handleAdd = async (slate) => {
    if (this.props.data.decorator?.startsWith("OPTIMISTIC")) {
      return;
    }

    let inPublicSlates = this.state.inPublicSlates;
    if (this.state.selected[slate.id]) {
      if (slate.isPublic) {
        inPublicSlates -= 1;
      }
      UserBehaviors.removeFromSlate({ slate, ids: [this.props.data.id] });
    } else {
      if (slate.isPublic) {
        inPublicSlates += 1;
      }
      UserBehaviors.addToSlate({
        slate,
        files: [this.props.data],
      });
    }
    this.setState({
      selected: {
        ...this.state.selected,
        [slate.id]: !this.state.selected[slate.id],
      },
      inPublicSlates,
    });
  };

  _handleRemove = async () => {
    if (!this.props.carouselType === "SLATE" || this.props.external || !this.props.isOwner) {
      return;
    }

    const id = this.props.data.id;
    const slateId = this.props.current.id;
    let slates = this.props.viewer.slates;
    for (let slate of slates) {
      if (slate.id === slateId) {
        slate.objects = slate.objects.filter((obj) => obj.id !== id);
        break;
      }
    }
    this.props.onUpdateViewer({ slates });

    UserBehaviors.removeFromSlate({ slate: this.props.current, ids: [this.props.data.id] });
  };

  _handleToggleVisibility = async (e) => {
    if (this.props.data.decorator?.startsWith("OPTIMISTIC")) {
      return;
    }

    if (this.props.external || !this.props.isOwner) return;
    const isVisible = this.state.isPublic || this.state.inPublicSlates > 0;
    let selected = cloneDeep(this.state.selected);
    if (this.state.inPublicSlates) {
      const slateIds = Object.entries(this.state.selected)
        .filter((entry) => entry[1])
        .map((entry) => entry[0]);
      const publicSlateIds = [];
      const publicSlateNames = [];
      for (let slate of this.props.viewer.slates) {
        if (slate.isPublic && slateIds.includes(slate.id)) {
          publicSlateNames.push(slate.data.name);
          publicSlateIds.push(slate.id);
          selected[slate.id] = false;
        }
      }
      const slateNames = publicSlateNames.join(", ");
      const message = `Making this file private will remove it from the following public collections: ${slateNames}. Do you wish to continue?`;
      if (!window.confirm(message)) {
        return;
      }
    }

    if (this.props.carouselType === "SLATE" && this.props.current.isPublic) {
      const slateId = this.props.current.id;
      let slates = cloneDeep(this.props.viewer.slates);
      for (let slate of slates) {
        if (slate.id === slateId) {
          slate.objects = slate.objects.filter((obj) => obj.id !== this.props.data.id);
          break;
        }
      }
      this.props.onUpdateViewer({ slates });
    }

    let response = await Actions.toggleFilePrivacy({ ...this.props.data, isPublic: !isVisible });
    Events.hasError(response);
    if (isVisible) {
      this.setState({ inPublicSlates: 0, isPublic: false, selected });
    } else {
      this.setState({ isPublic: true });
    }
  };

  render() {
    const isVisible = this.state.isPublic || this.state.inPublicSlates > 0 ? true : false;
    const file = this.props.data;
    const { coverImage, type, size } = file.data;
    const editingAllowed = this.props.isOwner && !this.props.isRepost && !this.props.external;

    const isUnityGame = type === "application/unity";

    const elements = [];
    if (editingAllowed && !isUnityGame && !file.decorator?.startsWith("OPTIMISTIC")) {
      elements.push(
        <div key="sidebar-media-object-info" style={{ marginTop: 8 }}>
          <Input
            full
            value={this.state.name}
            name="name"
            onChange={this._handleChange}
            autoHighlight
            id={`sidebar-label-name`}
            style={{
              fontSize: Constants.typescale.lvl1,
              ...STYLES_INPUT,
            }}
          />
          <Textarea
            name="body"
            placeholder="Add notes or a description..."
            value={this.state.body}
            onChange={this._handleChange}
            style={STYLES_INPUT}
          />
          <Input
            full
            value={this.state.source}
            name="source"
            placeholder="Source"
            onChange={this._handleChange}
            id={`sidebar-label-source`}
            style={STYLES_INPUT}
          />
          <Input
            full
            value={this.state.author}
            name="author"
            placeholder="Author"
            onChange={this._handleChange}
            id={`sidebar-label-author`}
            style={{ ...STYLES_INPUT, marginBottom: 12 }}
          />
          <div css={STYLES_OPTIONS_SECTION}>
            <Tag
              type="dark"
              tags={this.state.tags}
              suggestions={this.state.suggestions}
              style={{ margin: "0 0 16px" }}
              inputStyles={{ padding: "16px" }}
              dropdownStyles={{ top: "50px" }}
              onChange={this._handleChange}
            />
          </div>
        </div>
      );
    } else {
      const hasName = !Strings.isEmpty(file.data.name || file.filename);
      const hasBody = !Strings.isEmpty(file.data.body);
      const hasSource = !Strings.isEmpty(file.data.source);
      const hasAuthor = !Strings.isEmpty(file.data.author);

      if (hasName) {
        elements.push(
          <div key="sidebar-media-info-name" css={STYLES_SIDEBAR_SECTION}>
            <div css={STYLES_HEADING}>
              <ProcessedText dark text={file.data.name || file.filename} />
            </div>
          </div>
        );
      }

      if (hasBody) {
        elements.push(
          <div key="sidebar-media-info-body" css={STYLES_SIDEBAR_SECTION}>
            <div css={STYLES_BODY}>
              <ProcessedText dark text={file.data.body} />
            </div>
          </div>
        );
      }

      if (hasSource) {
        elements.push(
          <div key="sidebar-media-info-source" css={STYLES_SIDEBAR_SECTION}>
            <div css={STYLES_SIDEBAR_INPUT_LABEL} style={{ position: "relative" }}>
              Source:
            </div>
            <p css={STYLES_BODY} style={{ color: Constants.system.darkGray }}>
              <ProcessedText dark text={file.data.source} />
            </p>
          </div>
        );
      }

      if (hasAuthor) {
        elements.push(
          <div key="sidebar-media-info-author" css={STYLES_SIDEBAR_SECTION}>
            <div css={STYLES_SIDEBAR_INPUT_LABEL} style={{ position: "relative" }}>
              Author:
            </div>
            <p css={STYLES_BODY} style={{ color: Constants.system.darkGray }}>
              <ProcessedText dark text={file.data.author} />
            </p>
          </div>
        );
      }
    }

    let actions = [];

    {
      this.props.carouselType === "ACTIVITY"
        ? actions.push(
            <div
              key="go-to-slate"
              css={STYLES_ACTION}
              onClick={() =>
                this.props.onAction({
                  type: "NAVIGATE",
                  value: "NAV_SLATE",
                  data: file.slate,
                })
              }
            >
              <SVG.Slate height="24px" />
              <span style={{ marginLeft: 16 }}>Go to collection</span>
            </div>
          )
        : null;
    }

    actions.push(
      <div key="download" css={STYLES_ACTION} onClick={this._handleDownload}>
        {this.state.isDownloading ? (
          <>
            <LoaderSpinner css={STYLES_SPINNER} />
            <span style={{ marginLeft: 16 }}>Downloading</span>
          </>
        ) : (
          <>
            <SVG.Download height="24px" />
            <span style={{ marginLeft: 16 }}>Download</span>
          </>
        )}
      </div>
    );

    if (
      !this.props.external &&
      (!this.props.isOwner || this.props.isRepost) &&
      !file.decorator?.startsWith("OPTIMISTIC")
    ) {
      actions.push(
        <div key="save-copy" css={STYLES_ACTION} onClick={() => this._handleSaveCopy(file)}>
          <SVG.Save height="24px" />
          <span style={{ marginLeft: 16 }}>
            {this.state.loading === "savingCopy" ? (
              <LoaderSpinner style={{ height: 16, width: 16 }} />
            ) : (
              <span>Save copy</span>
            )}
          </span>
        </div>
      );
    }

    if (
      this.props.carouselType === "SLATE" &&
      !this.props.external &&
      this.props.isOwner &&
      !file.decorator?.startsWith("OPTIMISTIC")
    ) {
      actions.push(
        <div key="remove" css={STYLES_ACTION} onClick={this._handleRemove}>
          <SVG.DismissCircle height="24px" />
          <span style={{ marginLeft: 16 }}>Remove from collection</span>
        </div>
      );
    }

    if (editingAllowed) {
      actions.push(
        <div key="delete" css={STYLES_ACTION} onClick={this._handleDelete}>
          <SVG.Trash height="24px" />
          <span style={{ marginLeft: 16 }}>Delete</span>
        </div>
      );
    }

    let uploadCoverImage;
    if (editingAllowed && type && !Validations.isPreviewableImage(type)) {
      uploadCoverImage = (
        <div style={{ marginBottom: 48 }}>
          <System.P css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
            Preview image
          </System.P>
          {coverImage ? (
            <>
              <System.P css={STYLES_TEXT}>This is the preview image of your file.</System.P>
              <div css={STYLES_IMAGE_BOX} style={{ marginTop: 24 }}>
                <img
                  src={Strings.getURLfromCID(coverImage.cid)}
                  alt=""
                  style={{ maxWidth: "368px", maxHeight: "368px" }}
                />
              </div>
            </>
          ) : (
            <System.P css={STYLES_TEXT}>Add a preview image for your file.</System.P>
          )}
          <div style={{ marginTop: 16 }}>
            <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />
            <System.ButtonPrimary full type="label" htmlFor="file" loading={this.state.isUploading}>
              Upload preview image
            </System.ButtonPrimary>
          </div>
        </div>
      );
    }

    let privacy;
    if (editingAllowed) {
      privacy = (
        <div>
          <System.P css={STYLES_SECTION_HEADER} style={{ marginBottom: 12 }}>
            Privacy
          </System.P>
          <System.P
            css={STYLES_TEXT}
            style={{
              marginTop: 12,
            }}
          >
            {isVisible
              ? "This file is currently visible to everyone and searchable within Slate. It may appear in activity feeds and explore."
              : "This file is only visible to those with the link."}
          </System.P>
          <RadioGroup
            name="isPublic"
            options={[
              {
                value: true,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SVG.Globe height="16px" style={{ marginRight: 8 }} />
                    Public
                  </div>
                ),
              },
              {
                value: false,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SVG.SecurityLock height="16px" style={{ marginRight: 8 }} />
                    Private
                  </div>
                ),
              },
            ]}
            dark={true}
            style={{ marginTop: 12 }}
            labelStyle={{ fontFamily: Constants.font.medium }}
            selected={isVisible}
            onChange={this._handleToggleVisibility}
          />
          {!isVisible && (
            <Input
              full
              value={Strings.getURLfromCID(file.cid)}
              name="copyLink"
              readOnly
              copyable
              style={{
                fontSize: Constants.typescale.lvl1,
                ...STYLES_INPUT,
                marginTop: 12,
              }}
            />
          )}
        </div>
      );
    }

    return (
      <div css={STYLES_SIDEBAR} style={{ display: this.props.display }}>
        {this.state.showSavedMessage && (
          <div css={STYLES_AUTOSAVE}>
            <SVG.Check height="14px" style={{ marginRight: 4 }} />
            Changes saved
          </div>
        )}
        <div key="s-1" css={STYLES_DISMISS_BOX} onClick={this.props.onClose}>
          <SVG.Dismiss height="24px" />
        </div>

        <div key="s-2" style={{ marginBottom: 80 }}>
          {elements}

          {!this.props.external && <div css={STYLES_ACTIONS}>{actions}</div>}
          {privacy}
          {uploadCoverImage}
          {!this.props.external && (
            <>
              <div
                css={STYLES_SECTION_HEADER}
                style={{ cursor: "pointer", marginTop: 48 }}
                onClick={() => this._handleToggleAccordion("showConnectedSection")}
              >
                <span
                  style={{
                    marginRight: 8,
                    transform: this.state.showConnectedSection ? "none" : "rotate(-90deg)",
                    transition: "100ms ease transform",
                  }}
                >
                  <SVG.ChevronDown height="24px" display="block" />
                </span>
                <span>Add to collection</span>
              </div>
              {this.state.showConnectedSection && (
                <div style={{ width: "100%", margin: "24px 0 44px 0" }}>
                  <SlatePicker
                    dark
                    slates={this.props.viewer.slates}
                    onCreateSlate={this._handleCreateSlate}
                    selectedColor={Constants.system.white}
                    files={[this.props.data]}
                    selected={this.state.selected}
                    onAdd={this._handleAdd}
                  />
                </div>
              )}
            </>
          )}

          {this.props.data.filename.endsWith(".md") ? (
            <>
              <div css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
                Settings
              </div>
              <div css={STYLES_OPTIONS_SECTION}>
                <div css={STYLES_TEXT}>Dark mode</div>
                <Toggle dark active={this.props?.theme?.darkmode} onChange={this._handleDarkMode} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withTheme(CarouselSidebar);

{
  /* <>
              <div css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
                Visibility
              </div>
              <div css={STYLES_OPTIONS_SECTION}>
                <div css={STYLES_TEXT}>{isVisible ? "Everyone" : "Link only"}</div>
                <Toggle dark active={isVisible} onChange={this._handleToggleVisibility} />
              </div>
              <div style={{ color: Constants.system.darkGray, marginTop: 8 }}>
                {isVisible
                  ? "This file is currently visible to everyone and searchable within Slate. It may appear in activity feeds and explore."
                  : "This file is currently not visible to others unless they have the link."}
              </div>
            </> */
}
