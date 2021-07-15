import * as React from "react";

import { css } from "@emotion/react";

export default function KeynotePlaceholder({ ratio = 1, ...props }) {
  const STYLES_PLACEHOLDER = React.useMemo(
    () => css`
      overflow: visible !important;
      width: ${(183 / 248) * 100 * ratio}%;
      height: ${(115 / 248) * 100 * ratio}%;
    `,
    [ratio]
  );

  return (
    <svg
      width={183}
      height={115}
      viewBox="49 38 183 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={STYLES_PLACEHOLDER}
      {...props}
    >
      <path
        d="M67 157h143a8 8 0 008-8V78.13a8 8 0 00-1.957-5.242l-24.401-28.13A8.002 8.002 0 00185.598 42H67a8 8 0 00-8 8v99a8 8 0 008 8z"
        fill="#fff"
      />
      <g filter="url(#prefix__filter0_d_keynote)">
        <path
          d="M60 154h157a8 8 0 008-8V75.323a8.002 8.002 0 00-2.182-5.49l-26.732-28.324A8.001 8.001 0 00190.268 39H60a8 8 0 00-8 8v99a8 8 0 008 8z"
          fill="#fff"
        />
      </g>
      <g filter="url(#prefix__filter1_d_keynote)">
        <path
          d="M56 150.5h166.5a8 8 0 008-8V72.814a8 8 0 00-2.343-5.657l-28.814-28.814A8 8 0 00193.686 36H56a8 8 0 00-8 8v98.5a8 8 0 008 8z"
          fill="#fff"
        />
      </g>
      <g filter="url(#prefix__filter2_d_keynote)">
        <path d="M207 68h22l-30-30v22a8 8 0 008 8z" fill="#D1D1D6" />
      </g>
      <path
        d="M119.667 87h-9.334c-.736 0-1.333.597-1.333 1.333v9.334c0 .736.597 1.333 1.333 1.333h9.334c.736 0 1.333-.597 1.333-1.333v-9.334c0-.736-.597-1.333-1.333-1.333zM137.86 87.573L132.213 97a1.33 1.33 0 00-.003 1.327 1.328 1.328 0 001.143.673h11.294a1.33 1.33 0 001.318-1.337 1.33 1.33 0 00-.178-.663l-5.647-9.427a1.332 1.332 0 00-2.28 0zM163 99.667a6.667 6.667 0 100-13.334 6.667 6.667 0 000 13.334z"
        fill="#E5E5EA"
        stroke="#E5E5EA"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="prefix__filter0_d_keynote"
          x={4}
          y={3}
          width={269}
          height={211}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy={12} />
          <feGaussianBlur stdDeviation={24} />
          <feColorMatrix values="0 0 0 0 0.698039 0 0 0 0 0.698039 0 0 0 0 0.698039 0 0 0 0.3 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter1_d_keynote"
          x={0}
          y={0}
          width={278.5}
          height={210.5}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy={12} />
          <feGaussianBlur stdDeviation={24} />
          <feColorMatrix values="0 0 0 0 0.698039 0 0 0 0 0.698039 0 0 0 0 0.698039 0 0 0 0.3 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter2_d_keynote"
          x={183}
          y={30}
          width={70}
          height={70}
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
