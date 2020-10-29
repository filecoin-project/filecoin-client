import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { dispatchCustomEvent } from "~/common/custom-events";
import { CheckBox } from "~/components/system/components/CheckBox";
import { Table } from "~/components/core/Table";
import { FileTypeIcon } from "~/components/core/FileTypeIcon";
import { ButtonPrimary, ButtonWarning } from "~/components/system/components/Buttons";
import { TabGroup } from "~/components/core/TabGroup";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import FilePreviewBubble from "~/components/core/FilePreviewBubble";

const STYLES_CONTAINER_HOVER = css`
  display: flex;

  :hover {
    color: ${Constants.system.brand};
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

const STYLES_CANCEL_BOX = css`
  height: 16px;
  width: 16px;
  background-color: ${Constants.system.brand};
  border-radius: 3px;
  position: relative;
  right: 3px;
  cursor: pointer;
  box-shadow: 0 0 0 1px ${Constants.system.brand};
`;

const STYLES_HEADER_LINE = css`
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 30px;
`;

const STYLES_LINK = css`
  display: inline;
  cursor: pointer;
  transition: 200ms ease all;
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 320px;

  @media (max-width: ${Constants.sizes.tablet}px) {
    max-width: 120px;
  }
`;

const STYLES_VALUE = css`
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const STYLES_ICON_BOX_HOVER = css`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_ICON_BOX_BACKGROUND = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  position: absolute;
  bottom: 8px;
  right: 8px;
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
  max-width: ${Constants.sizes.desktop}px;

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

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_IMAGE_GRID = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(214px, 1fr));
  margin: 0 -27px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0px -12px;
  }
`;

