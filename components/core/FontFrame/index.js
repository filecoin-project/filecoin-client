import * as React from "react";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { useFont, useFontControls } from "~/components/core/FontFrame/hooks";
import { Controls } from "~/components/core/FontFrame/Settings/index";
import {
  FixedControls,
  MobileFixedControls,
} from "~/components/core/FontFrame/Settings/FixedControls";
import FontView from "~/components/core/FontFrame/Views/index";

const GET_STYLES_CONTAINER = (theme) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${theme.fontPreviewDarkMode ? theme.system.black : theme.system.white};
  padding-top: 14px;
`;

const STYLES_MOBILE_HIDDEN = (theme) => css`
  @media (max-width: ${theme.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = (theme) => css`
  @media (min-width: ${theme.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_FONT_LOADER = (theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  color: ${theme.fontPreviewDarkMode ? "#fff" : "#000"};
  background-color: ${theme.fontPreviewDarkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)"};
`;
const FontLoader = () => (
  <div css={STYLES_FONT_LOADER}>
    <p>loading...</p>
  </div>
);
export default function FontFrame({ cid, fallback, ...props }) {
  const url = Strings.getURLfromCID(cid);
  const { isFontLoading, error, fontName } = useFont({ cid }, [cid, url]);

  const [
    currentState,
    {
      updateView,
      setLightMode,
      setDarkMode,
      toggleSettings,
      updateFontSize,
      updateLineHeight,
      updateTracking,
      updateColumn,
      updateTextAlign,
      updateVerticalAlign,
      updateCustomView,
      resetLayout,
      getRandomLayout,
    },
  ] = useFontControls();

  if (error) {
    return fallback;
  }

  return (
    <div css={GET_STYLES_CONTAINER} style={{ fontFamily: fontName }} {...props}>
      <div css={STYLES_MOBILE_HIDDEN}>
        <FixedControls
          onDarkMode={setDarkMode}
          onLightMode={setLightMode}
          onToggleSettings={toggleSettings}
          isDarkMode={currentState.context.darkmode}
          isSettingsVisible={currentState.context.showSettings}
        />
      </div>
      <div style={{ position: "relative", flexGrow: 1, overflowY: "auto" }}>
        {isFontLoading && <FontLoader />}
        <FontView
          view={currentState.view}
          content={{
            paragraph: currentState.context.paragraph,
            sentence: currentState.context.sentence,
            custom: currentState.context.customViewContent,
          }}
          customView={currentState.customView}
          settings={currentState.context.settings}
          updateCustomView={updateCustomView}
        />
      </div>
      <div css={STYLES_MOBILE_HIDDEN}>
        {currentState.context.showSettings && (
          <Controls
            view={currentState.view}
            customView={currentState.customView}
            defaultOptions={currentState.defaultOptions}
            resetLayout={resetLayout}
            updateView={updateView}
            settings={currentState.context.settings}
            updateFontSize={updateFontSize}
            updateLineHeight={updateLineHeight}
            updateTracking={updateTracking}
            updateColumn={updateColumn}
            updateTextAlign={updateTextAlign}
            updateVerticalAlign={updateVerticalAlign}
            getRandomLayout={getRandomLayout}
          />
        )}
      </div>
      <div css={STYLES_MOBILE_ONLY}>
        <MobileFixedControls
          view={currentState.view}
          defaultOptions={currentState.defaultOptions}
          updateView={updateView}
          onDarkMode={setDarkMode}
          onLightMode={setLightMode}
        />
      </div>
    </div>
  );
}
