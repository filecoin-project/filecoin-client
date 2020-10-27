import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";

import SlatePreviewBlocks from "~/components/core/SlatePreviewBlock";

const STYLES_PROFILE = css`
  width: 100%;
`;

const STYLES_PROFILE_INFO = css`
  display: flex;
  margin: 0 auto;
  width: 50%;
  line-height: 1.3;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_INFO = css`
  display: block;
  width: 100%;
  text-align: left;
  margin-bottom: 48px;
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.foreground};
  background-size: cover;
  background-position: 50% 50%;
  width: 80px;
  height: 80px;
  align-item: right;
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
  font-size: ${Constants.typescale.lvl3};
  font-family: ${Constants.font.medium};
  font-weight: 400;
  width: auto;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  align-item: left;
  margin-top: 8px;
  margin-right: 24px;
  word-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl2};
    margin-bottom: 24px;
  }
`;

const STYLES_DESCRIPTION = css`
  font-size: 14px;
  width: 100%;
  word-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
  }
`;

const STYLES_STATS = css`
  font-size: ${Constants.typescale.lvlN1};
  line-height: 1.5;
  margin-top: 24px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const STYLES_STAT = css`
  margin-right: 16px;
  width: 112px;
  flex-shrink: 0;
  margin-bottom: 16px;
  ${"" /* border-left: 1px solid ${Constants.system.darkGray};
padding-left: 12px; */};
`;

const STYLES_BUTTON = css`
  padding: 8px 24px;
  cursor: pointer;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  border: 1px solid ${Constants.system.gray};
  height: 36px;
  border-radius: 4px;

  :hover {
    background-color: ${Constants.system.gray};
    transition: 200ms background-color linear;
  }

  :visited {
    color: ${Constants.system.black};
  }
`;

const STYLES_FLEX = css`
  display: flex;
  margin-bottom: 12px;
  align-items: baseline;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
`;

export default class Profile extends React.Component {
  render() {
    let data = this.props.creator ? this.props.creator : this.props.data;

    let total = 0;
    for (let slate of data.slates) {
      total += slate.data.objects.length;
    }

    return (
      <div css={STYLES_PROFILE}>
        <div css={STYLES_PROFILE_INFO}>
          <div
            css={STYLES_PROFILE_IMAGE}
            style={{ backgroundImage: `url('${data.data.photo}')` }}
          />
          <div css={STYLES_INFO}>
            <div css={STYLES_FLEX}>
              <div css={STYLES_NAME}>{Strings.getPresentationName(data)}</div>
              <a css={STYLES_BUTTON} href={"http://slate.host/_"}>
                Follow
              </a>
            </div>
            {
              data.data.body ? (
                <div css={STYLES_DESCRIPTION}>
                  <ProcessedText text={data.data.body} />
                </div>
              ) : null
              // <div css={STYLES_DESCRIPTION}>
              //   <ProcessedText text={"Joined Slate Month, Year"} />
              // </div>
            }
            <div css={STYLES_STATS}>
              <div css={STYLES_STAT}>
                <div style={{ color: `${Constants.system.grayBlack}` }}>Public data</div>
                <div style={{ fontFamily: `${Constants.font.medium}` }}>{total}</div>
              </div>
              <div css={STYLES_STAT}>
                <div style={{ color: `${Constants.system.grayBlack}` }}>Public slates</div>
                <div style={{ fontFamily: `${Constants.font.medium}` }}>{data.slates.length}</div>
              </div>
              {/* <div css={STYLES_STAT}>
                <div style={{ color: `${Constants.system.grayBlack}` }}>Following slates</div>
                <div style={{ fontFamily: `${Constants.font.semiBold}` }}>0</div>
              </div> */}
            </div>
          </div>
          {this.props.buttons}
        </div>
        {data.slates && data.slates.length ? (
          <SlatePreviewBlocks
            isOwner={this.props.isOwner}
            external={this.props.onAction ? false : true}
            slates={data.slates}
            username={data.username}
            onAction={this.props.onAction}
          />
        ) : null}
        {/* <div>
            {data.slates.map((slate) => {
              if (this.props.onAction) {
                return (
                  <div
                    key={slate.id}
                    onClick={() =>
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: this.props.sceneId,
                        scene: "PUBLIC_SLATE",
                        data: slate,
                      })
                    }
                  >
                    <SlatePreviewBlock
                      slate={slate}
                      username={data.username}
                      isOwner={this.props.isOwner}
                    />
                  </div>
                );
              }
              return (
                <a
                  key={slate.id}
                  href={`/${data.username}/${slate.slatename}`}
                  css={STYLES_LINK}
                >
                  <SlatePreviewBlock external slate={slate} />
                </a>
              );
            })}
          </div> */}
      </div>
    );
  }
}
