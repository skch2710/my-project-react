import { useField } from "formik";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { muiTextFieldStyles } from "./muiTextField.styles";

const MuiTextField = ({
  name,
  label,
  required = false,
  formik = false,
  ...props
}) => {
  let fieldProps = {};
  let meta = {};

  if (formik && name) {
    const [field, metaData] = useField(name);
    fieldProps = field;
    meta = metaData;
  }

  const error = formik ? meta.touched && Boolean(meta.error) : props.error;

  const helperText = formik ? meta.touched && meta.error : props.helperText;

  return (
    <FormControl fullWidth required={required}>
      {label && (
        <FormLabel sx={muiTextFieldStyles.formLabel}>{label}</FormLabel>
      )}

      <TextField
        {...fieldProps}
        {...props}
        name={name}
        error={error}
        helperText={helperText}
        size="small"
      />
    </FormControl>
  );
};

export default MuiTextField;
