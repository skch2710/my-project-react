import * as Yup from "yup";

export const loginForm = {
  emailId: "",
  password: "",
};

export const validationSchema = Yup.object({
  emailId: Yup.string()
    .email("Invalid email format")
    .required("Email ID is required"),
  password: Yup.string().trim().required("Password is required"),
});

export const copyRightMessage = `© 2025 Sathish Kumar CH. All rights reserved.`;
