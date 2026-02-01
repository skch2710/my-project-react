import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import MuiCheckbox from "../../components/checkbox/MuiCheckbox";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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

  const loginError = useSelector(selectLoginError);
  const loginLoading = useSelector(selectLoginLoading);
  const sessionExpired = useSelector((state) => state.session.sessionExpired);

  const [rememberMe, setRememberMe] = useState(false);
  const [initialValues, setInitialValues] = useState(loginForm);

  const [showPassword, setShowPassword] = useState(false);

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
  const handleLogin = async (values) => {
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
      onSubmit={handleLogin}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          {/* Header */}
          <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
            Sign in
          </Typography>

          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            New user?{" "}
            <Link href="#" underline="hover" fontWeight={600}>
              Create an account
            </Link>
          </Typography>

          {/* Errors */}
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}

          {sessionExpired && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Your session expired due to inactivity.
            </Alert>
          )}

          {/* Email */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              Email Address <span style={{ color: "red" }}>*</span>
            </Typography>

            <TextField
              fullWidth
              name="emailId"
              placeholder="Enter Email ID"
              value={values.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.emailId && Boolean(errors.emailId)}
              helperText={touched.emailId && errors.emailId}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Password */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
              Password <span style={{ color: "red" }}>*</span>
            </Typography>

            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon color="action" />
                        ) : (
                          <VisibilityOutlinedIcon color="action" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Remember + Forgot */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            {/* Left */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MuiCheckbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <FormLabel sx={{ fontSize: 16, cursor: "pointer" }}>
                Remember Me
              </FormLabel>
            </Box>

            {/* Right */}
            <Link href="#" underline="hover" fontSize={14} fontWeight={600}>
              Forgot password?
            </Link>
          </Box>

          {/* Login Button - BLACK */}
          <Button
            type="submit"
            fullWidth
            disabled={loginLoading}
            variant="contained"
            sx={{
              py: 1.3,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 16,
              bgcolor: "#111",
              "&:hover": { bgcolor: "#000" },
              mb: 2,
            }}
          >
            {loginLoading ? "Logging in..." : "LOGIN"}
          </Button>

          {/* Divider OR */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* Social header */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 1.5 }}
          >
            Join With Your Favourite Social Media Account
          </Typography>

          {/* Social icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 1, // ✅ reduced (no empty space)
            }}
          >
            <IconButton
              onClick={() => {
                window.location.href = ssoUrl;
              }}
              sx={{
                width: 40,
                height: 40,
                border: "1px solid #e5e7eb",
              }}
            >
              S
            </IconButton>

            <IconButton
              sx={{
                width: 40,
                height: 40,
                border: "1px solid #e5e7eb",
              }}
            >
              <GoogleIcon />
            </IconButton>

            <IconButton
              sx={{
                width: 40,
                height: 40,
                border: "1px solid #e5e7eb",
              }}
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
