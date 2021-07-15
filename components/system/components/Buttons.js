import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_BUTTON = `
  box-sizing: border-box;
  border-radius: 8px;
  outline: 0;
  border: 0;
  min-height: 40px;
  padding: 4px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  letter-spacing: -0.006px;
  font-family: ${Constants.font.medium};
  transition: 200ms ease all;
  overflow-wrap: break-word;
  user-select: none;
`;

const STYLES_BUTTON_PRIMARY = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  background-color: ${Constants.system.blue};
  color: ${Constants.system.white};

  :hover {
    background-color: #0079eb;
  }

  :focus {
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_PRIMARY_DISABLED = css`
  ${STYLES_BUTTON}
  cursor: not-allowed;
  background-color: ${Constants.semantic.bgBlue};
  color: ${Constants.system.white};
`;

const STYLES_BUTTON_PRIMARY_TRANSPARENT = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  background-color: transparent;
  color: ${Constants.system.blue};
`;

export const ButtonPrimary = (props) => {
  if (props.loading) {
    return (
      <button
        css={props.transparent ? STYLES_BUTTON_PRIMARY_TRANSPARENT : STYLES_BUTTON_PRIMARY}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
      >
        <LoaderSpinner style={{ height: 16, width: 16, color: Constants.system.white }} />
      </button>
    );
  }

  if (props.type === "label") {
    return (
      <label
        css={props.transparent ? STYLES_BUTTON_PRIMARY_TRANSPARENT : STYLES_BUTTON_PRIMARY}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
        children={props.children}
        type={props.label}
        htmlFor={props.htmlFor}
        onClick={props.onClick}
      />
    );
  }

  if (props.disabled) {
    return (
      <button
        css={STYLES_BUTTON_PRIMARY_DISABLED}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
        onClick={props.onClick}
        children={props.children}
      />
    );
  }

  return (
    <button
      css={props.transparent ? STYLES_BUTTON_PRIMARY_TRANSPARENT : STYLES_BUTTON_PRIMARY}
      style={{ width: props.full ? "100%" : "auto", ...props.style }}
      onClick={props.onClick}
      children={props.children}
    />
  );
};

export const ButtonPrimaryFull = (props) => {
  return <ButtonPrimary full {...props} />;
};

const STYLES_BUTTON_SECONDARY = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  color: ${Constants.system.black};
  background-color: ${Constants.system.grayLight5};
  box-shadow: 0 0 0 1px ${Constants.semantic.bgLight} inset;

  :hover {
    background-color: ${Constants.system.grayLight4};
  }

  :focus {
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_SECONDARY_TRANSPARENT = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  background-color: transparent;
  color: ${Constants.system.grayLight2};
`;

export const ButtonSecondary = (props) => {
  if (props.loading) {
    return (
      <button
        css={props.transparent ? STYLES_BUTTON_SECONDARY_TRANSPARENT : STYLES_BUTTON_SECONDARY}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
      >
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      </button>
    );
  }

  if (props.type === "label") {
    return (
      <label
        css={props.transparent ? STYLES_BUTTON_SECONDARY_TRANSPARENT : STYLES_BUTTON_SECONDARY}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
        onClick={props.onClick}
        children={props.children}
        type={props.label}
        htmlFor={props.htmlFor}
      />
    );
  }

  return (
    <button
      css={props.transparent ? STYLES_BUTTON_SECONDARY_TRANSPARENT : STYLES_BUTTON_SECONDARY}
      onClick={props.onClick}
      children={props.children}
      style={{ width: props.full ? "100%" : "auto", ...props.style }}
    />
  );
};

export const ButtonSecondaryFull = (props) => {
  return <ButtonSecondary full {...props} />;
};

const STYLES_BUTTON_TERTIARY = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  color: ${Constants.system.black};
  background-color: ${Constants.system.white};
  box-shadow: 0 0 0 1px ${Constants.semantic.bgLight} inset;

  :hover {
    background-color: #fcfcfc;
  }

  :focus {
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_TERTIARY_TRANSPARENT = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  background-color: transparent;
  color: ${Constants.system.grayLight2};
`;

export const ButtonTertiary = (props) => {
  if (props.loading) {
    return (
      <button
        css={props.transparent ? STYLES_BUTTON_TERTIARY_TRANSPARENT : STYLES_BUTTON_TERTIARY}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
      >
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      </button>
    );
  }

  if (props.type === "label") {
    return (
      <label
        css={props.transparent ? STYLES_BUTTON_TERTIARY_TRANSPARENT : STYLES_BUTTON_TERTIARY}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
        onClick={props.onClick}
        children={props.children}
        type={props.label}
        htmlFor={props.htmlFor}
      />
    );
  }

  return (
    <button
      css={props.transparent ? STYLES_BUTTON_TERTIARY_TRANSPARENT : STYLES_BUTTON_TERTIARY}
      onClick={props.onClick}
      children={props.children}
      style={{ width: props.full ? "100%" : "auto", ...props.style }}
    />
  );
};

export const ButtonTertiaryFull = (props) => {
  return <ButtonTertiary full {...props} />;
};

const STYLES_BUTTON_DISABLED = css`
  ${STYLES_BUTTON}
  cursor: not-allowed;
  background-color: ${Constants.system.white};
  color: ${Constants.semantic.textGrayLight};
  box-shadow: 0 0 0 1px ${Constants.semantic.bgLight} inset;

  :focus {
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_DISABLED_TRANSPARENT = css`
  ${STYLES_BUTTON}
  cursor: not-allowed;
  background-color: transparent;
  color: ${Constants.system.gray};
`;

export const ButtonDisabled = (props) => {
  return (
    <button
      css={props.transparent ? STYLES_BUTTON_DISABLED_TRANSPARENT : STYLES_BUTTON_DISABLED}
      onClick={props.onClick}
      children={props.children}
      type={props.label}
      htmlFor={props.htmlFor}
      style={{ width: props.full ? "100%" : "auto", ...props.style }}
    />
  );
};

export const ButtonDisabledFull = (props) => {
  return <ButtonDisabled full {...props} />;
};

const STYLES_BUTTON_WARNING = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  color: ${Constants.system.white};
  background-color: ${Constants.system.red};

  :hover {
    background-color: #b51111;
  }

  :focus {
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_WARNING_DISABLED = css`
  ${STYLES_BUTTON}
  cursor: not-allowed;
  color: ${Constants.system.white};
  background-color: ${Constants.semantic.bgRed};
  box-shadow: 0 0 0 1px ${Constants.semantic.bgLight} inset;
`;

const STYLES_BUTTON_WARNING_TRANSPARENT = css`
  ${STYLES_BUTTON}
  cursor: pointer;
  background-color: transparent;
  color: ${Constants.system.red};
`;

export const ButtonWarning = (props) => {
  if (props.loading) {
    return (
      <button
        css={props.transparent ? STYLES_BUTTON_WARNING_TRANSPARENT : STYLES_BUTTON_WARNING}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
      >
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      </button>
    );
  }

  if (props.type === "label") {
    return (
      <label
        css={props.transparent ? STYLES_BUTTON_WARNING_TRANSPARENT : STYLES_BUTTON_WARNING}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
        children={props.children}
        type={props.label}
        htmlFor={props.htmlFor}
        onClick={props.onClick}
      />
    );
  }

  if (props.disabled) {
    return (
      <button
        css={STYLES_BUTTON_WARNING_DISABLED}
        style={{ width: props.full ? "100%" : "auto", ...props.style }}
        onClick={props.onClick}
        children={props.children}
      />
    );
  }

  return (
    <button
      css={props.transparent ? STYLES_BUTTON_WARNING_TRANSPARENT : STYLES_BUTTON_WARNING}
      style={{ width: props.full ? "100%" : "auto", ...props.style }}
      onClick={props.onClick}
      children={props.children}
    />
  );
};

export const ButtonWarningFull = (props) => {
  return <ButtonWarning full {...props} />;
};
