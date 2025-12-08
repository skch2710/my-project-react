import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from "../fields/FormicField.module.css";
import { ErrorMessage } from "formik";
import { FormLabel, Grid } from "@mui/material";

const Dropdown = (props) => {
  const {
    name,
    required,
    label,
    placeholder,
    options,
    getOptionLabel,
    onChange,
  } = props;
  return (
    <Grid className={styles.fieldContainer}>
      <FormLabel required={required} className={styles.label}>
        {label}
      </FormLabel>
      <Grid>
        <Autocomplete
          disablePortal
          {...props}
          onChange={onChange}
          options={options}
          getOptionLabel={getOptionLabel}
          slotProps={{
            listbox: {
              sx: {
                "& li": {
                  fontSize: "12px",
                  // padding: "4px 8px",
                  lineHeight: "1.2",
                },
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              placeholder={placeholder}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                  padding: "4px 8px !important",
                },
              }}
              {...params}
            />
          )}
          sx={{
            "& .MuiAutocomplete-inputRoot": {
              padding: "0 !important",
              height: "30px !important",
            },
          }}
        />
      </Grid>
      <ErrorMessage name={name} component="div" className={styles.errorText} />
    </Grid>
  );
};

export default Dropdown;
