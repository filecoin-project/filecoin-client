import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as Strings from "~/common/strings";
import * as Window from "~/common/window";
import * as Validations from "~/common/validations";
import * as Logging from "~/common/logging";

import MiniSearch from "minisearch";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

import { Link } from "~/components/core/Link";
import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { FileTypeIcon } from "~/components/core/FileTypeIcon";
import { useIntercom } from "react-use-intercom";
import ProfilePhoto from "~/components/core/ProfilePhoto"; 

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_BACKGROUND = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(223, 223, 223, 0.3);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  z-index: ${Constants.zindex.modal};
`;

const STYLES_ICON_SQUARE = css`
  height: 48px;
  width: 48px;
  border-radius: 4px;
  border: 1px solid ${Constants.semantic.bgLight};
  background-color: ${Constants.system.white};
  color: #bfbfbf;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_CONTAINER = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const STYLES_MODAL = css`
  position: relative;
  display: inline-flex;
  padding: 24px;
  border-radius: 4px;
  background-color: ${Constants.system.white};
  box-shadow: 0 12px 48px 0px rgba(178, 178, 178, 0.3);
  width: 95vw;
  max-width: 800px;
  height: 85vh;
  max-height: 504px;
`;

const STYLES_PROFILE_PREVIEW = css`
  background-color: ${Constants.semantic.bgLight};
  background-size: cover;
  background-position: 50% 50%;
  height: 48px;
  width: 48px;
  border-radius: 4px;
`;

const UserEntry = ({ user }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_ENTRY_CONTAINER}>
        <div css={STYLES_PROFILE_PREVIEW}>
          <ProfilePhoto 
            user={this.props.viewer}
            size={48} 
          />
        </div>
        <div css={STYLES_TEXT_ROWS}>
          {user.data.name ? (
            <React.Fragment>
              <div css={STYLES_TITLE}>{user.data.name}</div>
              <div css={STYLES_SUBTITLE}>@{user.username}</div>
            </React.Fragment>
          ) : (
            <div css={STYLES_TITLE}>@{user.username}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.semantic.bgLight};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  height: 182px;
  width: 182px;
  margin-bottom: 12px;
  border-radius: 8px;
`;

const UserPreview = ({ user }) => {
  return (
    <div>
      <div css={STYLES_PROFILE_IMAGE}>
        <ProfilePhoto 
          photo={user.data.photo}
          userId={user.id} 
          size={182} 
        />
      </div>

      {user.data.name ? <div css={STYLES_PREVIEW_TEXT}>{user.data.name}</div> : null}
      <div css={STYLES_PREVIEW_TEXT}>@{user.username}</div>
      {user.data.slates ? (
        <div css={STYLES_PREVIEW_TEXT}>
          {user.data.slates.length} Collection{user.data.slates.length === 1 ? "" : "s"}
        </div>
      ) : null}
    </div>
  );
};

const STYLES_ENTRY = css`
  padding: 4px 0px;
`;

const STYLES_ENTRY_CONTAINER = css`
  display: grid;
  grid-template-columns: 62px minmax(0, 1fr);
  flex-direction: row;
  align-items: center;
`;

const STYLES_TEXT_ROWS = css`
  display: flex;
  flex-direction: column;
`;

const STYLES_TITLE = css`
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
  color: ${Constants.semantic.textGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
`;

const STYLES_SUBTITLE = css`
  font-size: ${Constants.typescale.lvlN1};
  color: ${Constants.semantic.textGrayLight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
`;

const SlateEntry = ({ slate, user }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_ENTRY_CONTAINER}>
        <div css={STYLES_ICON_SQUARE}>
          <SVG.Slate height="24px" />
        </div>
        <div css={STYLES_TEXT_ROWS}>
          <div css={STYLES_TITLE}>{slate.data.name || slate.slatename}</div>
          {user ? <div css={STYLES_SUBTITLE}>{user.data.name || `@${user.username}`}</div> : null}
        </div>
      </div>
    </div>
  );
};

const STYLES_PREVIEW_IMAGE = css`
  margin: 0 auto;
  height: 182px;
  width: 182px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const STYLES_PREVIEW_TEXT = css`
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvlN1};
  color: ${Constants.semantic.textGray};
  margin: 4px 16px;
  word-break: break-word;
