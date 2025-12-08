import { createTheme } from "@mui/material/styles";
import themeComponents from "./themeComponents";

const theme = createTheme({
  colors: {
    monochrome: {
      black: "#000000",
      white: "#FFFFFF",
      input: "#434653",
    },
    primary: {
      default: "#1976d2",
      main: "#1976d2",
      light: "#63a4ff",
    },
    secondary: {
      default: "#ebebeb",
      main: "#9c27b0",
      light: "#ba68c8",
    },
    error: {
      default: "#e57776",
    },
    grey: {
      100: "#f0f2ff",
      300: "#C5C5C5",
      500: "#BDBDBD",
      inputDisableBg: "#f5f5f5",
      inputDisableBorder: "#D9D9D9",
    },
    red: {
      dark: "#cf0000 ",
    },
  },
});

theme.components = themeComponents(theme);

export default theme;
