import { useState } from "react";

import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

import CustomTabs from "../../components/Tabs/CustomTabs";
import TabPanel from "../../components/Tabs/TabPanel";

import { employeeDetails, employeeSkills } from "./employeeData";

import { pageStyles } from "./EmployeeProfilePage.styles";

export default function EmployeeProfilePage() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "My Info",
      icon: <PersonIcon />,
    },
    {
      label: "Address",
      icon: <LocationOnIcon />,
    },
    {
      label: "Family Details",
      icon: <GroupsIcon />,
    },
    {
      label: "Identity Details",
      icon: <BadgeIcon />,
    },
    {
      label: "Education",
      icon: <SchoolIcon />,
    },
    {
      label: "ID Card",
      icon: <CreditCardIcon />,
    },
  ];

  return (
    <Box>
      <Paper elevation={1} sx={pageStyles.container}>
        <CustomTabs value={value} onChange={handleChange} tabs={tabs} />

        {/* MY INFO */}
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            {/* LEFT PROFILE */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper variant="outlined" sx={pageStyles.leftCard}>
                <Avatar
                  src="https://i.pravatar.cc/300"
                  sx={pageStyles.avatar}
                />

                <Typography variant="h5" fontWeight={700}>
                  John Doe
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Software Engineer
                </Typography>

                <Chip
                  label="Active"
                  color="success"
                  sx={pageStyles.activeChip}
                />

                {/* QUICK INFO */}
                <Box sx={pageStyles.quickInfoContainer}>
                  <Stack>
                    <Box sx={pageStyles.quickInfoRow}>
                      <Typography variant="body2" color="text.secondary">
                        Employee ID
                      </Typography>

                      <Typography fontWeight={600}>EMP001</Typography>
                    </Box>

                    <Box sx={pageStyles.quickInfoRow}>
                      <Typography variant="body2" color="text.secondary">
                        Official Email
                      </Typography>

                      <Typography fontWeight={600}>
                        john.doe@example.com
                      </Typography>
                    </Box>

                    <Box sx={pageStyles.quickInfoRow}>
                      <Typography variant="body2" color="text.secondary">
                        Reporting Manager
                      </Typography>

                      <Typography fontWeight={600}>Jane Smith</Typography>
                    </Box>
                  </Stack>
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
                      <Typography sx={pageStyles.infoLabel}>
                        {item.label}
                      </Typography>

                      <Typography sx={pageStyles.infoValue}>
                        {item.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                {/* SKILLS */}
                <Box sx={pageStyles.skillsContainer}>
                  <Typography variant="h6" sx={pageStyles.sectionTitle}>
                    Skills / Technologies
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                  >
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
        </TabPanel>

        {/* ADDRESS */}
        <TabPanel value={value} index={1}>
          <Typography variant="h6">Address Details</Typography>
        </TabPanel>

        {/* FAMILY */}
        <TabPanel value={value} index={2}>
          <Typography variant="h6">Family Details</Typography>
        </TabPanel>

        {/* IDENTITY */}
        <TabPanel value={value} index={3}>
          <Typography variant="h6">Identity Details</Typography>
        </TabPanel>

        {/* EDUCATION */}
        <TabPanel value={value} index={4}>
          <Typography variant="h6">Education Details</Typography>
        </TabPanel>

        {/* ID CARD */}
        <TabPanel value={value} index={5}>
          <Typography variant="h6">Employee ID Card</Typography>
        </TabPanel>
      </Paper>
    </Box>
  );
}
