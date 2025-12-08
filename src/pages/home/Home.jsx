import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../../store/slices/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Typography variant="subtitle1">Home Page</Typography>
      <Typography
        variant="subtitle1"
        color="blue"
      >{`Welcome, ${userName}!`}</Typography>
    </Grid>
  );
};

export default Home;
