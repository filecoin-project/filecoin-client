import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";

import { css } from "@emotion/core";
import { ProcessedText } from "~/components/system/components/Typography";

import SlatePreviewBlocks from "~/components/core/SlatePreviewBlock";
import SlatePreviewBlocksExternal from "~/components/core/SlatePreviewBlockExternal";

const STYLES_PROFILE_INTERNAL = css`
  width: 100%;
  padding: 64px 0px 0px 0px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_PROFILE = css`
  width: 100%;
  padding: 64px 64px 0px 64px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex-shrink: 0;
  display: block;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 80px 24px 0px 24px;
  }
`;

const STYLES_PROFILE_INFO = css`
  display: flex;
  line-height: 1.3;
  width: 50%;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
  }
`;

const STYLES_PROFILE_INFO_INTERNAL = css`
  display: flex;
  line-height: 1.3;
  margin: 0 auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_INFO_INTERNAL = css`
  display: block;
  width: 100%;
  max-width: calc(100% - 104px);
  text-align: left;
  margin-bottom: 48px;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: calc(100% - 64px);
  }
`;

const STYLES_INFO = css`
  display: block;
  width: 100%;
  max-width: calc(100% - 224px);
  text-align: left;
  margin-bottom: 48px;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    max-width: calc(100% - 80px);
  }
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 4px;
  margin-right: 24px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 64px;
    height: 64px;
    margin-right: 16px;
  }
`;

const STYLES_NAME = css`
  font-size: ${Constants.typescale.lvl4};
  font-family: ${Constants.font.medium};
  max-width: 100%;
  font-weight: 400;
  margin: 8px 24px 8px 0;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-bottom: 8px;
    margin-right: 0;
  }
`;

const STYLES_NAME_INTERNAL = css`
  font-size: ${Constants.typescale.lvl3};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  max-width: 100%;
  margin-top: 8px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_DESCRIPTION = css`
  font-size: ${Constants.typescale.lvl1};
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
  }
`;

const STYLES_STATS = css`
  font-size: ${Constants.typescale.lvl0};
  line-height: 1.5;
  margin: 12px 0 24px 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const STYLES_STAT = css`
  margin-right: 16px;
  width: 112px;
  flex-shrink: 0;
`;

const STYLES_BUTTON = css`
  padding: 10px 24px;
  cursor: pointer;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  height: 40px;
  width: 160px;
  border-radius: 4px;
  color: ${Constants.system.white};
  background-color: ${Constants.system.brand};

  :visited {
    color: ${Constants.system.white};
  }
`;

const STYLES_FLEX = css`
  display: flex;
  margin-bottom: 12px;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: ${Constants.sizes.tablet}px) {
    display: block;
  }
`;

const STYLES_EXPLORE = css`
  padding-top: 8px;
  margin: 200px auto 24px auto;
  font-size: ${Constants.typescale.lvl2};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  color: ${Constants.system.black};
`;

export default class Profile extends React.Component {
  state = {
    exploreSlates: [],
  };

  componentDidMount = async () => {
    let exploreSlates = [];
    let response1 = await Actions.getSlateById({ id: "857ad84d-7eff-4861-a988-65c84b62fc23" });
    let response2 = await Actions.getSlateById({ id: "81fa0b39-0e96-4c7f-8587-38468bb67cb3" });
    let response3 = await Actions.getSlateById({ id: "c4e8dad7-4ba0-4f25-a92a-c73ef5522d29" });
    let response4 = await Actions.getSlateById({ id: "857ad84d-7eff-4861-a988-65c84b62fc23" });
    let response5 = await Actions.getSlateById({ id: "81fa0b39-0e96-4c7f-8587-38468bb67cb3" });
    let response6 = await Actions.getSlateById({ id: "c4e8dad7-4ba0-4f25-a92a-c73ef5522d29" });

    // let response1 = await Actions.getSlateById({ id: "d2861ac4-fc41-4c07-8f21-d0bf06be364c" });
    // let response2 = await Actions.getSlateById({ id: "9c2c458c-d92a-4e81-a4b6-bf6ab4607470" });
    // let response3 = await Actions.getSlateById({ id: "7f461144-0647-43d7-8294-788b37ae5979" });
    // let response4 = await Actions.getSlateById({ id: "f72c2594-b8ac-41f6-91e0-b2da6788ae23" });
    // let response5 = await Actions.getSlateById({ id: "a0d6e2f2-564d-47ed-bf56-13c42634703d" });
    // let response6 = await Actions.getSlateById({ id: "0ba92c73-92e7-4b00-900e-afae4856c9ea" });
    exploreSlates.push(
      response1.slate,
      response2.slate,
      response3.slate,
      response4.slate,
      response5.slate,
      response6.slate
    );
    this.setState({ exploreSlates });
  };

