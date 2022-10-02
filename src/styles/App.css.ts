import { globalStyle } from "@vanilla-extract/css";

import { darkMode, vars } from "./theme.css";

globalStyle(`${darkMode}`, {
  background: vars.palette.black,
  color: vars.palette.gray50,
  colorScheme: "dark",
});

globalStyle("html", {
  background: vars.palette.white,
  color: vars.palette.gray900,
});
