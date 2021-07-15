import * as React from "react";
import * as System from "~/components/system";

import { DarkSymbol } from "~/common/logo";
import { css } from "@emotion/react";

const STYLES_POPOVER = (theme) => css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 432px;
  height: 544px;
  width: 95vw;
  border-radius: 8px;
  padding: 48px 32px 36px 32px;

  @media (max-width: ${theme.sizes.mobile}px) {
    flex-grow: 1;
    margin-bottom: auto;
    max-width: 100%;
  }

  background-color: white;

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    background: radial-gradient(
      80.79% 80.79% at 50% 50%,
      rgba(242, 242, 247, 0.5) 0%,
      rgba(242, 242, 247, 0) 100%
    );
    backdrop-filter: blur(75px);
  }

  @keyframes authentication-popover-fade-in {
    from {
      transform: translateY(-8px);
      opacity: 0;
    }

    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  animation: authentication-popover-fade-in 400ms ease;
`;

const STYLES_POPOVER_BODY = (theme) => css`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: ${theme.sizes.mobile}px) {
    justify-content: center;
  }
`;
export default function SignUpPopover({ children, title, logoStyle, titleStyle, props }) {
  return (
    <div css={STYLES_POPOVER} {...props}>
      <div>
        <div style={{ textAlign: "center" }}>
          <DarkSymbol height="48" width="48" style={{ marginBottom: "8px", ...logoStyle }} />
        </div>
        <System.H3
          style={{ textAlign: "center", lineHeight: "30px", padding: "0 24px", ...titleStyle }}
        >
          {title}
        </System.H3>
      </div>
      <div css={STYLES_POPOVER_BODY}>{children}</div>
    </div>
  );
}
