import { Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiTextFieldPassword from "../../components/fields/MuiTextFieldPassword";
import Loader from "../../components/loader/Loader";
import PopupSmall from "../../components/popup/PopupSmall";
import { changePassword } from "../../store/slices/userSlice";
import { form, validationSchema } from "./helper";
import { toast } from "react-toastify";

const ChangePasswordPopup = ({ open, handleClose }) => {
  const [intialValues, setInitialValues] = useState(form);
  const formikRef = useRef(null);

  const dispatch = useDispatch();

  const changePassApiError = useSelector((state) => state.user.error);

  const changePassApiLoading = useSelector((state) => state.user.loading);

  const handleSubmit = async (values) => {
    console.log("Change Password Form Values: ", values);
    const response = await dispatch(changePassword(values));
    console.log("Change Password Response: ", response);
    if (response.type === "user/changePassword/fulfilled") {
      toast.success(
        response.payload.successMessage || "Password changed successfully",
      );
      handleClose();
    }
  };

  return (
    <>
      <PopupSmall
        open={open}
        handleClose={handleClose}
        title="Change Password"
        submitButtonProps={{
          label: "Save",
          variant: "contained",
          onClick: () => formikRef.current?.submitForm(),
        }}
        cancelButtonProps={{
          label: "Cancel",
          variant: "outlined",
        }}
        maxWidth="sm"
      >
        <Formik
          innerRef={formikRef}
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              {/* Errors */}
              {changePassApiError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {changePassApiError}
                </Alert>
              )}

              {/* Current Password */}
              <MuiTextFieldPassword
                label="Current Password"
                name="currentPassword"
                placeholder="Enter Current Password"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />

              {/* New Password */}
              <MuiTextFieldPassword
                label="New Password"
                name="newPassword"
                placeholder="Enter New Password"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />

              {/* Confirm New Password */}
              <MuiTextFieldPassword
                label="Confirm New Password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
              />
            </Form>
          )}
        </Formik>
      </PopupSmall>
      {changePassApiLoading && <Loader />}
    </>
  );
};

export default ChangePasswordPopup;