const STYLES_IMAGE_BOX = css`
  width: 160px;
  height: 160px;
  margin: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px ${Constants.system.lightBorder} inset,
    0 0 40px 0 ${Constants.system.shadow};
  cursor: pointer;
  position: relative;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 144px;
    height: 144px;
    margin: 12px auto;
  }
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

let mounted = false;

export default class DataView extends React.Component {
  _mounted = false;

  state = {
    menu: null,
    loading: {},
    startIndex: 0,
    checked: {},
    view: "grid",
    viewLimit: 20,
  };

  async componentDidMount() {
    if (!mounted) {
      mounted = true;
      window.addEventListener("remote-data-deletion", this._handleDataDeletion);
      window.addEventListener("remote-slate-object-remove", this._handleRemoteSlateObjectRemove);
      window.addEventListener("remote-slate-object-add", this._handleRemoteSlateObjectAdd);
    }

    window.addEventListener("scroll", this._handleScroll);

    await this._handleUpdate();
  }

  componentWillUnmount() {
    mounted = false;
    window.removeEventListener("remote-data-deletion", this._handleDataDeletion);
    window.removeEventListener("remote-slate-object-remove", this._handleRemoteSlateObjectRemove);
    window.removeEventListener("remote-slate-object-add", this._handleRemoteSlateObjectAdd);

    window.removeEventListener("scroll", this._handleScroll);
    window.removeEventListener("remote-update-carousel", this._handleUpdate);
  }

  _handleScroll = (e) => {
    const windowHeight =
      "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log("END");
      this.setState({ viewLimit: this.state.viewLimit + 5 });
      console.log("New View Limit:" + this.state.viewLimit);
    } else {
      console.log("scrolling");
    }
    console.log("Window H: " + windowHeight);
    console.log("Window H: " + windowHeight);
  };

  _increment = (direction) => {
    if (
      direction > 0 &&
      this.state.startIndex + this.state.viewLimit < this.props.viewer.library[0].children.length
    ) {
      this.setState({ startIndex: this.state.startIndex + this.state.viewLimit });
    } else if (direction < 0 && this.state.startIndex - this.state.viewLimit >= 0) {
      this.setState({ startIndex: this.state.startIndex - this.state.viewLimit });
    }
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

  _handleDelete = async (cid) => {
    const message = `Are you sure you want to delete these files? They will be deleted from your slates as well`;
    if (!window.confirm(message)) {
      return;
    }
    dispatchCustomEvent({ name: "state-global-carousel-loading", detail: { loading: "deleting" } });
    let cids;
    if (cid) {
      cids = [cid];
    } else {
      cids = Object.keys(this.state.checked).map((id) => {
        let index = parseInt(id);
        return this.props.viewer.library[0].children[index].ipfs.replace("/ipfs/", "");
      });
    }
    this._handleLoading({ cids });

    const response = await Actions.deleteBucketItems({ cids });
    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      this._handleLoading({ cids });
      dispatchCustomEvent({ name: "state-global-carousel-loading", detail: { loading: false } });
      return;
    }
    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      this._handleLoading({ cids });
      dispatchCustomEvent({ name: "state-global-carousel-loading", detail: { loading: false } });
      return;
    }
    await this.props.onRehydrate();
    this._handleLoading({ cids });
    this.setState({ checked: {} });
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Files successfully deleted!", status: "INFO" },
      },
    });
    dispatchCustomEvent({ name: "state-global-carousel-loading", detail: { loading: false } });
  };

  _handleSelect = (index) => {
    System.dispatchCustomEvent({
      name: "slate-global-open-carousel",
      detail: { index },
    });
  };

  _handleDataDeletion = (e) => {
    this._handleDelete(e.detail.cid);
  };

  _handleRemoteSlateObjectAdd = async ({ detail }) => {
    const { id, slate, data } = detail;

    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { loading: { id: slate.id } },
    });

    const addResponse = await Actions.addFileToSlate({
      slate,
      data: [{ title: data.name, ...data }],
    });

    if (!addResponse) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return null;
    }

    if (addResponse.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: addResponse.decorator } },
      });
      return null;
    }

    const { added, skipped } = addResponse;
    let message = `${added || 0} file${added !== 1 ? "s" : ""} uploaded. `;
    if (skipped) {
      message += `${skipped || 0} duplicate / existing file${
        added !== 1 ? "s were" : " was"
      } skipped.`;
    }
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message, status: !added ? null : "INFO" },
      },
    });

    await this.props.onRehydrate();
    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { loading: false },
    });
  };

  _handleRemoteSlateObjectRemove = async ({ detail }) => {
    const { id, slate } = detail;

    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { loading: { id: slate.id } },
    });

    const response = await Actions.removeFileFromSlate({ slateId: slate.id, ids: [id] });

    if (!response) {
      System.dispatchCustomEvent({
        name: "state-global-carousel-loading",
        detail: { loading: false },
      });

      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now and weren't able to delete that. Please try again later",
          },
        },
      });
      return null;
    }

    if (response.error) {
      System.dispatchCustomEvent({
        name: "state-global-carousel-loading",
        detail: { loading: false },
      });

      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            decorator: response.decorator,
          },
        },
      });
      return null;
    }

    await this.props.onRehydrate();

    System.dispatchCustomEvent({
      name: "state-global-carousel-loading",
      detail: { loading: false },
    });
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();

    this._handleHide();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
  };

  _handleHide = (e) => {
    this.setState({ menu: null });
  };

  _handleLoading = ({ cids }) => {
    let loading = this.state.loading;
    for (let cid of cids) {
      System.dispatchCustomEvent({
        name: "state-global-carousel-loading",
        detail: { loading: !this.state.loading[cid] },
      });
      loading[cid] = !this.state.loading[cid];
    }
    this.setState({ loading });
  };

  _handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleAddToSlate = (e) => {
    let userFiles = this.props.viewer.library[0].children;
    let files = Object.keys(this.state.checked).map((index) => userFiles[index]);
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_ADD_FILE_TO_SLATE",
      data: { files },
    });
    this._handleUncheckAll();
  };

  _handleUncheckAll = () => {
    this.setState({ checked: {} });
  };

  render() {
    let numChecked = Object.keys(this.state.checked).length || 0;
    const header = (
      <div css={STYLES_HEADER_LINE}>
        <TabGroup disabled tabs={["Uploads"]} style={{ margin: 0 }} />
        <span css={STYLES_MOBILE_HIDDEN}>
          <div
            css={STYLES_ICON_BOX}
            onClick={() => {
              this.setState({ view: "grid", menu: null });
            }}
          >
            <SVG.GridView
              style={{
                color: this.state.view === "grid" ? Constants.system.black : "rgba(0,0,0,0.25)",
              }}
              height="24px"
            />
          </div>
        </span>
        <span css={STYLES_MOBILE_HIDDEN}>
          <div
            css={STYLES_ICON_BOX}
            onClick={() => {
              this.setState({ view: "list", menu: null });
            }}
          >
            <SVG.TableView
              style={{
                color: this.state.view === "list" ? Constants.system.black : "rgba(0,0,0,0.25)",
              }}
              height="24px"
            />
          </div>
        </span>
      </div>
    );
    const footer = (
      <React.Fragment>
        {numChecked ? (
          <div css={STYLES_ACTION_BAR}>
            <div css={STYLES_LEFT}>
              <span css={STYLES_FILES_SELECTED}>
                {numChecked} file{numChecked > 1 ? "s" : ""} selected
              </span>
            </div>
            <div css={STYLES_RIGHT}>
              <ButtonPrimary transparent onClick={this._handleAddToSlate}>
                Add to slate
              </ButtonPrimary>
              <ButtonWarning
                transparent
                style={{ marginLeft: 8 }}
                onClick={() => this._handleDelete()}
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
          </div>
        ) : null}
      </React.Fragment>
    );
    if (this.state.view === "grid") {
      return (
        <React.Fragment>
          {header}
          <div css={STYLES_IMAGE_GRID}>
            {this.props.items
              .slice(this.state.startIndex, this.state.startIndex + this.state.viewLimit)
              .map((each, i) => {
                const cid = each.ipfs.replace("/ipfs/", "");
                return (
                  <div
                    key={each.id}
                    css={STYLES_IMAGE_BOX}
                    onClick={() => this._handleSelect(i + this.state.startIndex)}
                    onMouseEnter={() => this.setState({ hover: i })}
                    onMouseLeave={() => this.setState({ hover: null })}
                  >
                    <SlateMediaObjectPreview
                      blurhash={each.blurhash}
                      url={`${Constants.gateways.ipfs}/${each.ipfs.replace("/ipfs/", "")}`}
                      title={each.file || each.name}
                      type={each.type || each.icon}
                    />
                    <span css={STYLES_MOBILE_HIDDEN}>
                      {numChecked || this.state.hover === i || this.state.menu === each.id ? (
                        <React.Fragment>
                          <div
                            css={STYLES_ICON_BOX_BACKGROUND}
                            onClick={
                              this.state.loading[cid]
                                ? () => {}
                                : (e) => {
                                    e.stopPropagation();
                                    this.setState({
                                      menu: this.state.menu === each.id ? null : each.id,
                                    });
                                  }
                            }
                          >
                            {this.state.loading[cid] ? (
                              <LoaderSpinner style={{ height: 24, width: 24 }} />
                            ) : (
                              <SVG.MoreHorizontal height="24px" />
                            )}

                            {this.state.menu === each.id ? (
                              <Boundary
                                captureResize={true}
                                captureScroll={false}
                                enabled
                                onOutsideRectEvent={this._handleHide}
                              >
                                <PopoverNavigation
                                  style={{
                                    top: "32px",
                                    right: "0px",
                                  }}
                                  navigation={[
                                    {
                                      text: "Copy CID",
                                      onClick: (e) => this._handleCopy(e, cid),
                                    },
                                    {
                                      text: "Copy link",
                                      onClick: (e) =>
                                        this._handleCopy(e, `${Constants.gateways.ipfs}/${cid}`),
                                    },
                                    {
                                      text: "Delete",
                                      onClick: (e) => {
                                        e.stopPropagation();
                                        this.setState({ menu: null }, () =>
                                          this._handleDelete(cid)
                                        );
                                      },
                                    },
                                  ]}
                                />
                              </Boundary>
                            ) : null}
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              let checked = this.state.checked;
                              if (checked[this.state.startIndex + i]) {
                                delete checked[this.state.startIndex + i];
                              } else {
                                checked[this.state.startIndex + i] = true;
                              }
                              this.setState({ checked });
                            }}
                          >
                            <CheckBox
                              name={this.state.startIndex + i}
                              value={!!this.state.checked[this.state.startIndex + i]}
                              onChange={this._handleCheckBox}
                              boxStyle={{
                                height: 24,
                                width: 24,
                                backgroundColor: this.state.checked[this.state.startIndex + i]
                                  ? Constants.system.brand
                                  : "rgba(255, 255, 255, 0.75)",
                              }}
                              style={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                              }}
                            />
                          </div>
                        </React.Fragment>
                      ) : null}
                    </span>
                  </div>
                );
              })}
          </div>
          {footer}
          <input
            ref={(c) => {
              this._ref = c;
            }}
            readOnly
            value={this.state.copyValue}
            css={STYLES_COPY_INPUT}
          />
        </React.Fragment>
      );
    }

    const columns = [
      {
        key: "checkbox",
        name: numChecked ? (
          <div css={STYLES_CANCEL_BOX} onClick={() => this.setState({ checked: {} })}>
            <SVG.Minus height="16px" style={{ color: Constants.system.white }} />
          </div>
        ) : (
          <span />
        ),
        width: "24px",
      },
      {
        key: "name",
        name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Name</div>,
        width: "100%",
      },
      {
        key: "size",
        name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Size</div>,
        width: "104px",
      },
      {
        key: "more",
        name: <span />,
        width: "48px",
      },
    ];
    const rows = this.props.items
      .slice(this.state.startIndex, this.state.startIndex + this.state.viewLimit)
      .map((each, index) => {
        const cid = each.ipfs.replace("/ipfs/", "");
        const isOnNetwork = each.networks && each.networks.includes("FILECOIN");

        return {
          ...each,
          checkbox: (
            <CheckBox
              name={this.state.startIndex + index}
              value={!!this.state.checked[this.state.startIndex + index]}
              onChange={this._handleCheckBox}
              boxStyle={{ height: 16, width: 16 }}
              style={{
                position: "relative",
                right: 3,
                margin: "12px 0",
                opacity: numChecked > 0 || this.state.hover === index ? "100%" : "0%",
              }}
            />
          ),
          name: (
            <FilePreviewBubble url={cid} type={each.type}>
              <div
                css={STYLES_CONTAINER_HOVER}
                onClick={() => this._handleSelect(this.state.startIndex + index)}
              >
                <div css={STYLES_ICON_BOX_HOVER} style={{ paddingLeft: 0, paddingRight: 18 }}>
                  <FileTypeIcon type={each.type} height="24px" />
                </div>
                <div css={STYLES_LINK}>{each.file || each.name}</div>
              </div>
            </FilePreviewBubble>
          ),
          size: <div css={STYLES_VALUE}>{Strings.bytesToSize(each.size)}</div>,
          more: (
            <div
              css={STYLES_ICON_BOX_HOVER}
              onClick={
                this.state.loading[cid]
                  ? () => {}
                  : () =>
                      this.setState({
                        menu: this.state.menu === each.id ? null : each.id,
                      })
              }
            >
              {this.state.loading[cid] ? (
                <LoaderSpinner style={{ height: 24, width: 24 }} />
              ) : (
                <SVG.MoreHorizontal height="24px" />
              )}

              {this.state.menu === each.id ? (
                <Boundary
                  captureResize={true}
                  captureScroll={false}
                  enabled
                  onOutsideRectEvent={this._handleHide}
                >
                  <PopoverNavigation
                    style={{
                      top: "48px",
                      right: "40px",
                    }}
                    navigation={[
                      {
                        text: "Copy CID",
                        onClick: (e) => this._handleCopy(e, cid),
                      },
                      {
                        text: "Copy link",
                        onClick: (e) => this._handleCopy(e, `${Constants.gateways.ipfs}/${cid}`),
                      },
                      {
                        text: "Delete",
                        onClick: (e) => {
                          e.stopPropagation();
                          this.setState({ menu: null }, () => this._handleDelete(cid));
                        },
                      },
                    ]}
                  />
                </Boundary>
              ) : null}
            </div>
          ),
        };
      });

    const data = {
      columns,
      rows,
    };

    return (
      <React.Fragment>
        {header}
        <Table
          data={data}
          rowStyle={{ padding: "10px 16px" }}
          topRowStyle={{ padding: "0px 16px" }}
          onMouseEnter={(i) => this.setState({ hover: i })}
          onMouseLeave={() => this.setState({ hover: null })}
        />
        {footer}
        <input
          ref={(c) => {
            this._ref = c;
          }}
          readOnly
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </React.Fragment>
    );
  }
}
