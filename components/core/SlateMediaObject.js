import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";
import * as Strings from "~/common/strings";

import UnityFrame from "~/components/core/UnityFrame";
import FontFrame from "~/components/core/FontFrame/index.js";
import MarkdownFrame from "~/components/core/MarkdownFrame";
import { endsWithAny } from "~/common/utilities";

import { css } from "@emotion/react";

const STYLES_FAILURE = css`
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 88px;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 10%;
  height: 100%;
`;

const STYLES_OBJECT = css`
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 10%;
  height: 100%;
  user-select: none;
`;

const STYLES_ASSET = css`
  user-select: none;
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const STYLES_IMAGE = css`
  user-select: none;
  display: block;
  max-width: 100%;
  max-height: 100%;
`;

const STYLES_IFRAME = (theme) => css`
  display: block;
  width: 100%;
  height: 100%;
  // NOTE(Amine): lightbackground as fallback when html file doesn't have any
  background-color: ${theme.system.wallLight};
`;

const typeMap = {
  "video/quicktime": "video/mp4",
};

export default class SlateMediaObject extends React.Component {
  openLink = (url) => {
    window.open(url, "_blank");
  };

  componentDidMount() {
    if (this.props.isMobile) {
      const file = this.props.file;
      if (file.data.type && file.data.type.startsWith("application/pdf")) {
        const url = Strings.getURLfromCID(file.cid);
        this.openLink(url);
      }
    }
  }

  render() {
    const { file, isMobile } = this.props;
    const url = file?.dataURL || Strings.getURLfromCID(file.cid);
    const type = file.data.type || "";
    const playType = typeMap[type] ? typeMap[type] : type;

    let element = <div css={STYLES_FAILURE}>No Preview</div>;

    if (type.startsWith("application/pdf")) {
      return (
        <>
          {isMobile ? (
            <a href={url} target="_blank">
              <div css={STYLES_FAILURE}>Tap to open PDF in new tab</div>
            </a>
          ) : (
            <object
              css={STYLES_OBJECT}
              style={{ width: "calc(100% - 64px)" }}
              data={url}
              type={type}
              key={url}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          )}
        </>
      );
    }

    if (type.startsWith("video/")) {
      return (
        <video
          playsInline
          controls
          autoPlay={false}
          name="media"
          type={playType}
          css={STYLES_OBJECT}
          key={url}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <source src={url} type={playType} />
          {/** NOTE(amine): fallback if video type isn't supported (example .mov) */}
          <source src={url} type="video/mp4" />
        </video>
      );
    }

    if (type.startsWith("audio/")) {
      return (
        <div css={STYLES_ASSET}>
          <audio
            controls
            name="media"
            key={url}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <source src={url} type={playType} />
          </audio>
        </div>
      );
    }

    if (type.startsWith("text/html")) {
      return <iframe src={url} css={STYLES_IFRAME} />;
    }

    if (Validations.isFontFile(file.filename)) {
      return (
        <FontFrame
          name={file.data.name || file.filename}
          cid={file.cid}
          fallback={element}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      );
    }

    if (Validations.isMarkdown(file.filename, type)) {
      return <MarkdownFrame date={file.createdAt} url={url} />;
    }

    if (Validations.isPreviewableImage(type)) {
      return (
        <div css={STYLES_ASSET}>
          <img
            css={STYLES_IMAGE}
            src={url}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      );
    }

    // TODO(jim): We will need to revisit this later.
    if (type.startsWith("application/unity")) {
      const { config, loader } = file.data.unity;

      return <UnityFrame url={url} unityGameConfig={config} unityGameLoader={loader} key={url} />;
    }

    return element;
  }
}
