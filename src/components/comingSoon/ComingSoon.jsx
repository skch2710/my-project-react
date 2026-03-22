import { Box, Typography } from "@mui/material";
import sand from "../../assets/sand.gif";

const ComingSoon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 18,
      }}
    >
      <Box sx={{ width: 100, height: 100 }}>
        <img src={sand} alt="Sand" style={{ width: "100%", height: "100%" }} />
      </Box>
      <Typography variant="h4" fontWeight="bold">
        Coming Soon...
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This feature is under development.
      </Typography>
    </Box>
  );
};

export default ComingSoon;
