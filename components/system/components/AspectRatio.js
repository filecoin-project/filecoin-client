import * as React from "react";
import { css } from "@emotion/react";
const STYLES_WRAPPER = css`
  position: relative;
  width: 100%;
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

const GET_ASPECT_STYLES = ({ minWidth, maxWith, ratio }) => css`
  width: 100%;
  height: 0;
  padding-bottom: ${ratio * 100}%;
  min-width: ${minWidth};
  max-width: ${maxWith};
`;

export const AspectRatio = ({ children, minWidth, maxWith, ratio = 4 / 3, css, ...props }) => {
  const aspectStyles = React.useMemo(() => {
    return GET_ASPECT_STYLES({ minWidth, maxWith, ratio });
  }, [minWidth, maxWith, ratio]);

  //NOTE(amine): enforce single child
  const child = React.Children.only(children);

  return (
    <div css={[STYLES_WRAPPER, aspectStyles, css]} {...props}>
      {child}
    </div>
  );
};
