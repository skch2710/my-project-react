import { useState } from "react";

import {
  Box,
  Paper,
  Typography
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GroupsIcon from "@mui/icons-material/Groups";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

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
          <EmployeeMyInfo />
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
          <EmployeeIdCard />
        </TabPanel>
      </Paper>
    </Box>
  );
}
