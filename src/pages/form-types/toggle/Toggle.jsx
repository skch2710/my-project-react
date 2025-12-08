import React from "react";
import { useField } from "formik";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

const Toggle = ({ name, label, ...props }) => {
  const [field, , helpers] = useField(name);
  const handleChange = (event) => {
    helpers.setValue(event.target.checked);
    if (props.onToggle) {
      props.onToggle(event.target.checked);
    }
  };
  return (
    <FormControlLabel
      control={
        <Switch
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

export default Toggle;
