import colors from "tailwindcss/colors";
import { createGlobalTheme } from "@vanilla-extract/css";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

export const darkMode = "[data-theme='dark']";

function px(value: string | number) {
  return `${value}px`;
}

export type Breakpoint = keyof typeof breakpoints;
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

const palette = {
  white: "#fff",
  black: "#0e0e10",
  red: colors.red["500"],
  yellow: colors.yellow["300"],
  semantics: {
    primary: "#0876DD",
  },
  scales: {
    green50: colors.emerald["50"],
    green200: colors.emerald["200"],
    green300: colors.emerald["300"],
    green400: colors.emerald["400"],
    green500: colors.emerald["500"],
    green600: colors.emerald["600"],

    gray50: colors.gray["50"],
    gray100: colors.gray["100"],
    gray200: colors.gray["200"],
    gray300: colors.gray["300"],
    gray400: colors.gray["400"],
    gray500: colors.gray["500"],
    gray600: colors.gray["600"],
    gray700: colors.gray["700"],
    gray800: colors.gray["800"],
    gray900: colors.gray["900"],

    slate800: colors.slate["800"],
    slate900: colors.slate["900"],

    teal50: colors.teal["50"],
    teal100: colors.teal["100"],
    teal200: colors.teal["200"],
    teal300: colors.teal["300"],
    teal400: colors.teal["400"],
    teal500: colors.teal["500"],
    teal600: colors.teal["600"],
    teal700: colors.teal["700"],
    teal800: colors.teal["800"],
    teal900: colors.teal["900"],

    blue50: colors.sky["50"],
    blue100: colors.sky["100"],
    blue200: colors.sky["200"],
    blue300: colors.sky["300"],
    blue400: colors.sky["400"],
    blue500: colors.sky["500"],
    blue600: colors.sky["600"],
    blue700: colors.sky["700"],
    blue800: colors.sky["800"],
    blue900: colors.sky["900"],

    pink50: colors.fuchsia["50"],
    pink100: colors.fuchsia["100"],
    pink200: colors.fuchsia["200"],
    pink300: colors.fuchsia["300"],
    pink400: colors.fuchsia["400"],
    pink500: colors.fuchsia["500"],
    pink600: colors.fuchsia["600"],
    pink700: colors.fuchsia["700"],
    pink800: colors.fuchsia["800"],
    pink900: colors.fuchsia["900"],
  },
};

const spacing = {
  0: px(0),
  4: px(4),
  8: px(8),
  12: px(12),
  20: px(20),
  32: px(32),
  40: px(40),
  48: px(48),
  80: px(80),
  96: px(96),
  120: px(120),
};

const contentWidth = {
  "480": px(480),
  "600": px(600),
  "740": px(740),
  "960": px(960),
  "1120": px(1120),
  "1350": px(1350),
};

const weight = {
  regular: "400",
  strong: "700",
};

const border = {
  width: {
    "4": px(4),
    "8": px(8),
  },
  radius: {
    "8": px(8),
    "16": px(16),
    "28": px(28),
    full: "9999px",
  },
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": `screen and (min-width: ${breakpoints.tablet}px)` },
    desktop: { "@media": `screen and (min-width: ${breakpoints.desktop}px)` },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    paddingTop: spacing,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    marginTop: spacing,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
  },
  shorthands: {
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    placeItems: ["justifyContent", "alignItems"],
  },
});

export const vars = createGlobalTheme(":root", {
  palette,
  spacing,
  contentWidth,
  weight,
  border,
});

export const sprinkles = createSprinkles(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
