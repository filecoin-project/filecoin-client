import * as React from "react";
import * as Styles from "~/common/styles";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";

import { css } from "@emotion/react";
import { H5 } from "~/components/system/components/Typography";

import ObjectPlaceholder from "~/components/core/ObjectPreview/placeholders";

const STYLES_VIEW_MORE_CONTAINER = (theme) => css`
  background-color: ${theme.semantic.bgLight};
  border: none;
  padding: 8px;
  border-radius: 8px;
  margin-top: 24px;
`;

const STYLES_SHOW_MORE_PREVIEWS = (theme) => css`
  overflow: hidden;
  border-radius: 4px;
  height: 24px;
  width: 24px;
  background-color: ${theme.system.grayLight5};
  & > img {
    width: 100%;
    height: 100%;
  }
`;

const getImageCover = (item) => {
  const coverImage = item?.data?.coverImage;
  const imageUrl = Strings.getURLfromCID(coverImage ? coverImage?.cid : item.cid);
  return imageUrl;
};

export default function ViewMoreContent({ items, children, ...props }) {
  return (
    <button css={[Styles.HOVERABLE, STYLES_VIEW_MORE_CONTAINER]} {...props}>
      <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
        {items && (
          <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
            {items?.slice(0, 3).map((file) => {
              const isImageFile =
                Validations.isPreviewableImage(file?.data?.type) || file?.data?.coverImage;
              return (
                <div
                  key={file.id}
                  style={{ marginLeft: 2 }}
                  css={[STYLES_SHOW_MORE_PREVIEWS, Styles.CONTAINER_CENTERED]}
                >
                  {isImageFile ? (
                    <img src={getImageCover(file)} alt="File Preview" />
                  ) : (
                    <ObjectPlaceholder ratio={0.4} file={file} />
                  )}
                </div>
              );
            })}
          </div>
        )}
        <H5 style={{ marginLeft: items ? 12 : 0 }} color="textGrayDark">
          {children}
        </H5>
      </div>
    </button>
  );
}