`;

const STYLES_EMPTY_SLATE_PREVIEW = css`
  height: 182px;
  width: 182px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Constants.semantic.bgLight};
`;

const SlatePreview = ({ slate, user }) => {
  let preview;
  if (slate.objects?.length) {
    for (let obj of slate.objects) {
      if (obj.type && Validations.isPreviewableImage(obj.type)) {
        preview = obj;
        break;
      }
    }
    if (!preview) {
      preview = slate.objects[0];
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div css={STYLES_PREVIEW_IMAGE}>
        {preview ? (
          <SlateMediaObjectPreview file={preview} />
        ) : (
          <div css={STYLES_EMPTY_SLATE_PREVIEW}>
            <SVG.Slate height="80px" style={{ color: "#bfbfbf" }} />
          </div>
        )}
      </div>
      {user ? (
        <div css={STYLES_PREVIEW_TEXT}>Created by: {user.data.name || `@${user.username}`}</div>
      ) : null}
      {slate.objects && (
        <div css={STYLES_PREVIEW_TEXT}>
          {slate.objects.length} File{slate.objects.length === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );
};

const FileEntry = ({ file }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_ENTRY_CONTAINER}>
        <div css={STYLES_ICON_SQUARE}>
          <FileTypeIcon file={file} height="24px" />
        </div>
        <div css={STYLES_TEXT_ROWS}>
          <div css={STYLES_TITLE}>{file.data.name || file.filename}</div>
          <div css={STYLES_SUBTITLE} style={{ textTransform: "uppercase" }}>
            {Strings.getFileExtension(file.filename)}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilePreview = ({ file, slate, user, viewerId }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div css={STYLES_PREVIEW_IMAGE}>
        <SlateMediaObjectPreview file={file} previewPanel />
      </div>
      {user ? (
        <div css={STYLES_PREVIEW_TEXT}>Owner: {user.data.name || `@${user.username}`}</div>
      ) : null}
      {slate ? (
        <div css={STYLES_PREVIEW_TEXT}>Collection: {slate.data.name || slate.slatename}</div>
      ) : user?.id === viewerId ? (
        <div css={STYLES_PREVIEW_TEXT}>In your files</div>
      ) : null}
    </div>
  );
};

const OpenIntercom = ({ user }) => {
  const { show, update } = useIntercom();

  return (
    <span
      style={{ marginRight: 24, cursor: "pointer" }}
      onClick={() => {
        update({
          name: user.data.name,
          email: user.email,
          customAttributes: {
            slate_userid: user.id,
            username: user.username,
          },
        });
        show();
      }}
    >
      Contact Us
    </span>
  );
};

const STYLES_DROPDOWN_CONTAINER = css`
  box-sizing: border-box;
  z-index: ${Constants.zindex.modal};
  position: relative;
  width: 100%;
`;

const STYLES_DROPDOWN = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 50%;
  scrollbar-width: none;
  padding-bottom: 8px;
  height: calc(100% - 144px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_DROPDOWN_ITEM = css`
  box-sizing: border-box;
  margin-bottom: 8px;
  padding: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
`;

const STYLES_INPUT = css`
  font-family: ${Constants.font.medium};
  -webkit-appearance: none;
  width: 100%;
  height: 56px;
  background: ${Constants.semantic.bgGrayLight};
  color: ${Constants.semantic.textGray};
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: flex-start;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  transition: 200ms ease all;
  padding: 0 40px 0 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 0 2px 2px 0;
  margin-bottom: 8px;
  letter-spacing: -0.1px;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.semantic.textGrayLight};
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.semantic.textGrayLight};
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.semantic.textGrayLight};
  }
`;

const STYLES_LOADER = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_RETURN = css`
  position: absolute;
  right: 16px;
  top: 20px;
  color: ${Constants.semantic.textGrayLight};
  font-size: ${Constants.typescale.lvlN1};
  display: flex;
  align-items: center;
