import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormLabel, Grid } from "@mui/material";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./FormicField.module.css";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../utils/constants";

const FormicDatePicker = ({ name, label, required, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <Grid className={styles.fieldContainer}>
      <FormLabel required={required} className={styles.label}>
        {label}
      </FormLabel>
      <Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...props}
            views={["year", "month", "day"]}
            disableHighlightToday={false}
            value={field.value ? dayjs(field.value, DATE_FORMAT) : null}
            onChange={(date) =>
              setFieldValue(name, date ? date.format(DATE_FORMAT) : "")
            }
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                sx: {
                  maxWidth: 200,
                },
              },
              field: {
                clearable: true,
                onClear: () => setFieldValue(name, null),
              },
              actionBar: {
                actions: ["clear", "today"],
                sx: {
                  borderTop: () => `1px solid gray`,
                  mt: 0, // Remove top margin (gap)
                  pt: 1, // Small padding above buttons
                  pb: 1,
                  px: 2, // Optional side padding
                  textTransform: "none",
                },
              },
              openPickerIcon: {
                sx: {
                  fontSize: 14,
                },
              },
              clearIcon: {
                sx: {
                  fontSize: 14,
                },
              },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <ErrorMessage name={name} component="div" className={styles.errorText} />
    </Grid>
  );
};

export default FormicDatePicker;
