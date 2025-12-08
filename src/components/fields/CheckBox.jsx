import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import { FormLabel, Grid } from "@mui/material";
import styles from "./FormicField.module.css";

const CheckBox = (props) => {
  const { label, required, name, as, rows, startIcon, ...otherProps } = props;

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <Grid className={styles.fieldContainer} sx={{ minWidth: 200 }}>
      <FormLabel required={required} className={styles.label}>
        {label}
      </FormLabel>

      <div className={styles.inputWrapper}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        <CheckBox
          name={name}
          checked={field.value || false}
          onChange={(e) => {
            setFieldValue(name, e.target.checked);
          }}
          {...otherProps}
        />
      </div>

      <ErrorMessage name={name} component="div" className={styles.errorText} />
    </Grid>
  );
};

export default CheckBox;
