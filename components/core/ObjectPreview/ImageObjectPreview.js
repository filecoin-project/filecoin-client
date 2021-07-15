import * as React from "react";
import * as Styles from "~/common/styles";
import * as Strings from "~/common/strings";

import { AspectRatio } from "~/components/system";
import { useInView } from "~/common/hooks";
import { Blurhash } from "react-blurhash";
import { isBlurhashValid } from "blurhash";

import { css } from "@emotion/react";
import ObjectPreviewPrimitive from "./ObjectPreviewPrimitive";

const STYLES_PLACEHOLDER_ABSOLUTE = css`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
`;
const STYLES_FLUID_CONTAINER = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const STYLES_IMAGE = css`
  object-fit: cover;
`;

const ImagePlaceholder = ({ blurhash }) => (
  <div css={STYLES_PLACEHOLDER_ABSOLUTE}>
    <div css={[Styles.CONTAINER_CENTERED, STYLES_FLUID_CONTAINER]}>
      <AspectRatio ratio={186 / 302}>
        <div>
          <Blurhash
            hash={blurhash}
            height="100%"
            width="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      </AspectRatio>
    </div>
  </div>
);

export default function ImageObjectPreview({ url, file, ...props }) {
  const previewerRef = React.useRef();
  const [isLoading, setLoading] = React.useState(true);
  const handleOnLoaded = () => setLoading(false);

  const { isInView } = useInView({
    ref: previewerRef,
  });

  const { type, coverImage } = file.data;
  const tag = type.split("/")[1];

  const blurhash = React.useMemo(() => {
    return file.data.blurhash && isBlurhashValid(file.data.blurhash)
      ? file.data.blurhash
      : coverImage?.data.blurhash && isBlurhashValid(coverImage?.data.blurhash)
      ? coverImage?.data.blurhash
      : null;
  }, [file]);

  const shouldShowPlaceholder = isLoading && blurhash;

  const imageUrl = coverImage ? Strings.getURLfromCID(coverImage?.cid) : url;

  return (
    <ObjectPreviewPrimitive file={file} tag={tag} isImage {...props}>
      <div ref={previewerRef} css={[Styles.CONTAINER_CENTERED, STYLES_FLUID_CONTAINER]}>
        {isInView && (
          <AspectRatio ratio={186 / 302}>
            {/** NOTE(amine): if it's loaded */}
            <img
              css={STYLES_IMAGE}
              src={imageUrl}
              alt={`${file.name} preview`}
              onLoad={handleOnLoaded}
            />
          </AspectRatio>
        )}
        {shouldShowPlaceholder && <ImagePlaceholder blurhash={blurhash} />}
      </div>
    </ObjectPreviewPrimitive>
  );
}
