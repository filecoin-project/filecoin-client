import * as React from "react";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";

import ImageObjectPreview from "./ImageObjectPreview";
import VideoObjectPreview from "./VideoObjectPreview";
import TextObjectPreview from "./TextObjectPreview";
import PdfObjectPreview from "./PdfObjectPreview";
import EpubObjectPreview from "./EpubObjectPreview";
import AudioObjectPreview from "./AudioObjectPreview";
import KeynoteObjectPreview from "./KeynoteObjectPreview";
import DefaultObjectPreview from "./DefaultObjectPreview";
import Object3DPreview from "./3dObjectPreview";
import CodeObjectPreview from "./CodeObjectPreview";
import FontObjectPreview from "./FontObjectPreview";

const ObjectPreview = ({ file, ...props }) => {
  const { type } = file.data;

  const url = Strings.getURLfromCID(file.cid);

  if (Validations.isPreviewableImage(type)) {
    return <ImageObjectPreview file={file} url={url} {...props} />;
  }

  if (type.startsWith("video/")) {
    return <VideoObjectPreview file={file} url={url} {...props} />;
  }

  if (Validations.isPdfType(type)) {
    return <PdfObjectPreview file={file} {...props} />;
  }

  if (type.startsWith("audio/")) {
    return <AudioObjectPreview file={file} {...props} />;
  }

  if (type === "application/epub+zip") {
    return <EpubObjectPreview file={file} {...props} />;
  }

  if (file.filename.endsWith(".key")) {
    return <KeynoteObjectPreview file={file} {...props} />;
  }

  if (Validations.isCodeFile(file.filename)) {
    return <CodeObjectPreview file={file} {...props} />;
  }

  if (Validations.isFontFile(file.filename)) {
    return <FontObjectPreview file={file} url={url} {...props} />;
  }

  if (Validations.isMarkdown(file.filename, type)) {
    return <TextObjectPreview file={file} url={url} {...props} />;
  }

  if (Validations.is3dFile(file.filename)) {
    return <Object3DPreview file={file} {...props} />;
  }

  return <DefaultObjectPreview file={file} {...props} />;
};

export default React.memo(ObjectPreview);
