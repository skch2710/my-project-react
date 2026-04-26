import { FormControl, FormLabel, TextField } from "@mui/material";
import { muiTextFieldStyles } from "./muiTextField.styles";

const MuiTextField = ({ label, required = false, ...props }) => {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel sx={muiTextFieldStyles.formLabel}>{label}</FormLabel>
      <TextField {...props} />
    </FormControl>
  );
};

export default MuiTextField;
