import { createTheme } from "@mui/material/styles";
// import themeComponents from "./themeComponents";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
    },
    error: {
      main: "#e57776",
    },
    grey: {
      100: "#f5f5f5",
      300: "#D9D9D9",
    },
    blue: {
      800: "#074f80",
      900: "#053b4d",
      main: "#0f8bff",
    },
    yellow: {
      main: "#ff9800",
    },
    common: {
      black: "#1a1a1a", // soft black instead of pure #000000
    },
  },

  // custom colors here (used by components for extended palettes)
  colors: {
    brand: {
      50: "#e8f3ff",
      100: "#cfe7ff",
      200: "#9fd0ff",
      300: "#6fb9ff",
      400: "#3fa2ff",
      500: "#0f8bff",
      600: "#0c78e6",
      700: "#0a63b3",
      800: "#074f80",
      900: "#053b4d",
      main: "#0f8bff",
    },
    overlay: "rgba(15,139,255,0.08)",
    focus: "#0f8bff",
  },

  customColors: {
    input: {
      disabledBg: "#f5f5f5",
      disabledBorder: "#D9D9D9",
    },
    red: {
      dark: "#cf0000",
    },
  },
});

// component overrides
// theme.components = themeComponents(theme);

export default theme;