`;

const STYLES_FILTER_BUTTON = css`
  padding: 11px;
  border-radius: 4px;
  border: 1px solid ${Constants.semantic.bgLight};
  color: ${Constants.semantic.textGray};
  margin-right: 8px;
  display: flex;
  align-items: center;
  font-size: ${Constants.typescale.lvlN1};
  cursor: pointer;
  letter-spacing: -0.1px;
`;

const STYLES_PREVIEW_PANEL = css`
  width: 50%;
  height: calc(100% - 120px);
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_BOTTOM_BUTTONS = css`
  color: ${Constants.semantic.textGrayLight};
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvlN1};
  letter-spacing: -0.1px;
  position: absolute;
  bottom: 16px;
  left: 24px;
`;

const STYLES_INLINE_TAG_CONTAINER = css`
  height: 56px;
  background: ${Constants.semantic.bgGrayLight};
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 2px 0 0 2px;
`;

const STYLES_INLINE_TAG = css`
  font-family: ${Constants.font.medium};
  color: ${Constants.semantic.textGray};
  font-size: 14px;
  display: flex;
  align-items: center;
  background: ${Constants.system.white};
  height: 100%;
  padding: 0px 10px;
  letter-spacing: -0.1px;
`;

const STYLES_DISMISS_BOX = css`
  position: absolute;
  right: 12px;
  top: 16px;
  padding: 2px;
  cursor: pointer;
  color: ${Constants.semantic.textGray};
  outline: 0;
`;

const getHref = (result) => {
  if (result.type === "SLATE") {
    return `/$/slate/${result.data.slate.id}`;
  } else if (result.type === "USER") {
    return `/$/user/${result.data.user.id}`;
  } else if (result.type === "FILE") {
    return `/$/user/${result.data.user.id}?cid=${result.data.file.cid}`;
  } else if (result.type === "DATA_FILE") {
    return `/_/data?cid=${result.data.file.cid}`;
  } else {
    Logging.error("Get href failed because result was:", result);
  }
};

export class SearchModal extends React.Component {
  _input;
  _optionRoot;
  initialized = false;

  state = {
    modal: false,
    loading: true,
    defaultResults: [],
    results: [],
    inputValue: "",
    typeFilter: null,
    scopeFilter: null,
    selectedIndex: 0,
  };

  componentDidMount = () => {
    window.addEventListener("show-search", this._handleShow);
    window.addEventListener("hide-search", this._handleHide);
  };

  componentWillUnmount = () => {
    window.removeEventListener("show-search", this._handleShow);
    window.removeEventListener("hide-search", this._handleHide);
    this._handleHide();
  };

  _handleShow = async () => {
    this.setState({ modal: true });
    await this.fillLocalDirectory();
    this.setState({ loading: false });
    if (!this.initialized) {
      await this.initializeSearch();
    }
    this._input.select();
    window.addEventListener("keydown", this._handleDocumentKeydown);
  };

  _handleHide = () => {
    window.removeEventListener("keydown", this._handleDocumentKeydown);
    this.setState({ modal: false });
  };

  initializeSearch = async () => {
    this.debounceInstance = Window.debounce(() => {
      this._handleSearch();
    }, 500);
    let defaultResults = this.props.viewer ? this.props.viewer.slates : [];
    defaultResults = defaultResults.map((slate) => {
      return {
        id: slate.id,
        type: "SLATE",
        data: { slate },
        component: <SlateEntry slate={slate} user={this.props.viewer} />,
        preview: <SlatePreview slate={slate} user={this.props.viewer} />,
        href: `/$/slate/${slate.id}`,
      };
    });
    this.setState({ defaultResults });
    let networkIds = [];
    let slateIds = [];
    if (this.props.viewer?.subscriptions) {
      for (let sub of this.props.viewer.subscriptions) {
        if (sub.target_user_id) {
          networkIds.push(sub.target_user_id);
        } else if (sub.target_slate_id) {
          slateIds.push(sub.target_slate_id);
        }
      }
    }
    this.networkIds = networkIds;
    this.slateIds = slateIds;
  };

