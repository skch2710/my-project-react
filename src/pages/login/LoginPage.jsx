import { Grid, Box, Divider, Paper, Alert } from "@mui/material";
import LoginForm from "./LoginForm";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { copyRightMessage } from "./helper";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.user);
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{ minHeight: "100vh", backgroundColor: "#f3f6f6ff" }}
    >
      {/* Main content */}
      <Grid>
        <Grid container spacing={3}>
          <Grid
            container
            size={6}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              // border: 1,
              // borderColor: "red",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 600,
                height: "auto",
              }}
            />
          </Grid>

          <Grid
            size={5}
            sx={{ /*border: 1, borderColor: "red",*/ marginTop: 8 }}
          >
            <Paper elevation={3} sx={{ padding: 4 }}>
              <LoginForm />
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid>
        <Box textAlign="center" p={2}>
          <Divider />
          <Box mt={2} fontSize={14} color="gray">
            {copyRightMessage}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
