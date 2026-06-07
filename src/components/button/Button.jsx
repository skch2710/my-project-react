import React, { memo } from "react";
import PropTypes from "prop-types";
import MuiButton from "@mui/material/Button";
import {
  baseStyles,
  darkBlueStyles,
  lightBlueStyles,
  dangerStyles,
  blackButtonStyles,
  dottedStyles,
} from "./button.styles";

const CUSTOM_VARIANTS = {
  darkBlue: darkBlueStyles,
  lightBlue: lightBlueStyles,
  danger: dangerStyles,
  blackButton: blackButtonStyles,
  dotted: dottedStyles,
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
    "dotted",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  onClick: PropTypes.func,
};

export default Button;
