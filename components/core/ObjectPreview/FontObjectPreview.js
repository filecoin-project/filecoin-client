import "isomorphic-fetch";

import * as React from "react";
import * as Styles from "~/common/styles";
import * as Utilities from "~/common/utilities";

import { css } from "@emotion/react";

import ObjectPreviewPrimitive from "./ObjectPreviewPrimitive";
import { useFont } from "~/components/core/FontFrame/hooks";

const STYLES_TEXT_PREVIEW = (theme) => css`
  position: relative;
  height: 100%;
  margin: 8px;
  background-color: ${theme.system.white};
  border-radius: 8px;
  box-shadow: ${theme.shadow.large};
`;

const STYLES_LETTER = (theme) => css`
  transform: translateY(-25%);
  overflow: hidden;
  font-size: ${theme.typescale.lvl8};
`;

export default function FontObjectPreview({ file, ...props }) {
  const { fontName } = useFont({ cid: file.cid }, [file.cid]);

  const tag = Utilities.getFileExtension(file.filename) || "font";
  return (
    <ObjectPreviewPrimitive tag={tag} file={file} {...props}>
      <div css={[Styles.CONTAINER_CENTERED, STYLES_TEXT_PREVIEW]}>
        <div style={{ fontFamily: fontName }}>
          <div css={STYLES_LETTER}>Aa</div>
        </div>
      </div>
    </ObjectPreviewPrimitive>
  );
}
