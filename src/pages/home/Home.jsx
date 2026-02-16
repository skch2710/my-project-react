import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserName } from "../../store/slices/userSlice";
import Timer from "../../components/timer/Timer";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const [expired, setExpired] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Typography variant="subtitle1">Home Page</Typography>
      <Typography
        variant="subtitle1"
        color="blue"
      >{`Welcome, ${userName}!`}</Typography>

      {expired ? (
        <Typography variant="body1" color="red">
          Timer has expired. Please request a new one.
        </Typography>
      ) : null}

      <Timer
        minutes={2}
        restartKey={restartKey}
        onExpire={() => {
          console.log("OTP expired");
          setExpired(true);
        }}
      />

      <button
        onClick={() => {
          setExpired(false);
          setRestartKey((k) => k + 1);
        }}
      >
        Resend OTP
      </button>
    </Grid>
  );
};

export default Home;
