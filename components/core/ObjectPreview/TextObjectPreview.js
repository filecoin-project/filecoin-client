import "isomorphic-fetch";

import * as React from "react";
import * as Styles from "~/common/styles";
import * as Utilities from "~/common/utilities";

import { P3 } from "~/components/system";
import { css } from "@emotion/react";

import ObjectPreviewPrimitive from "./ObjectPreviewPrimitive";
import TextPlaceholder from "./placeholders/Text";

const STYLES_CONTAINER = css`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const STYLES_TAG = (theme) => css`
  position: absolute;
  text-transform: uppercase;
  background-color: ${theme.semantic.bgLight};
  bottom: 26%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
`;

const STYLES_TEXT_PREVIEW = (theme) =>
  css({
    height: "100%",
    width: "100%",
    margin: "8px",
    backgroundColor: "#FFF",
    borderRadius: "8px",
    boxShadow: theme.shadow.large,
    padding: "16px",
  });

export default function TextObjectPreview({ url, file, ...props }) {
  const [{ content, error }, setState] = React.useState({ content: "", error: undefined });

  React.useLayoutEffect(() => {
    fetch(url)
      .then(async (res) => {
        const content = await res.text();
        setState({ content });
      })
      .catch((e) => {
        setState({ error: e });
      });
  }, []);

  const tag = Utilities.getFileExtension(file.filename) || "text";

  return (
    <ObjectPreviewPrimitive tag={!error && tag} file={file} {...props}>
      <div css={[STYLES_CONTAINER, error && Styles.CONTAINER_CENTERED]}>
        {error ? (
          <>
            <TextPlaceholder />
            <div css={STYLES_TAG}>
              <P3>{tag}</P3>
            </div>
          </>
        ) : (
          <div css={STYLES_TEXT_PREVIEW}>
            <P3>{content}</P3>
          </div>
        )}
      </div>
    </ObjectPreviewPrimitive>
  );
}
