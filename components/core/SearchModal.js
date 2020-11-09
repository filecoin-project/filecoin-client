import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as Window from "~/common/window";

import MiniSearch from "minisearch";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

import { css } from "@emotion/core";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { dispatchCustomEvent } from "~/common/custom-events";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { FileTypeIcon } from "~/components/core/FileTypeIcon";

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
  ${"" /* display: flex;
  align-items: center;
  justify-content: center; */}
  background-color: rgba(223, 223, 223, 0.3);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  z-index: ${Constants.zindex.modal};
`;

const STYLES_ICON_SQUARE = css`
  height: 48px;
  width: 48px;
  border-radius: 4px;
  border: 1px solid ${Constants.system.foreground};
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
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  height: 48px;
  width: 48px;
  border-radius: 4px;
`;

const UserEntry = ({ item }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_ENTRY_CONTAINER}>
        <div style={{ backgroundImage: `url(${item.data.photo})` }} css={STYLES_PROFILE_PREVIEW} />
        <div css={STYLES_TEXT_ROWS}>
          {item.data.name ? (
            <React.Fragment>
              <div css={STYLES_TITLE}>{item.data.name}</div>
              <div css={STYLES_SUBTITLE}>@{item.username}</div>
            </React.Fragment>
          ) : (
            <div css={STYLES_TITLE}>@{item.username}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  flex-shrink: 0;
  height: 182px;
  width: 182px;
  margin-bottom: 12px;
`;

