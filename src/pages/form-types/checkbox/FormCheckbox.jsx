import React from "react";
import { useField } from "formik";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";

const FormCheckbox = ({ name, label, ...props }) => {
  const [field, helpers] = useField(name);
  const handleChange = (event) => {
    helpers.setValue(event.target.checked);
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          checked={field.value}
          onChange={handleChange}
          name={name}
        />
      }
      label={label}
    />
  );
};

export default FormCheckbox;
