import { Box, Paper, Stack, Typography } from "@mui/material";
import Button from "../../components/button/Button";
import MuiTextField from "../../components/fields/MuiTextField";

const Users = () => {
  return (
    <Box sx={{ p: { xs: 1.5, md: 2 } }}>
      {/* Page Title */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Users
      </Typography>

      {/* Filters Section */}
      <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Filters
        </Typography>

        {/* Responsive Grid Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
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
          <Box
            sx={{
              gridColumn: { xs: "1", sm: "1 / -1" },
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              mt: { xs: 1, md: 0 },
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{
                width: { xs: "100%", md: "auto" },
                alignItems: { xs: "stretch", md: "center" },
              }}
            >
              <Button fullWidth variant="contained" color="success">
                Add User
              </Button>

              <Button fullWidth variant="contained" color="info">
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
