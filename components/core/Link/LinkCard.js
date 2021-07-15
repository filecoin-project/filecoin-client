import * as System from "~/components/system";
import * as Styles from "~/common/styles";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import LinkTag from "~/components/core/Link/LinkTag";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { css } from "@emotion/react";

const STYLES_CARD = css`
  margin: 24px;
  ${"" /* height: 100%;
  width: 100%;
  max-height: 448px;
  max-width: 600px; */}
  height: 448px;
  width: 600px;
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${Constants.shadow.large};
  background-color: ${Constants.semantic.bgGrayLight};
`;

const STYLES_IMAGE_CONTAINER = css`
  width: 100%;
  height: 100%;
  min-height: 60%;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const STYLES_TEXT_BOX = css`
  max-height: 40%;
  padding: 16px;
  color: ${Constants.system.black};
`;

const STYLES_NAME = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
  margin-bottom: 4px;
  color: ${Constants.system.black};
`;

const STYLES_BODY = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
  margin-bottom: 8px;
  color: ${Constants.semantic.textGrayDark};
`;

export default function LinkCard({ file }) {
  const url = file.url;
  const link = file.data.link;
  const { image, name, body } = link;

  return (
    <a css={Styles.LINK} href={url} target="_blank" onClick={(e) => e.stopPropagation()}>
      <div css={[Styles.VERTICAL_CONTAINER, STYLES_CARD]}>
        <div css={STYLES_IMAGE_CONTAINER}>
          <img src={image} style={{ width: "100%" }} />
        </div>
        <div css={[Styles.VERTICAL_CONTAINER, STYLES_TEXT_BOX]}>
          <div css={STYLES_NAME}>
            <System.H3>{name}</System.H3>
          </div>
          <div css={STYLES_BODY}>
            <System.P1>{body}</System.P1>
          </div>
          <LinkTag url={url} style={{ color: Constants.semantic.textGray }} />
        </div>
      </div>
    </a>
  );
  {
    /* <div
      css={Styles.VERTICAL_CONTAINER_CENTERED}
      style={{ backgroundColor: Constants.semantic.bgLight, height: "100%" }}
    >
      <div css={STYLES_IMAGE_CONTAINER}>
        <img src={image} style={{ width: "100%" }} />
      </div>
      <div css={Styles.VERTICAL_CONTAINER_CENTERED}>
        <System.H3 style={{ marginBottom: 16, color: Constants.semantic.textBlack }}>
          {name}
        </System.H3>
        <LinkTag url={url} style={{ marginBottom: 16 }} />
        <LoaderSpinner style={{ height: 24, width: 24 }} />
      </div>
    </div> */
  }
}
