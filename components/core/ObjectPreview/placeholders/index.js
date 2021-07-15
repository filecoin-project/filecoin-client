import * as React from "react";
import * as Validations from "~/common/validations";
import * as Utilities from "~/common/utilities";
import * as Typography from "~/components/system/components/Typography";

import { css } from "@emotion/react";

import PdfPlaceholder from "./PDF";
import AudioPlaceholder from "./Audio";
import CodePlaceholder from "./Code";
import EpubPlaceholder from "./EPUB";
import TextPlaceholder from "./Text";
import KeynotePlaceholder from "./Keynote";
import Object3DPlaceholder from "./3D";
import FilePlaceholder from "./File";
import VideoPlaceholder from "./Video";

const STYLES_PLACEHOLDER_CONTAINER = (theme) => css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 86px;
  min-width: 64px;
  border-radius: 4px;
  background-color: ${theme.semantic.bgLight};
`;

const STYLES_TAG = (theme) => css`
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  text-transform: uppercase;
  border: 1px solid ${theme.system.grayLight5};
  background-color: ${theme.semantic.bgLight};
  padding: 2px 8px;
  border-radius: 4px;
`;

const PlaceholderPrimitive = ({ file, ratio }) => {
  const { type } = file.data;

  if (type.startsWith("video/")) {
    return <VideoPlaceholder ratio={ratio} />;
  }

  if (Validations.isPdfType(type)) {
    return <PdfPlaceholder ratio={ratio} />;
  }

  if (type.startsWith("audio/")) {
    return <AudioPlaceholder ratio={ratio} />;
  }

  if (type === "application/epub+zip") {
    return <EpubPlaceholder ratio={ratio} />;
  }

  if (file.filename.endsWith(".key")) {
    return <KeynotePlaceholder ratio={ratio} />;
  }

  if (Validations.isCodeFile(file.filename)) {
    return <CodePlaceholder ratio={ratio} />;
  }

  if (Validations.isMarkdown(file.filename, type)) {
    return <TextPlaceholder ratio={ratio} />;
  }

  if (Validations.is3dFile(file.filename)) {
    return <Object3DPlaceholder ratio={ratio} />;
  }

  return <FilePlaceholder ratio={ratio} />;
};

export default function Placeholder({ file, containerCss, ratio, showTag }) {
  const { type } = file.data;

  const tag = React.useMemo(() => {
    if (!showTag) return false;
    if (type.startsWith("video/")) return type.split("/")[1];
    if (Validations.isPdfType(type)) return "pdf";
    if (type.startsWith("audio/")) return Utilities.getFileExtension(file.filename) || "audio";
    if (type === "application/epub+zip") return "epub";
    if (file.filename.endsWith(".key")) return "keynote";
    if (Validations.isCodeFile(file.filename))
      return Utilities.getFileExtension(file.filename) || "code";
    if (Validations.isFontFile(file.filename))
      return Utilities.getFileExtension(file.filename) || "font";
    if (Validations.isMarkdown(file.filename, type))
      return Utilities.getFileExtension(file.filename) || "text";
    if (Validations.is3dFile(file.filename)) return "3d";
    return "file";
  }, [file]);

  return (
    <div css={[STYLES_PLACEHOLDER_CONTAINER, containerCss]}>
      {showTag && (
        <div css={STYLES_TAG}>
          <Typography.P3>{tag}</Typography.P3>
        </div>
      )}
      <PlaceholderPrimitive ratio={ratio} file={file} />
    </div>
  );
}