  fillLocalDirectory = () => {
    if (!this.props.viewer) {
      return;
    }
    this.localSearch = new MiniSearch({
      fields: ["name", "title"],
      storeFields: ["type", "data", "id"],
      extractField: (entry, fieldName) => {
        return fieldName.split(".").reduce((doc, key) => doc && doc[key], entry);
      },
      searchOptions: {
        fuzzy: 0.15,
      },
    });
    let files = this.props.viewer.library.map((file, i) => {
      return {
        ...file,
        type: "DATA_FILE",
      };
    });
    this.localSearch.addAll(files);
    let privateSlates = this.props.viewer.slates.filter((slate) => !slate.isPublic);
    let privateFiles = [];
    for (let slate of privateSlates) {
      privateFiles.push(
        ...slate.objects.map((file, i) => {
          return {
            ...file,
            type: "FILE",
          };
        })
      );
    }
    privateSlates = privateSlates.map((slate) => {
      return {
        ...slate,
        type: "SLATE",
      };
    });
    this.localSearch.addAll(privateSlates);
    this.localSearch.addAll(privateFiles);
  };

  _handleDocumentKeydown = (e) => {
    let results;
    if (this.state.results && this.state.results.length) {
      results = this.state.results;
    } else if (!this.state.inputValue || !this.state.inputValue.length) {
      results = this.state.defaultResults;
    } else {
      return;
    }
    if (e.keyCode === 27) {
      this._handleHide();
      e.preventDefault();
    } else if (e.keyCode === 8) {
      if (this._input.selectionStart === 0) {
        this.setState({ typeFilter: null });
      }
    } else if (e.keyCode === 9) {
      this._handleHide();
    } else if (e.keyCode === 40) {
      if (results.length) {
        let index;
        if (this.state.selectedIndex < results.length - 1) {
          index = this.state.selectedIndex + 1;
        } else {
          index = 0;
        }
        let listElem = this._optionRoot.children[index];
        let elemRect = listElem.getBoundingClientRect();
        let rootRect = this._optionRoot.getBoundingClientRect();
        if (elemRect.bottom > rootRect.bottom) {
          this._optionRoot.scrollTop =
            listElem.offsetTop +
            listElem.offsetHeight -
            this._optionRoot.offsetHeight -
            this._optionRoot.offsetTop;
        } else if (elemRect.top < rootRect.top) {
          this._optionRoot.scrollTop = listElem.offsetTop - this._optionRoot.offsetTop;
        }
        this.setState({ selectedIndex: index });
      }
      e.preventDefault();
    } else if (e.keyCode === 38) {
      if (results.length) {
        let index;
        if (this.state.selectedIndex > 0) {
          index = this.state.selectedIndex - 1;
        } else {
          index = results.length - 1;
        }
        let listElem = this._optionRoot.children[index];
        let elemRect = listElem.getBoundingClientRect();
        let rootRect = this._optionRoot.getBoundingClientRect();
        if (elemRect.top < rootRect.top) {
          this._optionRoot.scrollTop = listElem.offsetTop - this._optionRoot.offsetTop;
        } else if (elemRect.bottom > rootRect.bottom) {
          this._optionRoot.scrollTop =
            listElem.offsetTop +
            listElem.offsetHeight -
            this._optionRoot.offsetHeight -
            this._optionRoot.offsetTop;
        }
        this.setState({ selectedIndex: index });
      }
      e.preventDefault();
    } else if (e.keyCode === 13) {
      if (results.length > this.state.selectedIndex && this.state.selectedIndex >= 0) {
        let href = results[this.state.selectedIndex].href;
        this.props.onAction({ type: "NAVIGATE", href });
      }
      e.preventDefault();
    }
  };

  _handleChange = (e) => {
    this.debounceInstance();
    this.setState({ inputValue: e.target.value });
  };

