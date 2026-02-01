import { Box, Card, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

import LoginForm from "./LoginForm";
import logo from "../../assets/logo.png";
import { copyRightMessage } from "./helper";

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        bgcolor: "#f3f6f6ff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          flex: { xs: "unset", md: 1 },
          justifyContent: "center",
          alignItems: { xs: "flex-start", md: "center" },
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 2 }, // ✅ reduce to avoid scroll
        }}
      >
        {/* Desktop Logo */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 600,
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Grid>

        {/* Login Card */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: { xs: 380, sm: 420, md: 460 },
              p: { xs: 2.5, sm: 3, md: 3 }, // ✅ reduced padding
              borderRadius: 5,
              boxShadow: "0px 20px 50px rgba(0,0,0,0.12)",
              mt: { xs: 1, md: 0 },
            }}
          >
            {/* Mobile Logo inside card */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                mb: 1.5,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  width: { xs: 160, sm: 200 },
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>

            <LoginForm />
          </Card>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box
        sx={{
          mt: { xs: 2, md: "auto" },
          textAlign: "center",
          py: 1.5,
        }}
      >
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {copyRightMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