  render() {
    let data = this.props.creator ? this.props.creator : this.props.data;
    console.log(this.state.exploreSlates);

    let total = 0;
    for (let slate of data.slates) {
      total += slate.data.objects.length;
    }
    return (
      <div>
        {this.props.onAction ? (
          <div css={STYLES_PROFILE_INFO_INTERNAL}>
            <div
              css={STYLES_PROFILE_IMAGE}
              style={{ backgroundImage: `url('${data.data.photo}')` }}
            />
            <div css={STYLES_INFO_INTERNAL}>
              <div css={STYLES_FLEX}>
                <div css={STYLES_NAME_INTERNAL}>{Strings.getPresentationName(data)}</div>
                <div>{this.props.buttons}</div>
              </div>
              <div css={STYLES_STATS}>
                <div css={STYLES_STAT}>
                  <div style={{ color: `${Constants.system.darkGray}` }}>Public data</div>
                  <div style={{ fontFamily: `${Constants.font.medium}` }}>{total}</div>
                </div>
                <div css={STYLES_STAT}>
                  <div style={{ color: `${Constants.system.darkGray}` }}>Public slates</div>
                  <div style={{ fontFamily: `${Constants.font.medium}` }}>{data.slates.length}</div>
                </div>
              </div>

              {data.data.body ? (
                <div css={STYLES_DESCRIPTION}>
                  <ProcessedText text={data.data.body} />
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div css={STYLES_PROFILE}>
            <div css={STYLES_PROFILE_INFO}>
              <div
                css={STYLES_PROFILE_IMAGE}
                style={{ backgroundImage: `url('${data.data.photo}')` }}
              />
              <div css={STYLES_INFO}>
                <div css={STYLES_FLEX}>
                  <div css={STYLES_NAME}>{Strings.getPresentationName(data)}</div>
                  <div css={STYLES_BUTTON}>
                    <a css={STYLES_BUTTON} href={"http://slate.host/_"}>
                      Follow
                    </a>
                  </div>
                </div>
                <div css={STYLES_STATS}>
                  <div css={STYLES_STAT}>
                    <div style={{ color: `${Constants.system.darkGray}` }}>Public data</div>
                    <div style={{ fontFamily: `${Constants.font.medium}` }}>{total}</div>
                  </div>
                  <div css={STYLES_STAT}>
                    <div style={{ color: `${Constants.system.darkGray}` }}>Public slates</div>
                    <div style={{ fontFamily: `${Constants.font.medium}` }}>
                      {data.slates.length}
                    </div>
                  </div>
                </div>
                {data.data.body ? (
                  <div css={STYLES_DESCRIPTION} style={{ marginBottom: 16 }}>
                    <ProcessedText text={data.data.body} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
        {this.props.onAction ? (
          <div css={STYLES_PROFILE_INTERNAL} style={{ paddingTop: 0 }}>
            {data.slates && data.slates.length ? (
              <SlatePreviewBlocks
                isOwner={this.props.isOwner}
                external={this.props.onAction ? false : true}
                slates={data.slates}
                username={data.username}
                onAction={this.props.onAction}
              />
            ) : null}
          </div>
        ) : (
          <div css={STYLES_PROFILE} style={{ paddingTop: 0 }}>
            {data.slates && data.slates.length ? (
              <SlatePreviewBlocksExternal
                isOwner={this.props.isOwner}
                slates={data.slates}
                username={data.username}
                onAction={this.props.onAction}
              />
            ) : (
              <div>
                {" "}
                <p style={{ color: `${Constants.system.darkGray}` }}>
                  No publicly shared slates from @{data.username}.
                </p>
                <div css={STYLES_EXPLORE}>Explore slates</div>
                <SlatePreviewBlocksExternal slates={this.state.exploreSlates} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