  _handleSearch = async (refilter = false) => {
    let searchResults = [];
    let results = [];
    let ids = new Set();
    if (this.state.typeFilter !== "USER" && this.props.viewer) {
      let filter;
      if (this.state.typeFilter === "FILE") {
        filter = {
          filter: (result) => {
            return result.type === "FILE" || result.type === "DATA_FILE";
          },
        };
      } else if (this.state.typeFilter === "SLATE") {
        filter = {
          filter: (result) => result.type === "SLATE",
        };
      }
      if (filter) {
        searchResults.push(this.localSearch.search(this.state.inputValue, filter));
      } else {
        searchResults.push(this.localSearch.search(this.state.inputValue));
      }
      for (let result of searchResults) {
        ids.add(result.id);
      }
      let autofill = this.localSearch.autoSuggest(this.state.inputValue);
      let count = 0;
      for (let i = 0; i < autofill.length; i++) {
        if (count >= 15) break;
        let results;
        if (filter) {
          results = this.localSearch.search(autofill[i].suggestion, filter);
        } else {
          results = this.localSearch.search(autofill[i].suggestion);
        }
        if (results && results.length && !ids.has(results[0].id)) {
          count += 1;
          ids.add(results[0].id);
          searchResults.push(results[0]);
        }
      }
      for (let item of searchResults) {
        if (item.type === "SLATE") {
          results.push({
            id: slate.id,
            type: item.type,
            data: { slate: item },
            component: <SlateEntry slate={item} user={this.props.viewer} />,
            preview: <SlatePreview slate={item} user={this.props.viewer} />,
          });
        } else if (item.type === "FILE" || item.type === "DATA_FILE") {
          results.push({
            id: item.data.file.id,
            type: item.type,
            data: { file: item },
            component: <FileEntry file={item.data.file} />,
            preview: (
              <FilePreview
                file={item.data.file}
                slate={item.data.slate}
                user={this.props.viewer}
                viewerId={this.props.viewer?.id}
              />
            ),
          });
        }
      }
    }

    let res;
    if (!refilter) {
      let response = await Actions.search({
        resourceURI: this.props.resourceURI,
        query: this.state.inputValue,
        type: this.state.typeFilter,
      });
      this.setState({ unfilteredResults: response?.data?.results || [] });
      res = response?.data?.results || [];
    } else {
      res = this.state.unfilteredResults;
    }
    searchResults = this.processResults(res);
    for (let res of searchResults) {
      if (res.type === "USER") {
        let id = res.user?.id;
        if (!id || ids.has(id)) continue;
        ids.add(id);
        results.push({
          id,
          type: res.type,
          href: res.href,
          data: res,
          component: <UserEntry user={res.user} />,
          preview: <UserPreview user={res.user} />,
        });
      } else if (res.type === "SLATE") {
        let id = res.slate?.id;
        if (!id || ids.has(id)) continue;
        ids.add(id);
        results.push({
          id,
          type: res.type,
          href: res.href,
          data: res,
          component: <SlateEntry slate={res.slate} user={res.user} />,
          preview: <SlatePreview slate={res.slate} user={res.user} />,
        });
      } else if (res.type === "FILE") {
        let id = res.file?.id;
        if (!id || ids.has(id)) continue;
        ids.add(id);
        results.push({
          id,
          type: res.type,
          href: res.href,
          data: res,
          component: <FileEntry file={res.file} />,
          preview: (
            <FilePreview
              file={res.file}
              slate={res.slate}
              user={res.user}
              viewerId={this.props.viewer?.id}
            />
          ),
        });
      }
    }
    results = results.map((res) => {
      return { ...res, href: getHref(res) };
    });
    this.setState({ results, selectedIndex: 0 });
    if (this._optionRoot) {
      this._optionRoot.scrollTop = 0;
    }
  };

