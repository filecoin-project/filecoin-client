import "isomorphic-fetch";

import * as React from "react";
import * as Styles from "~/common/styles";
import * as Utilities from "~/common/utilities";

import { P } from "~/components/system";
import { css } from "@emotion/react";

import ObjectPreviewPremitive from "./ObjectPreviewPremitive";
import CodePlaceholder from "./placeholders/Code";

const STYLES_CONTAINER = css`
  height: 100%;
`;

const STYLES_TAG = (theme) => css`
  position: absolute;
  text-transform: uppercase;
  background-color: ${theme.system.bgLight};
  bottom: 27%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
`;

export default function CodeObjectPreview({ file, ...props }) {
  const tag = Utilities.getFileExtension(file.filename) || "code";
  return (
    <ObjectPreviewPremitive file={file} {...props}>
      <div css={[Styles.CONTAINER_CENTERED, STYLES_CONTAINER]}>
        <CodePlaceholder />
        <div css={STYLES_TAG}>
          <P variant="para-03">{tag}</P>
        </div>
      </div>
    </ObjectPreviewPremitive>
  );
}