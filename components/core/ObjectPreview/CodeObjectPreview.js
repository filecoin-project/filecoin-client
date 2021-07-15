import "isomorphic-fetch";

import * as React from "react";
import * as Styles from "~/common/styles";
import * as Utilities from "~/common/utilities";

import { P3 } from "~/components/system";
import { css } from "@emotion/react";

import ObjectPreviewPrimitive from "./ObjectPreviewPrimitive";
import CodePlaceholder from "./placeholders/Code";

const STYLES_CONTAINER = css`
  height: 100%;
`;

const STYLES_TAG = (theme) => css`
  position: absolute;
  text-transform: uppercase;
  background-color: ${theme.semantic.bgLight};
  bottom: 27%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
`;

export default function CodeObjectPreview({ file, ...props }) {
  const tag = Utilities.getFileExtension(file.filename) || "code";
  return (
    <ObjectPreviewPrimitive file={file} {...props}>
      <div css={[Styles.CONTAINER_CENTERED, STYLES_CONTAINER]}>
        <CodePlaceholder />
        <div css={STYLES_TAG}>
          <P3>{tag}</P3>
        </div>
      </div>
    </ObjectPreviewPrimitive>
  );
}
