import * as React from "react";
import { css } from "@emotion/react";

export default function VideoPlaceholder({ ratio = 1, ...props }) {
  const STYLES_PLACEHOLDER = React.useMemo(
    () => css`
      overflow: visible !important;
      width: ${(188 / 248) * 100 * ratio}%;
      height: ${(125 / 248) * 100 * ratio}%;
    `,
    [ratio]
  );

  return (
    <svg
      width={188}
      height={125}
      viewBox="0 0 188 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={STYLES_PLACEHOLDER}
      {...props}
    >
      <rect width={188} height={125} rx={8} fill="url(#prefix__paint0_linear)" />
      <path
        d="M94 73.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.969-13.333-13.333-13.333S80.667 52.637 80.667 60c0 7.364 5.97 13.333 13.333 13.333z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M91.333 54.667l8 5.333-8 5.333V54.667z"
        fill="#C7C7CC"
        stroke="#C7C7CC"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={182}
          y1={99}
          x2={0}
          y2={100}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#F2F2F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
