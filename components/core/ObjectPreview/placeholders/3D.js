import * as React from "react";

import { css } from "@emotion/react";

export default function Object3DPlaceholder({ ratio = 1, ...props }) {
  const STYLES_PLACEHOLDER = React.useMemo(
    () => css`
      overflow: visible !important;
      width: ${(69 / 248) * 100 * ratio}%;
      height: ${(76.65 / 248) * 100 * ratio}%;
    `,
    [ratio]
  );

  return (
    <svg
      width={69}
      height={76.65}
      viewBox="50 37 69 76.65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={STYLES_PLACEHOLDER}
      {...props}
    >
      <g filter="url(#prefix__filter0_d_3d)">
        <path
          d="M118.5 90.333V59.667a7.661 7.661 0 00-3.833-6.632L87.833 37.702a7.666 7.666 0 00-7.666 0L53.333 53.035a7.667 7.667 0 00-3.833 6.632v30.666a7.667 7.667 0 003.833 6.632l26.834 15.333a7.666 7.666 0 007.666 0l26.834-15.333a7.67 7.67 0 003.833-6.632z"
          fill="url(#prefix__paint0_linear_3d)"
        />
        <path
          d="M118.5 90.333V59.667a7.661 7.661 0 00-3.833-6.632L87.833 37.702a7.666 7.666 0 00-7.666 0L53.333 53.035a7.667 7.667 0 00-3.833 6.632v30.666a7.667 7.667 0 003.833 6.632l26.834 15.333a7.666 7.666 0 007.666 0l26.834-15.333a7.67 7.67 0 003.833-6.632z"
          stroke="url(#prefix__paint1_linear_3d)"
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M50.535 55.68L84 75.038l33.465-19.358"
        stroke="url(#prefix__paint2_linear_3d)"
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 113.64V75"
        stroke="url(#prefix__paint3_linear_3d)"
        strokeWidth={0.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="prefix__a" maskUnits="userSpaceOnUse" x={49} y={36} width={70} height={78}>
        <path
          d="M118.5 90.333V59.667a7.661 7.661 0 00-3.833-6.632L87.833 37.702a7.666 7.666 0 00-7.666 0L53.333 53.035a7.667 7.667 0 00-3.833 6.632v30.666a7.667 7.667 0 003.833 6.632l26.834 15.333a7.666 7.666 0 007.666 0l26.834-15.333a7.67 7.67 0 003.833-6.632z"
          fill="url(#prefix__paint4_linear_3d)"
          stroke="url(#prefix__paint5_linear_3d)"
          strokeWidth={0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#prefix__a)">
        <path d="M84 74.609L121 53v42.137L84 117V74.609z" fill="url(#prefix__paint6_linear_3d)" />
        <path d="M84 74.602L48 53.33v41.148L84 116V74.602z" fill="url(#prefix__paint7_linear_3d)" />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear_3d"
          x1={84}
          y1={36.675}
          x2={84}
          y2={113.326}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.396} stopColor="#fff" />
          <stop offset={1} stopColor="#C7C7CC" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_3d"
          x1={84}
          y1={36.675}
          x2={84}
          y2={113.326}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.005} stopColor="#fff" />
          <stop offset={1} stopColor="#D1D1D6" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_3d"
          x1={84}
          y1={51}
          x2={84}
          y2={75.038}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F2F2F7" />
          <stop offset={1} stopColor="#F2F2F7" />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear_3d"
          x1={84.5}
          y1={75}
          x2={84.5}
          y2={113.64}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F2F2F7" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="prefix__paint4_linear_3d"
          x1={84}
          y1={36.675}
          x2={84}
          y2={113.326}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.396} stopColor="#fff" />
          <stop offset={1} stopColor="#C7C7CC" />
        </linearGradient>
        <linearGradient
          id="prefix__paint5_linear_3d"
          x1={84}
          y1={36.675}
          x2={84}
          y2={113.326}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.005} stopColor="#fff" />
          <stop offset={1} stopColor="#D1D1D6" />
        </linearGradient>
        <linearGradient
          id="prefix__paint6_linear_3d"
          x1={99.014}
          y1={66.505}
          x2={119.08}
          y2={102.033}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#C7C7CC" />
        </linearGradient>
        <linearGradient
          id="prefix__paint7_linear_3d"
          x1={81.913}
          y1={72.676}
          x2={65.234}
          y2={106.46}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#C7C7CC" />
        </linearGradient>
        <filter
          id="prefix__filter0_d_3d"
          x={1.25}
          y={0.425}
          width={165.5}
          height={173.151}
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
      </defs>
    </svg>
  );
}
