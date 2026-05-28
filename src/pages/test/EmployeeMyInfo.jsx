import {
  Avatar,
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  employeeDetails,
  employeeLeftDetails,
  employeequickInfo,
  employeeSkills,
} from "./employeeData";
import { pageStyles } from "./EmployeeMyInfo.styles";

const EmployeeMyInfo = () => {
  return (
    <Grid container spacing={2}>
      {/* LEFT PROFILE */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper variant="outlined" sx={pageStyles.leftCard}>
          <Avatar src="https://i.pravatar.cc/300" sx={pageStyles.avatar} />

          <Typography variant="h5" fontWeight={700}>
            {employeeLeftDetails.employeeName}
          </Typography>

          <Typography variant="h6" sx={pageStyles.sectionTitle}>
            {employeeLeftDetails.designation}
          </Typography>

          <Chip
            label={employeeLeftDetails.status}
            color={
              employeeLeftDetails.status === "Active" ? "success" : "error"
            }
            sx={pageStyles.activeChip}
          />

          {/* QUICK INFO */}
          <Box sx={pageStyles.quickInfoContainer}>
            {employeequickInfo.map((item) => (
              <Box key={item.label} sx={pageStyles.quickInfoRow}>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography fontWeight={600}>{item.value}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* RIGHT SECTION */}
      <Grid size={{ xs: 12, md: 9 }}>
        <Paper variant="outlined" sx={pageStyles.rightCard}>
          <Typography variant="h6" sx={pageStyles.sectionTitle}>
            Employee Information
          </Typography>

          {/* DETAILS GRID */}
          <Grid container spacing={2}>
            {employeeDetails.map((item) => (
              <Grid
                key={item.label}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <Typography sx={pageStyles.infoLabel}>{item.label}</Typography>

                <Typography sx={pageStyles.infoValue}>{item.value}</Typography>
              </Grid>
            ))}
          </Grid>

          {/* SKILLS */}
          <Box sx={pageStyles.skillsContainer}>
            <Typography variant="h6" sx={pageStyles.sectionTitle}>
              Skills / Technologies
            </Typography>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {employeeSkills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  variant="outlined"
                  color="primary"
                  sx={pageStyles.skillChip}
                />
              ))}
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EmployeeMyInfo;
