import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { memo } from "react";
import Button from "../../components/button/Button";
import MuiTextField from "../../components/fields/MuiTextField";
import { useGlobalStyles } from "../../styles/useGlobalStyles";

import {
  userSearchInitialValues,
  userSearchValidationSchema,
} from "./users.helper";
import UsersBulkUpload from "./UsersBulkUpload";

const UserSearchForm = ({ onSearch, onClear }) => {
  const styles = useGlobalStyles();

  return (
    <Formik
      initialValues={userSearchInitialValues}
      validationSchema={userSearchValidationSchema}
      onSubmit={onSearch}
    >
      {({ resetForm }) => (
        <Form>
          <Paper sx={styles.sectionPaper}>
            <Typography variant="subtitle1" sx={styles.subtitle}>
              Filters
            </Typography>

            <Box sx={styles.responsiveGrid}>
              {/* Full Name */}
              <MuiTextField
                name="fullName"
                label="Full Name"
                placeholder="Enter Full Name"
                formik
              />

              {/* Email */}
              <MuiTextField
                name="email"
                label="Email ID"
                placeholder="Enter Email ID"
                required
                formik
              />

              {/* Actions */}
              <Box sx={styles.actionsBox}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  sx={styles.actionsStack}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="button"
                    startIcon={<AddCircleOutlineRoundedIcon />}
                  >
                    Add User
                  </Button>

                  <UsersBulkUpload />

                  {/* Submit handled by Formik */}
                  <Button fullWidth variant="contained" type="submit">
                    Search
                  </Button>

                  {/* Clear via parent */}
                  <Button
                    fullWidth
                    variant="outlined"
                    type="button"
                    onClick={() => {
                      resetForm();
                      onClear?.();
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default memo(UserSearchForm);
