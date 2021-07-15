import "isomorphic-fetch";

import * as React from "react";
import * as Styles from "~/common/styles";

import { P3 } from "~/components/system";
import { css } from "@emotion/react";

import ObjectPreviewPrimitive from "./ObjectPreviewPrimitive";
import EpubPlaceholder from "./placeholders/EPUB";

const STYLES_CONTAINER = css`
  height: 100%;
`;

const STYLES_TAG = (theme) => css`
  position: absolute;
  text-transform: uppercase;
  background-color: ${theme.semantic.bgLight};
  bottom: 32%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
`;

export default function EpubObjectPreview(props) {
  return (
    <ObjectPreviewPrimitive {...props}>
      <div css={[Styles.CONTAINER_CENTERED, STYLES_CONTAINER]}>
        <EpubPlaceholder />
        <div css={STYLES_TAG}>
          <P3>EPUB</P3>
        </div>
      </div>
    </ObjectPreviewPrimitive>
  );
}
