import React, { useCallback } from "react";
import { Field, useFormikContext } from "formik";
import debounce from "lodash.debounce";

const DebField = ({ name, regex, ...props }) => {
  const { setFieldValue } = useFormikContext();

  // Debounced setter for Formik state
  const debouncedChange = useCallback(
    debounce((value) => {
      setFieldValue(name, value);
      console.log("Debounced Input (Formik updated):", value);
    }, 400),
    [name, setFieldValue]
  );

  return (
    <Field name={name}>
      {({ field }) => (
        <input
          {...props}
          {...field} // gives us value + immediate onChange
          onChange={(e) => {
            const { value } = e.target;
            // If regex is provided, test before proceeding
            if (!regex || regex.test(value)) {
              field.onChange(e); // ✅ update UI immediately
              debouncedChange(value); // ✅ delayed update to Formik
            }
          }}
        />
      )}
    </Field>
  );
};

export default DebField;