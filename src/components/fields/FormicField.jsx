import { ErrorMessage, Field } from "formik";
import { FormLabel, Grid } from "@mui/material";
import styles from "./FormicField.module.css";

const FormicField = (props) => {
  const { label, required, name, as, rows, startIcon, ...otherProps } = props;

  return (
    <Grid className={styles.fieldContainer} sx={{ minWidth: 200 }}>
      <FormLabel required={required} className={styles.label}>
        {label}
      </FormLabel>

      <div className={styles.inputWrapper}>
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}

        <Field
          name={name}
          as={as}
          rows={rows}
          className={`${styles.input} ${startIcon ? styles.withIcon : ""}`}
          {...otherProps}
        />
      </div>

      <ErrorMessage name={name} component="div" className={styles.errorText} />
    </Grid>
  );
};

export default FormicField;