import { CircularProgress, Box } from "@mui/material";
import React from "react";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(201, 196, 196, 0.6)",
        zIndex: 20,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
