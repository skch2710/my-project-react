import React, { useMemo } from "react";
import { Field, useFormikContext } from "formik";
import debounce from "lodash.debounce";

const DebouncedField = ({ name, regex, ...props }) => {
  const { setFieldValue } = useFormikContext();
  
  // Create debounced function with useMemo
  const debouncedChange = useMemo(() => 
    debounce((value, fieldName) => {
      setFieldValue(fieldName, value);
      console.log("Debounced Input (Formik updated):", value);
    }, 400),
    [setFieldValue]
  );

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, [debouncedChange]);

  return (
    <Field name={name}>
      {({ field }) => (
        <input
          {...props}
          {...field}
          onChange={(e) => {
            const { value } = e.target;
            if (!regex || regex.test(value)) {
              field.onChange(e);
              debouncedChange(value, name);
            }
          }}
        />
      )}
    </Field>
  );
};

export default DebouncedField;