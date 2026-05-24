import React from "react";
import { Box } from "@mui/material";

export default function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: "10px" }}>{children}</Box>}
    </div>
  );
}
