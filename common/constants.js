export const values = {
  version: "1.0.0",
  sds: "0.2.0",
};

export const sizes = {
  mobile: 768,
  navigation: 288,
  sidebar: 416,
  header: 56,
  tablet: 960,
  desktop: 1024,
  topOffset: 0, //NOTE(martina): Pushes UI down. 16 when there is a persistent announcement banner, 0 otherwise
};

export const system = {
  //system color
  white: "#FFFFFF",
  grayLight6: "#F2F5F7",
  grayLight5: "#E5E8EA",
  grayLight4: "#D1D4D6",
  grayLight3: "#C7CACC",
  grayLight2: "#AEB0B2",
  gray: "#8E9093",
  grayDark2: "#636566",
  grayDark3: "#48494A",
  grayDark4: "#3A3B3C",
  grayDark5: "#2C2D2E",
  grayDark6: "#1C1D1E",
  black: "#00050A",

  blue: "#0084FF",
  green: "#34D159",
  yellow: "#FFD600",
  red: "#FF4530",
  purple: "#585CE6",
  teal: "#64C8FA",
  pink: "#FF375F",
  orange: "#FF9F00",

  blueLight6: "#D5EBFF",
  blueLight5: "#AAD7FF",
  blueLight4: "#80C3FF",
  blueLight3: "#55AEFF",
  bluelight2: "#2B99FF",
  blueDark2: "#006FD5",
  blueDark3: "#0059AA",
  blueDark4: "#004380",
  blueDark5: "#002D55",
  blueDark6: "#00172B",

  greenLight6: "#D5FFDE",
  greenLight5: "#AAFFBE",
  greenLight4: "#86FCA2",
  greenLight3: "#66F287",
  greenLight2: "#4BE46F",
  greenDark2: "#20B944",
  greenDark3: "#119D32",
  greenDark4: "#067C22",
  greenDark5: "#005514",
  greenDark6: "#002B09",

  yellowLight6: "#FFFFD5",
  yellowLight5: "#FFFBAA",
  yellowLight4: "#FFF280",
  yellowLight3: "#FFE655",
  yellowLight2: "#FFD62B",
  yellowDark2: "#D5AC00",
  yellowDark3: "#AA9100",
  yellowDark4: "#807300",
  yellowDark5: "#555100",
  yellowDark6: "#2B2A00",

  redLight6: "#FFD5D5",
  redLight5: "#FFAFAA",
  redLight4: "#FF8D80",
  redlight3: "#FF715E",
  redLight2: "#FF5944",
  redDark2: "#D52E1A",
  redDark3: "#AA1C09",
  redDark4: "#800E00",
  redDark5: "#550500",
  redDark6: "#2B0000",
};

export const semantic = {
  //semantic color
  textWhite: system.white,
  textGrayLight: system.grayLight3,
  textGray: system.gray,
  textGrayDark: system.grayDark3,
  textBlack: system.black,

  bgLight: system.grayLight6,
  bgGrayLight: system.grayLight5,
  bgBlurWhite: "rgba(255, 255, 255, 0.7)",
  bgBlurWhiteOP: "rgba(255, 255, 255, 0.85)",
  bgBlurWhiteTRN: "rgba(255, 255, 255, 0.3)",
  bgBlurLight6: "rgba(242, 245, 247, 0.7)",
  bgBlurLight6OP: "rgba(242, 245, 247, 0.85)",
  bgBlurLight6TRN: "rgba(242, 245, 247, 0.3)",

  bgDark: system.grayDark6,
  bgLightDark: system.grayDark5,
  bgBlurBlack: "rgba(0, 5, 10, 0.5)",
  bgBlurBlackOP: "rgba(0, 5, 10, 0.85)",
  bgBlurBlackTRN: "rgba(0, 5, 10, 0.3)",
  bgBlurDark6: "rgba(28, 29, 30, 0.5)",
  bgBlurDark6OP: "rgba(28, 29, 30, 0.85)",
  bgBlurDark6TRN: "rgba(28, 29, 30, 0.3)",

  borderLight: system.grayLight6,
  borderGrayLight: system.grayLight5,
  borderDark: system.grayDark6,
  borderGrayDark: system.grayDark5,

  bgBlue: system.blueLight6,
  bgGreen: system.greenLight6,
  bgYellow: system.yellowLight6,
  bgRed: system.redLight6,
};

