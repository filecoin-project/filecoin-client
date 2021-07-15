import "isomorphic-fetch";

import * as React from "react";
import * as Styles from "~/common/styles";

import { P3 } from "~/components/system";
import { css } from "@emotion/react";

import ObjectPreviewPrimitive from "./ObjectPreviewPrimitive";
import VideoPlaceholder from "./placeholders/Video";

const STYLES_CONTAINER = css`
  height: 100%;
`;

const STYLES_TAG = (theme) => css`
  position: absolute;
  text-transform: uppercase;
  background-color: ${theme.semantic.bgLight};
  bottom: 31.5%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
`;

export default function VideoObjectPreview({ file, ...props }) {
  const { type } = file.data;
  const tag = type.split("/")[1];
  return (
    <ObjectPreviewPrimitive file={file} {...props}>
      <div css={[Styles.CONTAINER_CENTERED, STYLES_CONTAINER]}>
        <VideoPlaceholder />
        <div css={STYLES_TAG}>
          <P3>{tag}</P3>
        </div>
      </div>
    </ObjectPreviewPrimitive>
  );
}
