import { useState } from "react";

import { Box, Paper, Typography } from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CustomTabs from "../../components/Tabs/CustomTabs";
import TabPanel from "../../components/Tabs/TabPanel";

import EmployeeIdCard from "./EmployeeIdCard";
import EmployeeMyInfo from "./EmployeeMyInfo";
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
      label: "Project Details",
      icon: <WorkIcon />,
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

  const panels = [
    <EmployeeMyInfo />,
    <Typography variant="h6">Project Details</Typography>,
    <Typography variant="h6">Address Details</Typography>,
    <Typography variant="h6">Family Details</Typography>,
    <Typography variant="h6">Identity Details</Typography>,
    <Typography variant="h6">Education Details</Typography>,
    <EmployeeIdCard />,
  ];

  return (
    <Box>
      <Paper elevation={1} sx={pageStyles.container}>
        <CustomTabs value={value} onChange={handleChange} tabs={tabs} />

        {panels.map((panelContent, idx) => (
          <TabPanel value={value} index={idx} key={idx}>
            {panelContent}
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
}
