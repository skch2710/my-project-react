import React, { useEffect, useState, useCallback } from "react";
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
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoMdLogOut } from "react-icons/io";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
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

/* ================== DRAWER MIXINS ================== */
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
});

/* ================== STYLES ================== */
const MainDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/* ================== COMPONENT ================== */
export default function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const apiNavigations = useSelector(selectNavigations);
  const userName = useSelector(selectUserName);
  const profileLoaded = useSelector(selectProfileLoaded);
  const loading = useSelector((s) => s.user.profile.loading);

  const [open, setOpen] = useState(true);
  const [navigation, setNavigation] = useState([]);
  const [redirected, setRedirected] = useState(false);

  /* ================== LOAD PROFILE ================== */
  useEffect(() => {
    if (profileLoaded || loading) return;
    dispatch(profile())
      .unwrap()
      .catch(() => {
        dispatch(logoutUser());
        navigate("/login", { replace: true });
      });
  }, [dispatch, profileLoaded, loading, navigate]);

  /* ================== BUILD NAV ================== */
  useEffect(() => {
    if (!apiNavigations?.length) return;

    setNavigation(
      getNav(apiNavigations).map((item) => ({
        ...item,
        collapsed: item.collapsed ?? false,
      }))
    );
  }, [apiNavigations]);

  /* ================== DEFAULT REDIRECT ================== */
  useEffect(() => {
    if (
      navigation.length &&
      !redirected &&
      (location.pathname === "/" || location.pathname === "")
    ) {
      setRedirected(true);
      navigate(navigation[0].resourcePath, { replace: true });
    }
  }, [navigation, redirected, location.pathname, navigate]);

  /* ================== TOGGLE SUB MENU ================== */
  const toggleCollapse = useCallback((index) => {
    setNavigation((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, collapsed: !item.collapsed } : item
      )
    );
  }, []);

  /* ================== LOGOUT ================== */
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  /* ================== LOADER ================== */
  if (loading) {
    return (
      <List sx={{ mt: 8, px: 1 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ListItem key={i}>
            <Skeleton variant="rectangular" width="100%" height={36} />
          </ListItem>
        ))}
      </List>
    );
  }

  /* ================== RENDER ================== */
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APP BAR */}
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, background: "#fff", color: "#000" }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpen((p) => !p)}>
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
      </AppBar>

      {/* DRAWER */}
      <MainDrawer variant="permanent" open={open}>
        <Divider />

        <List sx={{ mt: 8 }}>
          {navigation.map((item, index) => {
            const parentActive = location.pathname.startsWith(
              item.resourcePath
            );

            if (item.subNav?.length) {
              return (
                <React.Fragment key={item.resourceName}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={parentActive}
                      onClick={() => toggleCollapse(index)}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.resourceName}
                        sx={{ opacity: open ? 1 : 0 }}
                      />

                      {/* ✅ Arrow hidden when drawer closed */}
                      {open &&
                        (item.collapsed ? (
                          <ExpandMoreIcon />
                        ) : (
                          <ExpandLessIcon />
                        ))}
                    </ListItemButton>
                  </ListItem>

                  <Collapse in={!item.collapsed}>
                    <List component="div" disablePadding>
                      {item.subNav.map((sub) => (
                        <ListItem
                          key={sub.resourceName}
                          disablePadding
                          sx={{ pl: open ? 4 : 0 }}
                        >
                          <ListItemButton
                            component={NavLink}
                            to={sub.resourcePath}
                            selected={location.pathname === sub.resourcePath}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              {sub.icon}
                            </ListItemIcon>

                            <ListItemText
                              primary={sub.resourceName}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              );
            }

            return (
              <ListItem key={item.resourceName} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.resourcePath}
                  selected={location.pathname === item.resourcePath}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.resourceName}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </MainDrawer>

      {/* CONTENT */}
      <Grid component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Grid>
    </Box>
  );
}
