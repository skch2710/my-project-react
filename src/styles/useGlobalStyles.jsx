/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

export const useGlobalStyles = () => {
  const theme = useTheme();

  return {
    formControl: css({
      width: "100%",
      color: theme.colors.monochrome.input,
      padding: "0 7px",
      border: `1px solid ${theme.colors.secondary.default}`,
      borderRadius: "4px",
      boxShadow: "1px 1px 3px rgba(41, 84, 106 / 7%)",
      height: "30px",
      fontSize: "12px",
      backgroundColor: theme.colors.monochrome.white,
      "&::placeholder": {
        color: theme.colors.monochrome.input,
        fontSize: "12px",
      },
      "&[disabled]": {
        backgroundColor: theme.colors.grey.inputDisableBg,
        color: theme.colors.grey[300],
        cursor: "not-allowed",
        borderColor: theme.colors.grey.inputDisableBorder,
        textOverflow: "ellipsis",
      },
    }),
    anotherStyle: css({
      marginTop: "10px",
      fontWeight: "bold",
    }),
    cardStyle: css({
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    }),
    // Add more reusable styles here...
  };
};
