import * as Yup from "yup";

/**
 * Initial Values of the form search user
 */
export const userSearchInitialValues = Object.freeze({
  fullName: "",
  email: "",
});

/**
 * Validation Schema for the user search form
 */
export const userSearchValidationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .max(100, "Full Name cannot exceed 100 characters"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
});

export const USER_GRID_TITLE = "Users List";

