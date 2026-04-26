import { Box, Paper, Stack, Typography } from "@mui/material";
import Button from "../../components/button/Button";
import MuiTextField from "../../components/fields/MuiTextField";
import { useGlobalStyles } from "../../styles/useGlobalStyles";

const Users = () => {
  const styles = useGlobalStyles();
  return (
    <Box sx={styles.pageContainer}>
      {/* Page Title */}
      <Typography variant="h6" sx={styles.pageTitle}>
        Users
      </Typography>

      {/* Filters Section */}
      <Paper sx={styles.sectionPaper}>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          Filters
        </Typography>

        {/* Responsive Grid Layout */}
        <Box sx={styles.responsiveGrid}>
          {/* Inputs */}
          <MuiTextField
            fullWidth
            label="Full Name"
            placeholder="Enter Full Name"
            size="small"
          />

          <MuiTextField
            fullWidth
            label="Email ID"
            required
            placeholder="Enter Email ID"
            size="small"
          />

          {/* Buttons */}
          <Box sx={styles.actionsBox}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={styles.actionsStack}
            >
              <Button fullWidth variant="contained" color="success">
                Add User
              </Button>

              <Button fullWidth variant="darkBlue">
                Bulk Upload
              </Button>

              <Button fullWidth variant="contained">
                Search
              </Button>

              <Button fullWidth variant="outlined">
                Clear
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Users;