  processResults = (searchResults) => {
    if (!this.state.viewer) {
      return searchResults;
    }
    let results = searchResults;
    if (this.state.scopeFilter === "MY") {
      results = results.filter((res) => {
        if (res.ownerId !== this.props.viewer.id) return false;
        return true;
      });
    } else if (this.state.scopeFilter === "NETWORK" && this.networkIds && this.networkIds.length) {
      results = results.filter((res) => {
        if (
          (res.type === "USER" && this.networkIds.includes(res.id)) ||
          (res.type === "SLATE" && this.slateIds.includes(res.id)) ||
          this.networkIds.includes(res.ownerId)
        ) {
          return true;
        }
        return false;
      });
    }
    if (this.state.scopeFilter !== "MY") {
      results = results.sort((a, b) => {
        if (this.props.viewer.id && this.state.scopeFilter !== "MY") {
          if (a.ownerId === this.props.viewer.id && b.ownerId !== this.props.viewer.id) {
            return -1;
          } else if (a.ownerId !== this.props.viewer.id && b.ownerId === this.props.viewer.id) {
            return 1;
          }
        }
        if (
          this.networkIds &&
          this.state.scopeFilter !== "NETWORK" &&
          this.state.scopeFilter !== "MY"
        ) {
          let aInNetwork =
            (a.type === "USER" && this.networkIds.includes(a.user.id)) ||
            (a.type === "SLATE" && this.slateIds.includes(a.slate.id)) ||
            this.networkIds.includes(a.ownerId);
          let bInNetwork =
            (b.type === "USER" && this.networkIds.includes(b.user.id)) ||
            (b.type === "SLATE" && this.slateIds.includes(b.slate.id)) ||
            this.networkIds.includes(b.ownerId);
          if (aInNetwork && !bInNetwork) {
            return -1;
          } else if (!aInNetwork && bInNetwork) {
            return 1;
          }
        }
        return 0;
      });
    }
    return results;
  };

  // _handleSelect = async (res) => {
  //   if (res.type === "SLATE") {
  //     this.props.onAction({
  //       type: "NAVIGATE",
  //       value: "NAV_SLATE",
  //       data: res.data.slate,
  //     });
  //   } else if (res.type === "USER") {
  //     this.props.onAction({
  //       type: "NAVIGATE",
  //       value: "NAV_PROFILE",
  //       data: res.data.user,
  //     });
  //   } else if (res.type === "DATA_FILE" || res.data.file.ownerId === this.props.viewer?.id) {
  //     await this.props.onAction({
  //       type: "NAVIGATE",
  //       value: "NAV_DATA",
  //       fileId: res.data.file.id,
  //     });
  //   } else if (res.type === "FILE") {
  //     await this.props.onAction({
  //       type: "NAVIGATE",
  //       value: "NAV_PROFILE",
  //       data: res.data.user,
  //       fileId: res.data.file.id,
  //     });
  //   }
  //   this._handleHide();
  // };

  _handleRedirect = async (destination) => {
    // if (destination === "FMU") {
    //   let isProd = window.location.hostname.includes("slate.host");
    //   this._handleSelect({
    //     type: "FILE",
    //     data: {
    //       file: { id: "rick-roll" },
    //       slate: {
    //         id: isProd
    //           ? "01edcede-53c9-46b3-ac63-8f8479e10bcf"
    //           : "60d199e7-6bf5-4994-94e8-b17547c64449",
    //         data: {
    //           objects: [
    //             {
    //               id: "rick-roll",
    //               url:
    //                 "https://slate.textile.io/ipfs/bafybeifcxjvbad4lgpnbwff2dafufmnlylylmku4qoqtlkwgidupwi6f3a",
    //               ownerId: "owner",
    //               name: "Never gonna give you up",
    //               title: "never-gonna-give-you-up.mp4",
    //               type: "video/mp4",
    //             },
    //           ],
    //         },
    //         ownerId: "owner",
    //       },
    //     },
    //   });
    // }
    this.props.onAction({
      type: "SIDEBAR",
      value: destination,
    });
    this._handleHide();
  };

  _handleFilterType = async (type) => {
    if (this._input) {
      this._input.focus();
    }
    this.setState({ typeFilter: this.state.typeFilter === type ? null : type }, () => {
      this._handleSearch();
    });
  };

  _handleFilterScope = async (scope) => {
    if (this._input) {
      this._input.focus();
    }
    this.setState({ scopeFilter: scope, filterTooltip: false });
    if (this.state.inputValue) {
      this._handleSearch(true);
    }
  };

  _handleClearAll = () => {
    if (!this.state.inputValue || !this.state.inputValue.length) {
      this._handleHide();
    }
    if (this._optionRoot) {
      this._optionRoot.scrollTop = 0;
    }
    if (this._input) {
      this._input.focus();
    }
    this.setState({
      inputValue: "",
      results: [],
      selectedIndex: 0,
      scopeFilter: null,
      typeFilter: null,
    });
  };

