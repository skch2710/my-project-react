import { Box, LinearProgress, Typography } from "@mui/material";

const LinearProgressUpload = ({value}) => {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        Uploading… {value}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 3,
          mt: 0.5,
          "& .MuiLinearProgress-bar": {
            backgroundColor: "green",
          },
        }}
      />
    </Box>
  );
};

export default LinearProgressUpload;
