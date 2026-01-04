import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Alert, Divider, FormLabel, Grid, Typography } from "@mui/material";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FormicField from "../../components/fields/FormicField";
import Button from "../../components/button/Button";
import MuiCheckbox from "../../components/checkbox/MuiCheckbox";
import { loginForm, validationSchema } from "./helper";
import { encrypt, decrypt } from "../../utils/aesHelper";

import {
  loginUser,
  resetLoginState,
  selectLoginError,
  selectLoginLoading,
} from "../../store/slices/authSlice";
import { clearSessionExpired } from "../../store/slices/sessionSlice";
import { SSO_LOGIN_API } from "../../utils/constants";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginError = useSelector(selectLoginError);
  const loginLoading = useSelector(selectLoginLoading);
  const sessionExpired = useSelector((state) => state.session.sessionExpired);

  const [rememberMe, setRememberMe] = useState(false);
  const [initialValues, setInitialValues] = useState(loginForm);
  const ssoUrl = import.meta.env.VITE_API_URL + SSO_LOGIN_API;

  /* ================== LOAD REMEMBER ME ================== */
  useEffect(() => {
    const loadData = async () => {
      const stored = localStorage.getItem("rememberMe");
      if (stored) {
        const parsed = JSON.parse(stored);
        const decryptedPassword = parsed.password
          ? await decrypt(parsed.password)
          : "";

        setRememberMe(true);
        setInitialValues({
          emailId: parsed.emailId || "",
          password: decryptedPassword || "",
        });
      }
    };
    loadData();
  }, []);

  /* ================== CLEANUP ================== */
  useEffect(() => {
    return () => {
      dispatch(resetLoginState());
    };
  }, [dispatch]);

  /* ================== SUBMIT ================== */
  const handleSubmit = async (values) => {
    try {
      dispatch(clearSessionExpired());

      const encryptedPassword = await encrypt(values.password);

      const payload = {
        ...values,
        password: encryptedPassword,
      };

      await dispatch(loginUser(payload)).unwrap();
      toast.success("Login successful!");

      if (rememberMe) {
        localStorage.setItem(
          "rememberMe",
          JSON.stringify({
            emailId: values.emailId,
            password: encryptedPassword,
          })
        );
      } else {
        localStorage.removeItem("rememberMe");
      }
    } catch (err) {
      toast.error(err || "Login failed");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Form id="loginForm">
          <Grid container spacing={2} flexDirection="column">
            {loginError && <Alert severity="error">{loginError}</Alert>}
            {sessionExpired && (
              <Alert severity="error">
                Your session expired due to inactivity.
              </Alert>
            )}

            <Typography variant="h5" mb={2}>
              Login to Your Account
            </Typography>

            <Grid size={6}>
              <FormicField
                startIcon={<MailLockOutlinedIcon fontSize="small" />}
                type="email"
                name="emailId"
                label="Email ID"
                placeholder="Enter Email ID"
                required
              />
            </Grid>

            <Grid size={6}>
              <FormicField
                startIcon={<LockOutlineIcon fontSize="small" />}
                type="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                required
              />
            </Grid>

            <Grid size={6}>
              <MuiCheckbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <FormLabel>Remember Me</FormLabel>
            </Grid>

            <Grid size={7} justifyContent="flex-end" container>
              <Button
                color="primary"
                label="Login"
                onClick={handleSubmit}
                loading={loginLoading}
                disabled={loginLoading}
              />
            </Grid>

            <Divider>(OR)</Divider>

            <Grid size={7} container>
              <Button
                color="secondary"
                label="Login With Auth SSO"
                onClick={() => {
                  window.location.href = ssoUrl;
                }}
                // loading={loginLoading}
                // disabled={loginLoading}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
