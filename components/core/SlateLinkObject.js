import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as Styles from "~/common/styles";
import * as SVG from "~/common/svg";

import UnityFrame from "~/components/core/UnityFrame";
import FontFrame from "~/components/core/FontFrame/index.js";
import MarkdownFrame from "~/components/core/MarkdownFrame";
import LinkLoading from "~/components/core/Link/LinkLoading";
import LinkCard from "~/components/core/Link/LinkCard";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_IFRAME = (theme) => css`
  display: block;
  width: 100%;
  height: 100%;
  ${"" /* NOTE(Amine): lightbackground as fallback when html file doesn't have any */}
  background-color: ${theme.system.grayLight5Light};
`;

export default class SlateLinkObject extends React.Component {
  state = {
    loaded: false,
  };

  render() {
    const url = this.props.file.url;
    const link = this.props.file.data.link;
    const { html, iFrameAllowed } = link;
    if (html) {
      return (
        <div
          style={{ width: "90%", maxHeight: "90%" }}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      );
    } else if (iFrameAllowed) {
      return (
        <div
          style={{ position: "relative", display: "block", width: "100%", height: "100%" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <iframe
            src={url}
            css={STYLES_IFRAME}
            style={{ display: this.state.loaded ? "block" : "none" }}
            onLoad={() => this.setState({ loaded: true })}
          />
          <LinkLoading
            file={this.props.file}
            style={{ display: this.state.loaded ? "none" : "block" }}
          />
        </div>
      );
    } else {
      return <LinkCard file={this.props.file} />;
    }
  }
}
