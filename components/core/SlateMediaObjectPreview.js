import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Utilities from "~/common/utilities";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { FileTypeIcon } from "~/components/core/FileTypeIcon";
import { Blurhash } from "react-blurhash";
import { isBlurhashValid } from "blurhash";

import FontObjectPreview from "~/components/core/FontFrame/Views/FontObjectPreview";

const STYLES_IMAGE_CONTAINER = css`
  background-color: ${Constants.system.white};
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    border-radius: 8px;
  }
`;

const STYLES_IMAGE = css`
  background-color: ${Constants.system.white};
  display: block;
  pointer-events: none;
  transition: 200ms ease all;
  max-width: 100%;
  max-height: 100%;
`;

const STYLES_ENTITY = css`
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid ${Constants.semantic.bgLight};
  background-color: ${Constants.system.white};
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: none;
  padding: 8px;
  font-size: 0.9rem;
`;

const STYLES_TITLE = css`
  width: calc(100% - 32px);
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${Constants.semantic.textGray};
  font-size: 16px;
  font-family: ${Constants.font.medium};
`;

const STYLES_BLUR_CONTAINER = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default class SlateMediaObjectPreview extends React.Component {
  static defaultProps = {
    charCap: 70,
  };

  state = {
    showImage: false,
    error: false,
  };

  componentDidMount = () => {
    this.setImage();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.coverImage?.cid !== this.props.coverImage?.cid) {
      this.setImage();
    }
  };

  setImage = () => {
    let type = this.props.file.data?.type;
    let coverImage = this.props.file.data?.coverImage;
    let url;
    if (type && Validations.isPreviewableImage(type)) {
      url = Strings.getURLfromCID(this.props.file.cid);
    } else if (coverImage) {
      url = Strings.getURLfromCID(coverImage.cid);
    }
    if (url) {
      const img = new Image();
      img.onload = () => this.setState({ showImage: true });
      img.src = url;
    }
  };

  render() {
    const file = this.props.file;
    const type = this.props.file.data?.type;
    const coverImage = this.props.file.data?.coverImage;

    let url = Utilities.getImageUrlIfExists(file);

    if (url) {
      const blurhash =
        file.data.blurhash && isBlurhashValid(file.data?.blurhash)
          ? file.data?.blurhash
          : coverImage?.data.blurhash && isBlurhashValid(coverImage?.data.blurhash)
          ? coverImage?.data.blurhash
          : null;
      if (this.state.error) {
        return (
          <div
            css={STYLES_ENTITY}
            style={{
              ...this.props.imageStyle,
              backgroundColor: Constants.semantic.bgLight,
            }}
          >
            <SVG.FileNotFound height="24px" />
            {this.props.iconOnly ? null : <div css={STYLES_TITLE}>File not found</div>}
          </div>
        );
      }
      if (this.props.centeredImage) {
        return (
          <React.Fragment>
            {this.state.showImage || !blurhash ? (
              <div
                css={STYLES_IMAGE_CONTAINER}
                style={{
                  backgroundImage: `url(${url})`,
                  ...this.props.imageStyle,
                }}
              />
            ) : (
              <div css={STYLES_BLUR_CONTAINER}>
                <Blurhash
                  hash={blurhash}
                  height="100%"
                  width="100%"
                  style={this.props.imageStyle}
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
                />
              </div>
            )}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          {this.state.showImage || !blurhash ? (
            <img
              css={STYLES_IMAGE}
              style={{
                ...this.props.imageStyle,
              }}
              src={url}
            />
          ) : (
            <Blurhash
              hash={blurhash}
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          )}
        </React.Fragment>
      );
    }

    let name = (file.data?.name || file.filename || "").substring(0, this.charCap);
    let extension = Strings.getFileExtension(file.filename);
    if (extension && extension.length) {
      extension = extension.toUpperCase();
    }
    let element = (
      <FileTypeIcon
        file={file}
        height={this.props.previewPanel ? "26px" : "20px"}
        style={{ color: Constants.semantic.textGray }}
      />
    );

    if (Validations.isFontFile(file.filename)) {
      return (
        <article
          css={STYLES_ENTITY}
          style={{
            ...this.props.style,
            border: this.props.previewPanel ? `1px solid ${Constants.semantic.bgLight}` : "auto",
          }}
        >
          <FontObjectPreview
            cid={file.cid}
            fallback={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src="https://slate.textile.io/ipfs/bafkreib5mnvds3cpe7ot7ibrakmrnja2hv5tast3giiarpl5nun7jpdt5m"
                  alt=""
                  height={this.props.previewPanel ? "80" : "64"}
                />
                <div style={{ position: "absolute" }}>{element}</div>
              </div>
            }
          />
          {name && !this.props.iconOnly && !this.props.previewPanel ? (
            <div style={{ position: "absolute", bottom: 16, left: 16, width: "inherit" }}>
              <div css={STYLES_TITLE}>{name}</div>
              {extension ? (
                <div
                  css={STYLES_TITLE}
                  style={{
                    fontSize: 12,
                    color: Constants.semantic.textGrayLight,
                    fontFamily: Constants.font.medium,
                  }}
                >
                  {extension}
                </div>
              ) : null}
            </div>
          ) : null}
        </article>
      );
    }

    return (
      <article
        css={STYLES_ENTITY}
        style={{
          ...this.props.style,
          border: this.props.previewPanel ? `1px solid ${Constants.semantic.bgLight}` : "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://slate.textile.io/ipfs/bafkreib5mnvds3cpe7ot7ibrakmrnja2hv5tast3giiarpl5nun7jpdt5m"
            alt=""
            height={this.props.previewPanel ? "80" : "64"}
          />
          <div style={{ position: "absolute" }}>{element}</div>
        </div>
        {!this.props.iconOnly && !this.props.previewPanel ? (
          <div style={{ position: "absolute", bottom: 16, left: 16, width: "inherit" }}>
            <div css={STYLES_TITLE}>{name}</div>
            {extension ? (
              <div
                css={STYLES_TITLE}
                style={{
                  fontSize: 12,
                  color: Constants.semantic.textGrayLight,
                  fontFamily: Constants.font.medium,
                }}
              >
                {extension}
              </div>
            ) : null}
          </div>
        ) : null}
      </article>
    );
  }
}
