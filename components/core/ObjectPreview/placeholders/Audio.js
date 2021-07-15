import * as React from "react";

import { css } from "@emotion/react";

export default function AudioPlaceholder({ ratio = 1, ...props }) {
  const STYLES_PLACEHOLDER = React.useMemo(
    () => css`
      overflow: visible !important;
      width: ${(163 / 248) * 100 * ratio}%;
      height: ${(163 / 248) * 100 * ratio}%;
    `,
    [ratio]
  );

  return (
    <svg
      width={163}
      height={163}
      viewBox="0 0 163 163"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={STYLES_PLACEHOLDER}
      {...props}
    >
      <circle cx={81.5} cy={81.5} r={81.5} fill="url(#prefix__paint0_radial)" />
      <path
        d="M82 95.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.333-13.333-7.364 0-13.333 5.97-13.333 13.333 0 7.364 5.97 13.333 13.333 13.333z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M79.333 76.667l8 5.333-8 5.333V76.667z"
        fill="#C7C7CC"
        stroke="#C7C7CC"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <radialGradient
          id="prefix__paint0_radial"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 0 81.5) scale(87.5)"
        >
          <stop stopColor="#C4C4C4" />
          <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}
