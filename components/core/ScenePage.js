import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";

const STYLES_SCENE = css`
  flex-shrink: 0;
  width: 100%;
  padding: 128px 32px 128px 32px;
  display: block;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 88px 24px 128px 24px;
  }
`;

export const ScenePage = (props) => (
  <div css={STYLES_SCENE} {...props}>
    <div style={props.contentstyle}>{props.children}</div>
  </div>
);

export default ScenePage;
