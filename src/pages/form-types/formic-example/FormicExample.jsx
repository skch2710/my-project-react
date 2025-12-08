import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./yupValidation";
import DebouncedField from "../debounced-field/DebouncedField";
import Toggle from "../toggle/Toggle";
import FormCheckbox from "../checkbox/FormCheckbox";
import { REGEX } from "../../../utils/constants";
import DebField from "../debounced-field/DebField";
import { FormLabel } from "@mui/material";
import { useGlobalStyles } from "../../../styles/useGlobalStyles";


const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  roleId: 0,
  isParticipating: false,
  isChecked: false,
};

const roles = [
  { roleId: 1, roleName: "Admin" },
  { roleId: 2, roleName: "Editor" },
  { roleId: 3, roleName: "Viewer" },
];

const handleSubmit = (values, { setSubmitting, resetForm }) => {
  const selectedRole = roles.find(
    (role) => role.roleId === Number(values.roleId)
  );
  values.role = selectedRole || { roleId: 0, roleName: "" };
  values.roleName = selectedRole ? selectedRole.roleName : "";

  console.log("Form submitted:", values);
  setTimeout(() => {
    setSubmitting(false);
    resetForm();
  }, 1000);
};

const FormicExample = () => {
  const globalClasses = useGlobalStyles();
  const [toggleState, setToggleState] = useState(false);

  return (
    <div>
      <h3>Formik Form Example with Yup Validation</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={true}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          // Use useEffect to sync toggleState when values.isParticipating changes
          useEffect(() => {
            setToggleState(values.isParticipating);
          }, [values.isParticipating]);

          return (
            <Form>
              <div>
                {/* <label htmlFor="firstName">First Name * : </label> */}
                <FormLabel required={true}>First Name</FormLabel>
                <DebouncedField
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={globalClasses.formControl}
                  placeholder="Enter your first name"
                />
                <div sx={{ fontSize: '12px', color: 'red' }}>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>                
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name * : </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={globalClasses.formControl}
                  placeholder="Enter your last name"
                  maxLength="25"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email * : </label>
                <DebouncedField
                  type="email"
                  id="email"
                  name="email"
                  className={globalClasses.formControl}
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              {/* Numeric Input Phone Number */}
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number * : </label>

                <DebField
                  name="phoneNumber"
                  type="text"
                  className={globalClasses.formControl}
                  placeholder="Enter phone number"
                  maxLength="14"
                  regex={REGEX.numericTwoDecimals}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Select Role* : </label>
                <Field
                  as="select"
                  id="role"
                  name="roleId"
                  className={globalClasses.formControl}
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="roleId" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="toggle">Enable Participation : </label>
                <Toggle
                  name="isParticipating"
                  label="Participate"
                  onToggle={(checked) => {
                    setToggleState(checked);
                    setFieldValue("isParticipating", checked);
                  }}
                />
                <div>
                  Toggle state in component: {toggleState ? "On" : "Off"}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="checkbox">Accept Terms and Conditions : </label>
                <FormCheckbox
                  name="isChecked"
                  label="I accept the terms and conditions"
                  disabled={!toggleState}
                />
              </div>

              <div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormicExample;
