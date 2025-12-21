// src/components/loader/Loader.jsx
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  console.log("Loader rendered");
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(201, 196, 196, 0.6)",
        zIndex: 2000,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;