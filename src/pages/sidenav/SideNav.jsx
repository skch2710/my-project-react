import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Tooltip,
  Typography,
  Collapse,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoMdLogOut } from "react-icons/io";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  profile,
  selectNavigations,
  selectUserName,
  selectProfileLoaded,
} from "../../store/slices/userSlice";
import { logoutUser } from "../../store/slices/authSlice";
import { getNav } from "./helper";
import logo from "../../assets/logo.png";

const drawerWidth = 220;

/* ================== DRAWER STYLES ================== */
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const MainAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/* ================== KEY GENERATOR ================== */
const generateKey = (item, index, parentIndex = null) => {
  if (item.resourceId) return `nav-${item.resourceId}`;
  if (item.resourceName) return `nav-${item.resourceName.replace(/\s+/g, "-")}`;
  if (parentIndex !== null) return `nav-${parentIndex}-${index}`;
  return `nav-${index}`;
};

/* ================== COMPONENT ================== */
export default function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const apiNavigations = useSelector(selectNavigations);
  const userName = useSelector(selectUserName);
  const profileLoaded = useSelector(selectProfileLoaded);
  const loading = useSelector((state) => state.user.load.loading);
  const emailId = useSelector((state) => state.auth.emailId);

  const [open, setOpen] = useState(true);
  const [navigation, setNavigation] = useState([]);
  const [redirected, setRedirected] = useState(false);

  /* ================== LOAD PROFILE (ONCE) ================== */
  useEffect(() => {
    // Block if already loaded OR already loading
    if (profileLoaded || loading) return;

    const loadProfile = async () => {
      try {
        await dispatch(profile({ emailId })).unwrap();
      } catch (err) {
        dispatch(logoutUser());
        navigate("/login", { replace: true });
      }
    };

    loadProfile();
  }, [dispatch, emailId, profileLoaded, loading, navigate]);

  /* ================== BUILD NAV + REDIRECT ================== */
  useEffect(() => {
    if (!apiNavigations?.length) return;

    const nav = getNav(apiNavigations);
    setNavigation(nav);

    if (
      !redirected &&
      (location.pathname === "/" || location.pathname === "")
    ) {
      setRedirected(true);
      navigate(nav[0].resourcePath, { replace: true });
    }
  }, [apiNavigations, location.pathname, navigate, redirected]);

  /* ================== LOGOUT ================== */
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  /* ================== LOADER ================== */
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  /* ================== RENDER ================== */
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ================== APP BAR ================== */}
      <MainAppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#fff", color: "#000" }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            <MenuIcon />
          </IconButton>

          <img
            src={logo}
            alt="Logo"
            width={160}
            height={50}
            style={{ marginLeft: 20 }}
          />

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2 }}>{userName || "User"}</Typography>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout}>
                <IoMdLogOut />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </MainAppBar>

      {/* ================== DRAWER ================== */}
      <MainDrawer variant="permanent" open={open}>
        <Divider />
        <List sx={{ mt: 8 }}>
          {navigation.map((item, index) => {
            const key = generateKey(item, index);

            if (item.subNav?.length) {
              return (
                <React.Fragment key={key}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        setNavigation((prev) =>
                          prev.map((nav, i) =>
                            i === index
                              ? { ...nav, collapsed: !nav.collapsed }
                              : nav
                          )
                        )
                      }
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.resourceName} />
                      {item.collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={!item.collapsed} timeout="auto">
                    <List component="div" disablePadding>
                      {item.subNav.map((sub, i) => (
                        <ListItem
                          key={generateKey(sub, i, index)}
                          disablePadding
                          sx={{ pl: 4 }}
                        >
                          <ListItemButton
                            component={Link}
                            to={sub.resourcePath}
                          >
                            <ListItemIcon>{sub.icon}</ListItemIcon>
                            <ListItemText primary={sub.resourceName} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }

            return (
              <ListItem key={key} disablePadding>
                <ListItemButton component={Link} to={item.resourcePath}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.resourceName} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </MainDrawer>

      {/* ================== CONTENT ================== */}
      <Grid component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Grid>
    </Box>
  );
}
