import * as React from "react";
import * as SVG from "~/common/svg";

import { P1 } from "~/components/system/components/Typography";
import { Input } from "~/components/system";
import { css } from "@emotion/react";

const STYLES_SMALL_TEXT = (theme) => css`
  font-size: ${theme.typescale.lvlN1};
  line-height: 15.6px;
`;

const STYLES_PASSWORD_VALIDATIONS = (theme) => css`
  margin-top: 16px;
  border: 1px solid ${theme.system.white};
  background-color: white;
  @supports ((-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))) {
    background-color: ${theme.semantic.bgBlurWhiteTRN};
    backdrop-filter: blur(75px);
  }
  padding: 8px 12px;
  border-radius: 8px;
`;

const STYLES_PASSWORD_VALIDATION = (theme) =>
  css`
    display: flex;
    align-items: center;
    & > * + * {
      margin-left: 8px;
    }
  `;

const STYLES_CIRCLE = (theme) => css`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  border: 1.25px solid ${theme.system.grayLight2};
`;

const STYLES_CIRCLE_SUCCESS = (theme) => css`
  border: 1.25px solid ${theme.system.green};
`;

const STYLES_INPUT = (theme) => css`
  background-color: rgba(242, 242, 247, 0.7);
  box-shadow: ${theme.shadow.lightLarge};
  border-radius: 8px;
  &::placeholder {
    color: ${theme.semantic.textGrayDark};
  }
`;
const STYLES_INPUT_ERROR = (theme) => css`
  background-color: rgba(242, 242, 247, 0.5);
  border: 1px solid ${theme.system.red};
  &::placeholder {
    color: ${theme.semantic.textGrayDark};
  }
`;
const STYLES_INPUT_SUCCESS = (theme) => css`
  background-color: rgba(242, 242, 247, 0.5);
  border: 1px solid ${theme.system.green};
  &::placeholder {
    color: ${theme.semantic.textGrayDark};
  }
`;

const PasswordValidations = ({ validations }) => {
  return (
    <div css={STYLES_PASSWORD_VALIDATIONS}>
      <P1 css={STYLES_SMALL_TEXT}>Passwords should</P1>
      <div css={STYLES_PASSWORD_VALIDATION}>
        <div css={[STYLES_CIRCLE, validations.validLength && STYLES_CIRCLE_SUCCESS]} />
        <P1 css={STYLES_SMALL_TEXT}>Be at least 8 characters long</P1>
      </div>
      <div css={STYLES_PASSWORD_VALIDATION}>
        <div
          css={[
            STYLES_CIRCLE,
            validations.containsLowerCase && validations.containsUpperCase && STYLES_CIRCLE_SUCCESS,
          ]}
        />
        <P1 css={STYLES_SMALL_TEXT}>Contain both uppercase and lowercase letters</P1>
      </div>
      <div css={STYLES_PASSWORD_VALIDATION}>
        <div css={[STYLES_CIRCLE, validations.containsNumbers && STYLES_CIRCLE_SUCCESS]} />
        <P1 css={STYLES_SMALL_TEXT}>Contain at least 1 number</P1>
      </div>
      <div css={STYLES_PASSWORD_VALIDATION}>
        <div css={[STYLES_CIRCLE, validations.containsSymbol && STYLES_CIRCLE_SUCCESS]} />
        <P1 css={STYLES_SMALL_TEXT}>Contain at least 1 symbol</P1>
      </div>
    </div>
  );
};

export default function Field({
  touched,
  error,
  success,
  validations,
  errorAs,
  containerAs,
  ...props
}) {
  const showError = touched && error;
  const showSuccess = touched && !error;

  const STYLES = React.useMemo(() => {
    if (showError) return STYLES_INPUT_ERROR;
    if (showSuccess) return STYLES_INPUT_SUCCESS;
    return STYLES_INPUT;
  }, [touched, error]);

  const ContainerComponent = containerAs || "div";
  const ErrorWrapper = errorAs || "div";
  return (
    <div>
      <ContainerComponent>
        <Input inputCss={STYLES} {...props} />
      </ContainerComponent>
      {props.name === "password" && validations ? (
        <PasswordValidations validations={validations} />
      ) : (
        <ErrorWrapper>
          <P1 css={STYLES_SMALL_TEXT} style={{ marginTop: "8px" }}>
            {(showError && error) || (showSuccess && success)}
          </P1>
        </ErrorWrapper>
      )}
    </div>
  );
}