export const shadow = {
  lightSmall: "0px 4px 16px 0 rgba(174, 176, 178, 0.1)",
  lightMedium: "0px 8px 32px 0 rgba(174, 176, 178, 0.2)",
  lightLarge: "0px 12px 64px 0 rgba(174, 176, 178, 0.3)",
  darkSmall: "0px 4px 16px 0 rgba(99, 101, 102, 0.1)",
  darkMedium: "0px 8px 32px 0 rgba(99, 101, 102, 0.2)",
  darkLarge: "0px 12px 64px 0 rgba(99, 101, 102, 0.3)",
};

export const zindex = {
  navigation: 1,
  body: 2,
  sidebar: 5,
  alert: 3,
  header: 4,
  modal: 6,
  tooltip: 7,
  cta: 8,
};

export const font = {
  text: `'inter-regular', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  semiBold: `'inter-semi-bold', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  medium: `'inter-medium', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  mono: `'mono', monaco, monospace`,
  monoBold: `'mono-bold', monaco, monospace`,
  monoCode: `'fira-code-regular', mono, monospace`,
  monoCodeBold: `'fira-code-bold', mono-bold, monospace`,
  code: `'jet-brains-regular', mono, monospace`,
  codeBold: `'jet-brains-bold', mono, monospace`,
};

export const typescale = {
  lvlN1: `0.75rem`,
  lvl0: `0.875rem`,
  lvl1: `1rem`,
  lvl2: `1.25rem`,
  lvl3: `1.563rem`,
  lvl4: `1.953rem`,
  lvl5: `2.441rem`,
  lvl6: `3.052rem`,
  lvl7: `3.815rem`,
  lvl8: `4.768rem`,
  lvl9: `5.96rem`,
  lvl10: `7.451rem`,
  lvl11: `9.313rem`,
};

export const theme = {
  foreground: system.white,
  ctaBackground: system.blue,
  pageBackground: semantic.bgLight,
  pageText: system.black,
};

export const gateways = {
  ipfs: "https://slate.textile.io/ipfs",
};

export const hostname = "https://slate.host";

// more important filetypes to consider:
// midi
// txt, rtf, docx
// html, css, js, other code-related extensions
// json, csv, other script/data extensions
export const filetypes = {
  images: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  audio: ["audio/mpeg", "audio/aac", "audio/flac", "audio/wav", "audio/webm"],
  assets: ["font/ttf", "font/otf", "image/svg+xml"],
  videos: ["video/mpeg", "video/webm", "video/quicktime"],
  books: ["application/pdf", "application/epub+zip", "application/vnd.amazon.ebook"],
};

export const linkPreviewSizeLimit = 5000000; //NOTE(martina): 5mb limit for twitter preview images

// NOTE(amine): used to calculate how many cards will fit into a row in sceneActivity
export const grids = {
  activity: {
    profileInfo: {
      width: 260,
    },
  },
  object: {
    desktop: { width: 248, rowGap: 16 },
    mobile: { width: 166, rowGap: 8 },
  },
  collection: {
    desktop: { width: 432, rowGap: 16 },
    mobile: { width: 300, rowGap: 8 },
  },
  profile: {
    desktop: { width: 432, rowGap: 16 },
    mobile: { width: 344, rowGap: 8 },
  },
};

export const profileDefaultPicture =
  "https://slate.textile.io/ipfs/bafkreick3nscgixwfpq736forz7kzxvvhuej6kszevpsgmcubyhsx2pf7i";
