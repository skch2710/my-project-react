import React from "react";
import { Tabs, Tab } from "@mui/material";

import { tabsStyles, tabStyles } from "./CustomTabs.styles";

export default function CustomTabs({ value, onChange, tabs }) {
  return (
    <Tabs value={value} onChange={onChange} sx={tabsStyles}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          icon={tab.icon}
          iconPosition="start"
          label={tab.label}
          sx={tabStyles}
        />
      ))}
    </Tabs>
  );
}
