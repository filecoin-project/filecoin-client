import * as React from "react";
import * as Events from "~/common/custom-events";
import * as Content from "~/components/core/FontFrame/Views/content";
import * as Strings from "~/common/strings";

import { generateNumberByStep } from "~/common/utilities";

export const useFont = ({ cid }, deps) => {
  const url = Strings.getURLfromCID(cid);
  const [fetchState, setFetchState] = React.useState({ loading: false, error: null });
  const prevName = React.useRef(cid);

  if (typeof window !== "undefined" && !window.$SLATES_LOADED_FONTS) {
    window.$SLATES_LOADED_FONTS = [];
  }
  const alreadyLoaded =
    (typeof window !== "undefined" && window.$SLATES_LOADED_FONTS.includes(cid)) || false;

  React.useEffect(() => {
    if (!window) return;

    if (alreadyLoaded) {
      setFetchState((prev) => ({ ...prev, error: null }));
      return;
    }

    setFetchState((prev) => ({ ...prev, error: null, loading: true }));
    const customFonts = new FontFace(cid, `url(${url})`);
    customFonts
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        prevName.current = cid;

        setFetchState((prev) => ({ ...prev, loading: false }));
        window.$SLATES_LOADED_FONTS.push(cid);
      })
      .catch((err) => {
        setFetchState({ loading: false, error: err });
      });
  }, deps);

  return {
    isFontLoading: fetchState.loading,
    error: fetchState.error,
    // NOTE(Amine): show previous font while we load the new one.
    fontName: alreadyLoaded ? cid : prevName.current,
  };
};

const initialState = {
  context: {
    darkmode: true,
    showSettings: true,
    sentence: Content.sentences[0],
    paragraph: Content.paragraphs[0],
    customViewContent: Content.sentences[1],
    settings: {
      valign: "center",
      textAlign: "left",
      fontSize: 24,
      column: 2,
      lineHeight: 100,
      tracking: 0,
    },
  },
  view: "sentence",
  customView: "sentence",
};

const VIEW_OPTIONS = ["custom", "glyphs", "sentence", "paragraph"];
const VALIGN_OPTIONS = ["top", "center", "bottom"];
const ALIGN_OPTIONS = ["left", "center", "right"];
const SIZE_OPTIONS = { min: 8, max: 320, step: 1 };
const LINE_HEIGHT_OPTIONS = { min: 50, max: 300, step: 10 };
const TRACKING_OPTIONS = { min: -0.1, max: 0.2, step: 0.01 };
const COLUMN_OPTIONS = { min: 1, max: 4, step: 1 };

