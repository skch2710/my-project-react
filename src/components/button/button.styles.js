export const baseStyles = {
  textTransform: "none",
  boxShadow: "none",
  minWidth: "120px",
  "&:hover": {
    boxShadow: "none",
  },
};

export const darkBlueStyles = (theme) => ({
  backgroundColor: theme.colors.brand[800],
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.colors.brand[900],
  },
});

export const lightBlueStyles = (theme) => ({
  backgroundColor: theme.colors.brand[100],
  color: theme.colors.brand[800],
  "&:hover": {
    backgroundColor: theme.colors.brand[200],
  },
});

export const dangerStyles = (theme) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.customColors.red.dark,
  },
});

export const blackButtonStyles = (theme) => ({
  py: 1.3,
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 16,
  bgcolor: "#111",
  color: theme.palette.common.white,
  "&:hover": {
    bgcolor: "#000",
  },
});
