import * as React from "react";
import * as Constants from "~/common/constants";
import * as Styles from "~/common/styles";

import { css } from "@emotion/react";
import { motion, useAnimation } from "framer-motion";

const STYLES_BUTTON_HOVER = (theme) => css`
  display: flex;
  :hover path {
    stroke: ${theme.system.blue};
  }
`;

const animate = async (controls) => {
  await controls.start({ scale: 1.3, rotateY: 180, fill: "rgba(0, 132, 255, 1)" });
  await controls.start({ scale: 1 });
  controls.set({ rotateY: 0 });
};

const useMounted = (callback, depedencies) => {
  const mountedRef = React.useRef(false);
  React.useLayoutEffect(() => {
    if (mountedRef.current && callback) {
      callback();
    }
    mountedRef.current = true;
  }, depedencies);
};

export default function LikeButton({ onClick, isLiked, ...props }) {
  const controls = useAnimation();

  useMounted(() => {
    if (isLiked) {
      animate(controls);
      return;
    }
    controls.start({ fill: "#fff", scale: 1 });
  }, [isLiked]);

  return (
    <button
      css={[Styles.BUTTON_RESET, STYLES_BUTTON_HOVER]}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <motion.svg
        width={20}
        height={20}
        initial={{ fill: isLiked ? "rgba(0, 132, 255, 1)" : "rgba(0, 132, 255, 0)" }}
        animate={controls}
        transition={{ duration: 0.3 }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <motion.path
          d="M17.367 4.342a4.584 4.584 0 00-6.484 0L10 5.225l-.883-.883a4.584 4.584 0 00-6.484 6.483l.884.883L10 18.192l6.483-6.484.884-.883a4.584 4.584 0 000-6.483v0z"
          animate={{ stroke: isLiked ? Constants.system.blue : Constants.semantic.textGrayDark }}
          whileHover={{ stroke: Constants.system.blue }}
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </button>
  );
}
