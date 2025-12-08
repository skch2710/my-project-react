import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Alert, FormLabel, Grid, Typography } from "@mui/material";
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Use selectors from auth slice
  const loginError = useSelector(selectLoginError);
  const loginLoading = useSelector(selectLoginLoading);

  const [rememberMe, setRememberMe] = useState(false);
  const [initialValues, setInitialValues] = useState(loginForm);

  // ✅ Load remember-me from localStorage
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

  // ✅ Clear login error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetLoginState());
    };
  }, [dispatch]);

  const handleSubmit = async (values) => {
    console.log("Login Form Values:", values);
    try {
      const encryptedPassword = await encrypt(values.password);
      const payload = {
        ...values,
        password: encryptedPassword,
      };

      const result = await dispatch(loginUser(payload));

      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");

        if (rememberMe) {
          localStorage.setItem(
            "rememberMe",
            JSON.stringify({
              emailId: values.emailId,
              password: encryptedPassword,
            })
          );
        } else if (!rememberMe && localStorage.getItem("rememberMe")) {
          localStorage.removeItem("rememberMe");
        }

        // Clear any previous login error
        dispatch(resetLoginState());

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An unexpected error occurred");
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
          <Grid container spacing={2} flexDirection={"column"}>
            {/* ✅ Error from auth slice */}
            {loginError && <Alert severity="error">{loginError}</Alert>}

            <Typography variant="h5" mb={2}>
              Login to Your Account !
            </Typography>

            {/* EmailId Field */}
            <Grid size={6}>
              <FormicField
                startIcon={<MailLockOutlinedIcon fontSize="small" />}
                type="email"
                name="emailId"
                label="Email ID"
                placeholder="Enter Email ID"
                maxLength={100}
                required
              />
            </Grid>

            {/* Password Field */}
            <Grid size={6}>
              <FormicField
                startIcon={<LockOutlineIcon fontSize="small" />}
                type="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                maxLength={50}
                required
              />
            </Grid>

            {/* Remember Me */}
            <Grid size={6}>
              <MuiCheckbox
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <FormLabel>Remember Me</FormLabel>
            </Grid>

            {/* Submit Button */}
            <Grid size={7} justifyContent="flex-end" container display="flex">
              <Button
                label="Login"
                color="primary"
                onClick={handleSubmit}
                loading={loginLoading}
                disabled={loginLoading}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