  _handleSelectIndex = (i) => {
    if (this.state.selectedIndex === i || this.props.isMobile) {
      this._handleHide();
    }
  };

  render() {
    let selectedIndex = this.state.selectedIndex;
    let results =
      this.state.inputValue && this.state.inputValue.length
        ? this.state.results
        : this.state.defaultResults;

    const filterDropdown = this.props.viewer ? (
      <div style={{ flexShrink: 0, position: "relative" }}>
        <div
          css={STYLES_FILTER_BUTTON}
          style={{
            marginRight: 0,
            marginLeft: 16,
            color: this.state.scopeFilter ? Constants.system.blue : Constants.semantic.textGray,
          }}
          onClick={() => this.setState({ filterTooltip: !this.state.filterTooltip })}
        >
          <SVG.Filter height="16px" />
        </div>
        {this.state.filterTooltip ? (
          <Boundary
            captureResize={true}
            captureScroll={false}
            enabled
            onOutsideRectEvent={() => this.setState({ filterTooltip: false })}
          >
            <PopoverNavigation
              style={{
                right: 0,
                top: 44,
                borderColor: Constants.semantic.bgLight,
                color: Constants.semantic.textGray,
                width: 124,
              }}
              navigation={[
                [
                  {
                    text: (
                      <span
                        style={{
                          color: this.state.scopeFilter ? "inherit" : Constants.system.blue,
                        }}
                      >
                        All
                      </span>
                    ),
                    onClick: () => this._handleFilterScope(null),
                  },
                  {
                    text: (
                      <span
                        style={{
                          color:
                            this.state.scopeFilter === "MY" ? Constants.system.blue : "inherit",
                        }}
                      >
                        My stuff
                      </span>
                    ),
                    onClick: () => this._handleFilterScope("MY"),
                  },
                  {
                    text: (
                      <span
                        style={{
                          color:
                            this.state.scopeFilter === "NETWORK"
                              ? Constants.system.blue
                              : "inherit",
                        }}
                      >
                        My network
                      </span>
                    ),
                    onClick: () => this._handleFilterScope("NETWORK"),
                  },
                ],
              ]}
            />
          </Boundary>
        ) : null}
      </div>
    ) : null;

    return (
      <div
        css={STYLES_BACKGROUND}
        style={{ display: this.state.modal ? "inline-block" : "none" }}
        role="dialog"
        aria-modal="true"
        aria-label="search"
      >
        <div css={STYLES_CONTAINER}>
          <Boundary
            onMouseDown
            enabled={this.state.modal}
            onOutsideRectEvent={this._handleHide}
            isDataMenuCaptured={true}
            style={{ display: "inline-block" }}
          >
            <div css={STYLES_MODAL}>
              <div css={STYLES_DROPDOWN_CONTAINER}>
                {this.state.loading ? (
                  <div css={STYLES_LOADER}>
                    <LoaderSpinner />
                  </div>
                ) : (
                  <React.Fragment>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div css={STYLES_INLINE_TAG_CONTAINER}>
                        {this.state.typeFilter ? (
                          <div css={STYLES_INLINE_TAG}>
                            {this.state.typeFilter === "SLATE"
                              ? "Collections:"
                              : this.state.typeFilter === "USER"
                              ? "Users:"
                              : this.state.typeFilter === "FILE"
                              ? "Files:"
                              : "Tags:"}
                          </div>
                        ) : null}
                      </div>
                      <input
                        autoFocus
                        disabled={!this.state.modal || this.state.loading}
                        css={STYLES_INPUT}
                        value={this.state.inputValue}
                        placeholder={`Search for ${
                          !this.state.typeFilter
                            ? "collections, users, and files..."
                            : this.state.typeFilter === "SLATE"
                            ? "collections..."
                            : this.state.typeFilter === "USER"
                            ? "users..."
                            : this.state.typeFilter === "FILE"
                            ? "files..."
                            : "tags..."
                        }`}
                        onChange={this._handleChange}
                        ref={(c) => {
                          this._input = c;
                        }}
                      />
                      <div css={STYLES_DISMISS_BOX} onClick={this._handleClearAll}>
                        <SVG.Dismiss height="20px" />
                      </div>
                    </div>

                    <div
                      style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          minWidth: "10%",
                        }}
                      >
                        <div
                          css={STYLES_FILTER_BUTTON}
                          style={{
                            backgroundColor:
                              this.state.typeFilter === "SLATE"
                                ? Constants.semantic.bgLight
                                : Constants.system.white,
                          }}
                          onClick={() => this._handleFilterType("SLATE")}
                        >
                          <SVG.Layers height="16px" />
                          <span css={STYLES_MOBILE_HIDDEN} style={{ marginLeft: 8 }}>
                            Search collections
                          </span>
                        </div>
                        <div
                          css={STYLES_FILTER_BUTTON}
                          style={{
                            backgroundColor:
                              this.state.typeFilter === "USER"
                                ? Constants.semantic.bgLight
                                : Constants.system.white,
                          }}
                          onClick={() => this._handleFilterType("USER")}
                        >
                          <SVG.Directory height="16px" />
                          <span css={STYLES_MOBILE_HIDDEN} style={{ marginLeft: 8 }}>
                            Search users
                          </span>
                        </div>
                        <div
                          css={STYLES_FILTER_BUTTON}
                          style={{
                            backgroundColor:
                              this.state.typeFilter === "FILE"
                                ? Constants.semantic.bgLight
                                : Constants.system.white,
                          }}
                          onClick={() => this._handleFilterType("FILE")}
                        >
                          <SVG.HardDrive height="16px" />
                          <span css={STYLES_MOBILE_HIDDEN} style={{ marginLeft: 8 }}>
                            Search files
                          </span>
                        </div>
                      </div>
                      {filterDropdown}
                    </div>

                    <div
                      data-menu
                      ref={(c) => {
                        this._optionRoot = c;
                      }}
                      css={STYLES_DROPDOWN}
                    >
                      {results.map((each, i) => (
                        <Link
                          key={each.id}
                          disabled={this.props.isMobile ? false : selectedIndex !== i}
                          href={each.href}
                          onAction={this.props.onAction}
                          onClick={() => this._handleSelectIndex(i)}
                        >
                          <div
                            css={STYLES_DROPDOWN_ITEM}
                            style={{
                              background:
                                selectedIndex === i
                                  ? "rgba(196, 196, 196, 0.1)"
                                  : Constants.system.white,
                              paddingRight: selectedIndex === i ? "88px" : "4px",
                            }}
                            // onClick={() => {
                            //   selectedIndex === i || this.props.isMobile
                            //     ? this._handleSelect(each)
                            //     : this.setState({ selectedIndex: i });
                            // }}
                            onClick={() => this.setState({ selectedIndex: i })}
                          >
                            {each.component}
                            {selectedIndex === i ? (
                              <div css={STYLES_RETURN}>
                                <SVG.ArrowDownLeft height="16px" style={{ marginRight: 8 }} />{" "}
                                Return
                              </div>
                            ) : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                    {results?.length && selectedIndex < results.length && selectedIndex >= 0 ? (
                      <Link
                        href={results[selectedIndex].href}
                        onAction={this.props.onAction}
                        onClick={this._handleHide}
                      >
                        <div
                          css={STYLES_PREVIEW_PANEL}
                          // onClick={() => {
                          //   if (selectedIndex >= 0 && selectedIndex < results.length) {
                          //     this._handleSelect(results[selectedIndex]);
                          //   }
                          // }}
                        >
                          {results[selectedIndex].preview}
                        </div>
                      </Link>
                    ) : null}
                  </React.Fragment>
                )}
              </div>

              <div css={STYLES_BOTTOM_BUTTONS}>
                <OpenIntercom user={this.props.viewer} />

                <span
                  style={{ marginRight: 24, cursor: "pointer" }}
                  onClick={() => {
                    window.open("https://help.slate.host/", "_blank");
                  }}
                >
                  FAQ
                </span>

                {/* <span style={{ cursor: "pointer" }} onClick={() => this._handleRedirect("FMU")}>
                  I'm Feeling Lucky
                </span> */}
              </div>
            </div>
          </Boundary>
        </div>
      </div>
    );
  }
}
