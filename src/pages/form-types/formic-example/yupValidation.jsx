import * as Yup from "yup";
import debounce from "lodash.debounce";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .test("checkEmailExists", "Email already exists", async function (value) {
      if (!value) return true; // Skip if empty, required handles this
      // Check if format is valid before making API call
      const isValidFormat = Yup.string().email().isValidSync(value);
      if (!isValidFormat) return true; // Skip API check if format is invalid
      const exists = await checkEmailExists(value);
      return !exists; // Return true if email does not exist
    }),
    roleId: Yup.number()
    .required("Please select a role")
    .min(1, "Please select a role"),
});

// Mock API check function
const checkEmailExistsAPI = async (email) => {
  console.log("Checking email:", email);
  if (email === "test@example.com") return true; // pretend this email exists
  return false;
};

// Create a debounced version of the API call
const debouncedCheckEmailExists = debounce(async (email, callback) => {
  const exists = await checkEmailExistsAPI(email);
  callback(exists);
}, 800); // 800 ms debounce delay

// Wrapper to return a Promise for Yup's test
const checkEmailExists = (email) => {
  return new Promise((resolve) => {
    debouncedCheckEmailExists(email, resolve);
  });
};
