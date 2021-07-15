import * as React from "react";

import { css } from "@emotion/react";

export default function FilePlaceholder({ ratio = 1, ...props }) {
  const STYLES_PLACEHOLDER = React.useMemo(
    () => css`
      overflow: visible !important;
      width: ${(121 / 248) * 100 * ratio}%;
      height: ${(151 / 248) * 100 * ratio}%;
    `,
    [ratio]
  );

  return (
    <svg
      width={121}
      height={151}
      viewBox="0 4 121 151"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={STYLES_PLACEHOLDER}
      {...props}
    >
      <path
        d="M8 157h105a8 8 0 008-8V42.314a8 8 0 00-2.343-5.657L90.343 8.343A8 8 0 0084.686 6H8a8 8 0 00-8 8v135a8 8 0 008 8z"
        fill="#fff"
      />
      <path
        d="M73 83.333V72.667a2.667 2.667 0 00-1.333-2.307l-9.334-5.333a2.667 2.667 0 00-2.666 0l-9.334 5.333A2.668 2.668 0 0049 72.667v10.666a2.667 2.667 0 001.333 2.307l9.334 5.333a2.667 2.667 0 002.666 0l9.334-5.333A2.667 2.667 0 0073 83.333z"
        fill="#E5E5EA"
        stroke="#fff"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M49.36 71.28L61 78.013l11.64-6.733M61 91.44V78"
        stroke="#fff"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g filter="url(#prefix__filter0_d)">
        <path d="M98 37h21L90 8v21a8 8 0 008 8z" fill="#D1D1D6" />
      </g>
      <defs>
        <filter
          id="prefix__filter0_d"
          x={74}
          y={0}
          width={69}
          height={69}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dx={4} dy={12} />
          <feGaussianBlur stdDeviation={10} />
          <feColorMatrix values="0 0 0 0 0.780392 0 0 0 0 0.780392 0 0 0 0 0.8 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
