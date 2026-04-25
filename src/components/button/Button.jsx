import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";
import {
  baseStyles,
  darkBlueStyles,
  lightBlueStyles,
  dangerStyles,
  blackButtonStyles,
} from "./button.styles";

const CUSTOM_VARIANTS = {
  darkBlue: darkBlueStyles,
  lightBlue: lightBlueStyles,
  danger: dangerStyles,
  blackButton: blackButtonStyles,
};

const Button = memo(
  ({
    children,
    variant = "contained",
    size = "medium",
    disabled = false,
    sx,
    ...rest
  }) => {
    const customStyle = CUSTOM_VARIANTS[variant];

    return (
      <MuiButton
        variant={customStyle ? "contained" : variant}
        size={size}
        disabled={disabled}
        sx={[baseStyles, customStyle, sx]}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "contained",
    "outlined",
    "text",
    "darkBlue",
    "lightBlue",
    "danger",
    "blackButton",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  onClick: PropTypes.func,
};

export default Button;