const reducer = (state, action) => {
  const updateSettingsField = (field, newValue) => ({
    ...state,
    context: {
      ...state.context,
      settings: { ...state.context.settings, [field]: newValue },
    },
  });
  switch (action.type) {
    case "INITIATE_STATE": {
      return {
        ...state,
        ...action.value,
        context: {
          ...state.context,
          ...action.value.context,
          settings: { ...state.context.settings, ...action.value.context.settings },
        },
      };
    }
    case "SET_DARK_MODE":
      return { ...state, context: { ...state.context, darkmode: true } };
    case "SET_LIGHT_MODE":
      return { ...state, context: { ...state.context, darkmode: false } };
    case "TOGGLE_SETTINGS_VISIBILITY":
      return { ...state, context: { ...state.context, showSettings: !state.context.showSettings } };
    case "UPDATE_FONT_SIZE":
      return updateSettingsField("fontSize", action.value);
    case "UPDATE_LINE_HEIGHT":
      return updateSettingsField("lineHeight", action.value);
    case "UPDATE_TRACKING":
      return updateSettingsField("tracking", action.value);
    case "UPDATE_COLUMN":
      return updateSettingsField("column", action.value);
    case "UPDATE_TEXT_ALIGN":
      return updateSettingsField("textAlign", action.value);
    case "UPDATE_VERTICAL_ALIGN":
      return updateSettingsField("valign", action.value);
    case "UPDATE_VIEW":
      return {
        ...state,
        view: action.value,
        context: { ...state.context },
      };
    case "UPDATE_CUSTOM_VIEW":
      return {
        ...state,
        view: "custom",
        customView: action.payload.customView,
        context: {
          ...state.context,
          customViewContent: action.payload.customViewContent,
        },
      };
    case "RESET":
      return { ...initialState };
    case "FEELING_LUCKY":
      const generateOption = (options) =>
        options[generateNumberByStep({ min: 0, max: options.length - 1, step: 1 })];
      const generatedView = generateOption(VIEW_OPTIONS.slice(1));
      if (generatedView === "glyphs") {
        return { ...state, view: generatedView };
      }
      return {
        ...state,
        view: generatedView,
        context: {
          ...state.context,
          sentence: generateOption(Content.sentences),
          paragraph: generateOption(Content.paragraphs),
          settings: {
            valign: generateOption(VALIGN_OPTIONS),
            textAlign: generateOption(ALIGN_OPTIONS),
            fontSize: generateNumberByStep({ min: 16, max: 72, step: 1 }),
            column: generateNumberByStep({ min: 1, max: 4, step: 1 }),
            lineHeight: generateNumberByStep({ min: 100, max: 200, step: 10 }),
            tracking: generateNumberByStep({ min: 0, max: 0.1, step: 0.01 }).toPrecision(1),
          },
        },
      };
    default:
      return state;
  }
};

export const useFontControls = () => {
  const [current, send] = React.useReducer(reducer, initialState);
  const handleDarkMode = (state) =>
    Events.dispatchCustomEvent({
      name: "set-slate-theme",
      detail: { fontPreviewDarkMode: state },
    });
  const handlers = React.useMemo(
    () => ({
      setDarkMode: () => handleDarkMode(true),
      setLightMode: () => handleDarkMode(false),
      initialState: (state) => send({ type: "INITIATE_STATE", value: state }),
      toggleSettings: () => send({ type: "TOGGLE_SETTINGS_VISIBILITY" }),
      updateFontSize: (v) => send({ type: "UPDATE_FONT_SIZE", value: v }),
      updateLineHeight: (v) => send({ type: "UPDATE_LINE_HEIGHT", value: v }),
      updateTracking: (v) => send({ type: "UPDATE_TRACKING", value: v }),
      updateColumn: (v) => send({ type: "UPDATE_COLUMN", value: v }),
      updateTextAlign: (v) => send({ type: "UPDATE_TEXT_ALIGN", value: v }),
      updateVerticalAlign: (v) => send({ type: "UPDATE_VERTICAL_ALIGN", value: v }),
      updateView: (v) => send({ type: "UPDATE_VIEW", value: v }),
      updateCustomView: ({ customView, customViewContent }) =>
        send({ type: "UPDATE_CUSTOM_VIEW", payload: { customView, customViewContent } }),
      resetLayout: () => send({ type: "RESET" }),
      getRandomLayout: () => send({ type: "FEELING_LUCKY" }),
    }),
    []
  );

  const FONT_PREVIEW_STORAGE_TOKEN = "SLATE_FONT_PREVIEW_SETTINGS";

  React.useLayoutEffect(() => {
    const initialState = JSON.parse(localStorage.getItem(FONT_PREVIEW_STORAGE_TOKEN));
    if (initialState) handlers.initialState(initialState);
  }, []);

  React.useEffect(() => {
    localStorage.setItem(FONT_PREVIEW_STORAGE_TOKEN, JSON.stringify(current));
  }, [current]);

  return [
    {
      ...current,
      defaultOptions: {
        VIEW_OPTIONS,
        VALIGN_OPTIONS,
        ALIGN_OPTIONS,
        SIZE_OPTIONS,
        LINE_HEIGHT_OPTIONS,
        TRACKING_OPTIONS,
        COLUMN_OPTIONS,
      },
    },
    handlers,
  ];
};