const UserPreview = ({ item, viewer }) => {
  let followStatus = "Not following";
  let trustStatus = "Not trusted";
  let trust = viewer.trusted.filter((entry) => {
    return entry.target_user_id === item.id;
  });
  if (trust.length) {
    if (trust[0].data.verified) {
      trustStatus = "Trusted";
    } else {
      trustStatus = "Trust request sent";
    }
  }
  let pendingTrust = viewer.pendingTrusted.filter((entry) => {
    return entry.owner_user_id === item.id;
  });
  if (pendingTrust.length) {
    if (pendingTrust[0].data.verified) {
      trustStatus = "Trusted";
    } else {
      trustStatus = "Requested to trust you";
    }
  }
  if (
    viewer.subscriptions.filter((entry) => {
      return entry.target_user_id === item.id;
    }).length
  ) {
    followStatus = "Following";
  }
  if (
    viewer.subscribers.filter((entry) => {
      return entry.owner_user_id === item.id;
    }).length
  ) {
    if (followStatus === "Following") {
      followStatus = "You follow each other";
    } else {
      followStatus = "Follows you";
    }
  }
  return (
    <div>
      <div css={STYLES_PROFILE_IMAGE} style={{ backgroundImage: `url('${item.data.photo}')` }} />
      {item.data.name ? <div css={STYLES_PREVIEW_TEXT}>{item.data.name}</div> : null}
      <div css={STYLES_PREVIEW_TEXT}>@{item.username}</div>
      {item.data.slates ? (
        <div css={STYLES_PREVIEW_TEXT}>
          {item.data.slates.length} Slate{item.data.slates.length === 1 ? "" : "s"}
        </div>
      ) : null}
      {followStatus === "Not following" ? null : (
        <div css={STYLES_PREVIEW_TEXT}>{followStatus}</div>
      )}
      {trustStatus === "Not trusted" ? null : <div css={STYLES_PREVIEW_TEXT}>{trustStatus}</div>}
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
  color: ${Constants.system.textGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
`;

const STYLES_SUBTITLE = css`
  font-size: ${Constants.typescale.lvlN1};
  color: ${Constants.system.textGrayLight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
`;

const SlateEntry = ({ item, viewer }) => {
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_ENTRY_CONTAINER}>
        <div css={STYLES_ICON_SQUARE}>
          <SVG.Slate height="24px" />
        </div>
        <div css={STYLES_TEXT_ROWS}>
          <div css={STYLES_TITLE}>{item.data.name || item.slatename}</div>
          {viewer ? (
            <div css={STYLES_SUBTITLE}>{item.data.objects.length} Files</div>
          ) : item.owner && (item.owner.username || item.owner.data.name) ? (
            <div css={STYLES_SUBTITLE}>{item.owner.data.name || `@${item.owner.username}`}</div>
          ) : null}
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
  color: ${Constants.system.textGray};
  margin: 4px 0;
`;

const STYLES_EMPTY_SLATE_PREVIEW = css`
  height: 182px;
  width: 182px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Constants.system.bgGray};
`;

const SlatePreview = ({ item, viewer }) => {
  let preview;
  for (let obj of item.data.objects) {
    if (obj.type && obj.type.startsWith("image/")) {
      preview = obj;
      break;
    }
  }
  if (!item && item.data.objects && item.data.objects.length) {
    preview = item.data.objects[0];
  }
  console.log(preview);
  return (
    <div style={{ textAlign: "center" }}>
      <div css={STYLES_PREVIEW_IMAGE}>
        {preview ? (
          <SlateMediaObjectPreview
            style={{ border: `1px solid ${Constants.system.bgGray}` }}
            blurhash={preview.blurhash}
            url={preview.url.replace("https://undefined", "https://")}
            title={preview.title || preview.name}
            type={preview.type}
          />
        ) : (
          <div css={STYLES_EMPTY_SLATE_PREVIEW}>
            <SVG.Slate height="36px" style={{ color: "#bfbfbf" }} />
          </div>
        )}
      </div>
      {viewer || item.owner ? (
        <div css={STYLES_PREVIEW_TEXT}>
          Created by:{" "}
          {viewer
            ? viewer.data.name || `@${viewer.username}`
            : item.owner.data.name || `@${item.owner.username}`}
        </div>
      ) : null}
      <div css={STYLES_PREVIEW_TEXT}>
        {item.data.objects.length} File{item.data.objects.length === 1 ? "" : "s"}
      </div>
    </div>
  );
};

const FileEntry = ({ item, viewer }) => {
  let file = item.data.file;
  let slate = item.data.slate;
  return (
    <div css={STYLES_ENTRY}>
      <div css={STYLES_ENTRY_CONTAINER}>
        <div css={STYLES_ICON_SQUARE}>
          <FileTypeIcon type={file.type} height="24px" />
        </div>
        <div css={STYLES_TEXT_ROWS}>
          <div css={STYLES_TITLE}>{file.title || file.name || file.file}</div>
          {viewer ? (
            <div css={STYLES_SUBTITLE}>Your files</div>
          ) : slate ? (
            <div css={STYLES_SUBTITLE}>{slate.data ? slate.data.name : slate.slatename}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const FilePreview = ({ item, viewer }) => {
  let file = item.data.file;
  let slate = item.data.slate;
  return (
    <div style={{ textAlign: "center" }}>
      <div css={STYLES_PREVIEW_IMAGE}>
        <SlateMediaObjectPreview
          style={{ border: `1px solid ${Constants.system.bgGray}` }}
          blurhash={file.blurhash}
          url={
            file.url
              ? file.url.replace("https://undefined", "https://")
              : file.cid
              ? Strings.getCIDGatewayURL(file.cid)
              : Strings.getCIDGatewayURL(Strings.getCIDFromIPFS(file.ipfs))
          }
          title={file.title || file.name || file.file}
          type={file.type}
        />
      </div>
      {viewer || (slate && slate.owner) ? (
        <div css={STYLES_PREVIEW_TEXT}>
          Owner:{" "}
          {viewer
            ? viewer.data.name || `@${viewer.username}`
            : slate.owner.data.name || `@${slate.owner.username}`}
        </div>
      ) : null}
      {slate ? (
        <div css={STYLES_PREVIEW_TEXT}>Slate: {slate.data.name || slate.slatename}</div>
      ) : viewer ? (
        <div css={STYLES_PREVIEW_TEXT}>In your files</div>
      ) : null}
    </div>
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
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
  width: 100%;
  height: 56px;
  background: ${Constants.system.bgGrayLight};
  color: ${Constants.system.textGray};
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: flex-start;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  transition: 200ms ease all;
  padding: 0 16px 0 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 0px;
  margin-bottom: 8px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.textGray};
    opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.textGray};
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.textGray};
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
  color: ${Constants.system.textGrayLight};
  font-size: ${Constants.typescale.lvlN1};
  display: flex;
  align-items: center;
`;

const STYLES_FILTER_BUTTON = css`
  padding: 11px;
  border-radius: 4px;
  border: 1px solid ${Constants.system.bgGray};
  color: ${Constants.system.textGray};
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
  color: ${Constants.system.textGrayLight};
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvlN1};
  letter-spacing: -0.1px;
  position: absolute;
  bottom: 16px;
  left: 24px;
`;

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
    await this.setState({ modal: true });
    await this.fillLocalDirectory();
    await this.setState({ loading: false });
    if (!this.initialized) {
      await this.initializeSearch();
    }
    this._input.focus();
    window.addEventListener("keydown", this._handleDocumentKeydown);
  };

  _handleHide = () => {
    window.removeEventListener("keydown", this._handleDocumentKeydown);
    this.setState({ modal: false });
  };

  initializeSearch = async () => {
    this._input.focus();
    this.debounceInstance = Window.debounce(() => {
      if (this.state.selectedIndex !== 0) {
        this.setState({ selectedIndex: 0 });
      }
      this._handleSearch();
    }, 500);
    let defaultResults = this.props.viewer.slates;
    defaultResults = defaultResults.map((slate) => {
      return {
        value: {
          type: "SLATE",
          data: slate,
        },
        component: <SlateEntry item={slate} viewer={this.props.viewer} />,
        preview: <SlatePreview item={slate} viewer={this.props.viewer} />,
      };
    });
    this.setState({ defaultResults });
    let networkIds = [];
    for (let sub of this.props.viewer.subscriptions) {
      if (sub.target_user_id) {
        networkIds.push(sub.target_user_id);
      }
    }
    for (let sub of this.props.viewer.trusted) {
      if (sub.target_user_id) {
        networkIds.push(sub.target_user_id);
      }
    }
    for (let sub of this.props.viewer.pendingTrusted) {
      if (sub.owner_user_id) {
        networkIds.push(sub.owner_user_id);
      }
    }
    this.networkIds = networkIds;
  };

  fillLocalDirectory = () => {
    this.localSearch = new MiniSearch({
      fields: [
        "data.file.name",
        "filename",
        "slatename",
        "data.name",
        "data.file.file",
        "data.title",
      ],
      storeFields: ["type", "data", "id"],
      extractField: (entry, fieldName) => {
        return fieldName.split(".").reduce((doc, key) => doc && doc[key], entry);
      },
      searchOptions: {
        fuzzy: 0.15,
      },
    });
    let files = this.props.viewer.library[0].children.map((file, i) => {
      return {
        type: "DATA_FILE",
        id: file.id,
        filename: file.name || file.file,
        data: {
          file: {
            ...file,
            url: `${Constants.gateways.ipfs}/${file.cid || file.ipfs.replace("/ipfs/", "")}`,
          },
          index: i,
        },
      };
    });
    this.localSearch.addAll(files);
    let privateSlates = this.props.viewer.slates.filter((slate) => !slate.data.public);
    let privateFiles = [];
    for (let slate of privateSlates) {
      privateFiles.push(
        ...slate.data.objects.map((file, i) => {
          return {
            type: "FILE",
            id: file.id,
            filename: file.title || file.name || file.file,
            data: {
              file,
              slate,
              index: i,
            },
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

  // fillPersonalDirectory = () => {
  //   this.personalSearch = new MiniSearch({
  //     fields: ["slatename", "data.name", "username", "filename"],
  //     storeFields: ["type", "slatename", "username", "data", "id", "slates", "owner"],
  //     extractField: (entry, fieldName) => {
  //       return fieldName.split(".").reduce((doc, key) => doc && doc[key], entry);
  //     },
  //     searchOptions: {
  //       fuzzy: 0.15,
  //     },
  //   });
  //   let files = this.props.viewer.library[0].children.map((file, i) => {
  //     return {
  //       type: "DATA_FILE",
  //       id: file.id,
  //       filename: file.name || file.file,
  //       data: {
  //         file: {
  //           ...file,
  //           url: `${Constants.gateways.ipfs}/${file.cid || file.ipfs.replace("/ipfs/", "")}`,
  //         },
  //         index: i,
  //       },
  //     };
  //   });
  //   let slates = this.props.viewer.slates.map((slate) => {
  //     return { ...slate, type: "SLATE", owner: this.props.viewer };
  //   });
  //   this.personalSearch.addAll(slates);
  //   let userIds = [];
  //   this.personalSearch.addAll(this.props.viewer.pendingTrusted.map((trust) => trust.owner));
  //   userIds.push(...this.props.viewer.pendingTrusted.map((trust) => trust.owner.id));
  //   this.personalSearch.addAll(
  //     this.props.viewer.trusted
  //       .filter((trust) => !userIds.includes(trust.user.id))
  //       .map((trust) => trust.user)
  //   );
  //   userIds.push(...this.props.viewer.trusted.map((trust) => trust.user.id));
  //   this.personalSearch.addAll(
  //     this.props.viewer.subscriptions
  //       .filter((sub) => sub.target_user_id && !userIds.includes(sub.user.id))
  //       .map((sub) => sub.user)
  //   );
  //   this.personalSearch.addAll(files);
  // };

  _handleDocumentKeydown = (e) => {
    let results;
    if (this.state.results && this.state.results.length) {
      results = this.state.results;
    } else {
      results = this.state.defaultResults;
    }
    if (e.keyCode === 27) {
      this._handleHide();
      e.preventDefault();
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
      if (results.length > this.state.selectedIndex && this.state.selectedIndex !== -1) {
        this._handleSelect(results[this.state.selectedIndex].value);
      }
      e.preventDefault();
    }
  };

  _handleChange = (e) => {
    this.debounceInstance(e);
    this.setState({ inputValue: e.target.value });
  };

  _handleSearch = async (refilter = false) => {
    let searchResults = [];
    let results = [];

    if (this.state.typeFilter !== "USER") {
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
      let ids = new Set();
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
            value: {
              type: "SLATE",
              data: item,
            },
            component: <SlateEntry item={item} viewer={this.props.viewer} />,
            preview: <SlatePreview item={item} viewer={this.props.viewer} />,
          });
        } else if (item.type === "FILE" || item.type === "DATA_FILE") {
          results.push({
            value: {
              type: item.type,
              data: item,
            },
            component: <FileEntry item={item} viewer={this.props.viewer} />,
            preview: <FilePreview item={item} viewer={this.props.viewer} />,
          });
        }
      }
    }

    let res;
    if (!refilter) {
      let response = await Actions.search({
        query: this.state.inputValue,
        type: this.state.typeFilter,
        userId: this.props.viewer.id,
        filterBy: null,
        networkIds: this.networkIds || [],
      });
      this.setState({ unfilteredResults: response.data.results });
      res = response.data.results;
    } else {
      res = this.state.unfilteredResults;
    }
    searchResults = this.processResults(res);
    for (let item of searchResults) {
      if (item.type === "USER") {
        results.push({
          value: {
            type: "USER",
            data: item,
          },
          component: <UserEntry item={item} />,
          preview: <UserPreview item={item} viewer={this.props.viewer} />,
        });
      } else if (item.type === "SLATE") {
        results.push({
          value: {
            type: "SLATE",
            data: item,
          },
          component: (
            <SlateEntry
              item={item}
              viewer={
                item.owner && item.owner.id === this.props.viewer.id ? this.props.viewer : null
              }
            />
          ),
          preview: (
            <SlatePreview
              item={item}
              viewer={
                item.owner && item.owner.id === this.props.viewer.id ? this.props.viewer : null
              }
            />
          ),
        });
      } else if (item.type === "FILE") {
        results.push({
          value: {
            type: item.type,
            data: item,
          },
          component: <FileEntry item={item} />,
          preview: <FilePreview item={item} />,
        });
      }
    }
    this.setState({ results });
  };

  processResults = (searchResults) => {
    let results = searchResults;
    if (this.state.scopeFilter === "MY") {
      results = results.filter((res) => {
        if (res.ownerId !== this.props.viewer.id) return false;
        return true;
      });
    } else if (this.state.scopeFilter === "NETWORK" && this.networkIds && this.networkIds.length) {
      results = results.filter((res) => {
        if (!this.networkIds.includes(res.ownerId)) {
          return false;
        }
        return true;
      });
    }
    results = results
      .sort((a, b) => {
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
          let aInNetwork = this.networkIds.includes(a.ownerId);
          let bInNetwork = this.networkIds.includes(b.ownerId);
          if (aInNetwork && !bInNetwork) {
            return -1;
          } else if (!aInNetwork && bInNetwork) {
            return 1;
          }
        }
        return b.weight - a.weight;
      })
      .map((res) => res.data.value);
    return results;
  };

  _handleSelect = async (value) => {
    if (value.type === "SLATE") {
      this.props.onAction({
        type: "NAVIGATE",
        value: "V1_NAVIGATION_SLATE",
        data: value.data,
      });
    }
    if (value.type === "USER") {
      this.props.onAction({
        type: "NAVIGATE",
        value: "V1_NAVIGATION_PROFILE",
        data: value.data,
      });
    }
    if (value.type === "DATA_FILE") {
      await this.props.onAction({
        type: "NAVIGATE",
        value: "data",
      });
      dispatchCustomEvent({
        name: "slate-global-open-carousel",
        detail: { index: value.data.data.index },
      });
    }
    if (value.type === "FILE") {
      await this.props.onAction({
        type: "NAVIGATE",
        value: "V1_NAVIGATION_SLATE",
        data: value.data.data.slate,
      });
      if (value.data.data.slate) {
        let ids = value.data.data.slate.data.objects.map((obj) => obj.id);
        let index = ids.indexOf(value.data.data.file.id);
        if (index !== -1) {
          dispatchCustomEvent({
            name: "slate-global-open-carousel",
            detail: { index },
          });
        }
      }
    }
    this._handleHide();
  };

  _handleRedirect = async (destination) => {
    if (destination === "FMU") {
      let isProd = window.location.hostname.includes("slate.host");
      this._handleSelect({
        type: "FILE",
        data: {
          data: {
            file: { id: "rick-roll" },
            slate: {
              id: isProd
                ? "01edcede-53c9-46b3-ac63-8f8479e10bcf"
                : "60d199e7-6bf5-4994-94e8-b17547c64449",
              data: {
                objects: [
                  {
                    id: "rick-roll",
                    url:
                      "https://slate.textile.io/ipfs/bafybeifcxjvbad4lgpnbwff2dafufmnlylylmku4qoqtlkwgidupwi6f3a",
                    ownerId: "owner",
                    name: "Never gonna give you up",
                    title: "never-gonna-give-you-up.mp4",
                    type: "video/mp4",
                  },
                ],
              },
              ownerId: "owner",
            },
          },
        },
      });
    }
    this.props.onAction({
      type: "SIDEBAR",
      value: destination,
    });
    this._handleHide();
  };

  _handleFilterType = async (type) => {
    this._input.focus();
    if (this.state.typeFilter === type) {
      await this.setState({ typeFilter: null });
    } else {
      await this.setState({ typeFilter: type });
    }
    if (this.state.inputValue) {
      this._handleSearch();
    }
  };

  _handleFilterScope = async (scope) => {
    this._input.focus();
    await this.setState({ scopeFilter: scope, filterTooltip: false });
    if (this.state.inputValue) {
      this._handleSearch(true);
    }
  };

  render() {
    let results =
      this.state.inputValue && this.state.inputValue.length
        ? this.state.results
        : this.state.defaultResults;
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
                    <div style={{ position: "relative" }}>
                      <input
                        disabled={!this.state.modal || this.state.loading}
                        css={STYLES_INPUT}
                        value={this.state.inputValue}
                        placeholder="Search for slates, users, and files..."
                        onChange={this._handleChange}
                        ref={(c) => {
                          this._input = c;
                        }}
                      />
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
                                ? Constants.system.bgGrayLight
                                : Constants.system.white,
                          }}
                          onClick={() => this._handleFilterType("SLATE")}
                        >
                          <SVG.Layers height="16px" />
                          <span css={STYLES_MOBILE_HIDDEN} style={{ marginLeft: 8 }}>
                            Search slates
                          </span>
                        </div>
                        <div
                          css={STYLES_FILTER_BUTTON}
                          style={{
                            backgroundColor:
                              this.state.typeFilter === "USER"
                                ? Constants.system.bgGrayLight
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
                                ? Constants.system.bgGrayLight
                                : Constants.system.white,
                          }}
                          onClick={() => this._handleFilterType("FILE")}
                        >
                          <SVG.HardDrive height="16px" />
                          <span css={STYLES_MOBILE_HIDDEN} style={{ marginLeft: 8 }}>
                            Search files
                          </span>
                        </div>
                        {/* <div
                    css={STYLES_FILTER_BUTTON}
                    style={{
                      backgroundColor:
                        this.state.typeFilter === "TAG"
                          ? Constants.system.bgGrayLight
                          : Constants.system.white,
                    }}
                    onClick={() => this._handleFilterType("TAG")}
                  >
                    <SVG.Hash height="16px" />
                    <span css={STYLES_MOBILE_HIDDEN} style={{ marginLeft: 8 }}>Search tags</span>
                  </div> */}
                      </div>
                      <div style={{ flexShrink: 0, position: "relative" }}>
                        <div
                          css={STYLES_FILTER_BUTTON}
                          style={{
                            marginRight: 0,
                            marginLeft: 16,
                            backgroundColor: this.state.scopeFilter
                              ? Constants.system.bgGrayLight
                              : Constants.system.white,
                          }}
                          onClick={() =>
                            this.setState({ filterTooltip: !this.state.filterTooltip })
                          }
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
                                top: 48,
                                boxShadow: "none",
                                borderColor: Constants.system.bgGray,
                                color: Constants.system.textGray,
                              }}
                              navigation={[
                                {
                                  text: "All",
                                  onClick: () => this._handleFilterScope(null),
                                },
                                {
                                  text: "My stuff",
                                  onClick: () => this._handleFilterScope("MY"),
                                },
                                {
                                  text: "My Network",
                                  onClick: () => this._handleFilterScope("NETWORK"),
                                },
                              ]}
                            />
                          </Boundary>
                        ) : null}
                      </div>
                    </div>

                    <div
                      data-menu
                      ref={(c) => {
                        this._optionRoot = c;
                      }}
                      css={STYLES_DROPDOWN}
                    >
                      {results.map((each, i) => (
                        <div
                          key={
                            each.value.type === "FILE"
                              ? `${each.value.data.data.file.id}-${each.value.data.data.slate.id}`
                              : each.value.data.id
                          }
                          css={STYLES_DROPDOWN_ITEM}
                          style={{
                            background:
                              this.state.selectedIndex === i
                                ? "rgba(196, 196, 196, 0.1)"
                                : Constants.system.white,
                            paddingRight: this.state.selectedIndex === i ? "88px" : "4px",
                          }}
                          onClick={() => {
                            this.state.selectedIndex === i || this.props.mobile
                              ? this._handleSelect(each.value)
                              : this.setState({ selectedIndex: i });
                          }}
                        >
                          {each.component}
                          {this.state.selectedIndex === i ? (
                            <div css={STYLES_RETURN}>
                              <SVG.ArrowDownLeft height="16px" style={{ marginRight: 8 }} /> Return
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    {results &&
                    results.length &&
                    this.state.selectedIndex < results.length &&
                    this.state.selectedIndex >= 0 ? (
                      <div
                        css={STYLES_PREVIEW_PANEL}
                        onClick={() => {
                          if (
                            this.state.selectedIndex >= 0 &&
                            this.state.selectedIndex < results.length
                          ) {
                            this._handleSelect(results[this.state.selectedIndex].value);
                          }
                        }}
                      >
                        {results[this.state.selectedIndex].preview}
                      </div>
                    ) : null}
                  </React.Fragment>
                )}
              </div>

              <div css={STYLES_BOTTOM_BUTTONS}>
                <span
                  style={{ marginRight: 24, cursor: "pointer" }}
                  onClick={() => this._handleRedirect("SIDEBAR_HELP")}
                >
                  Contact Us
                </span>
                <span
                  style={{ marginRight: 24, cursor: "pointer" }}
                  onClick={() => this._handleRedirect("SIDEBAR_FAQ")}
                >
                  FAQ
                </span>
                <span style={{ cursor: "pointer" }} onClick={() => this._handleRedirect("FMU")}>
                  Fuck Me Up
                </span>
              </div>
            </div>
          </Boundary>
        </div>
      </div>
    );
  }
}
