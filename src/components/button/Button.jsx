import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = (props) => {
  const {
    label,
    onClick,
    variant = "contained",
    color,
    size = "small",
    disabled,
    width = "100",
    icon = "",
    startIcon,
  } = props;
  return (
    <MuiButton
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      startIcon={startIcon}
      {...props}
      sx={{ textTransform: "none", minWidth: width, width: "auto",
        backgroundColor: disabled ? "#E0E0E0" : variant === "contained" ? "green" : "transparent",
         "& .MuiButton-startIcon": {
          color: disabled ? "#9E9E9E" : icon ? icon : "inherit",
          
        },
        fontSize: "14px !important",
        height: "30px",
      }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
