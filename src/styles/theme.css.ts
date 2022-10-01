import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from "@vanilla-extract/css";

createGlobalTheme(":root", {
  space: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "system-ui",
  },
});

const colors = createThemeContract({
  background: "",
  text: "",
});

export const lightTheme = createTheme(colors, {
  background: "white",
  text: "black",
});

export const darkTheme = createTheme(colors, {
  background: "black",
  text: "white",
});
