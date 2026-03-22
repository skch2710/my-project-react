import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const MuiTextFieldPassword = (props) => {
  const {
    label,
    name,
    placeholder,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
        {label} <span style={{ color: "red" }}>*</span>
      </Typography>

      <TextField
        fullWidth
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon color="action" />
                  ) : (
                    <VisibilityOutlinedIcon color="action" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default MuiTextFieldPassword;
