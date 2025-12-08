import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Grid, Tooltip, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import {
  selectNavigations,
  selectUserName,
} from "../../store/slices/userSlice";
import { logoutUser } from "../../store/slices/authSlice";
import { getNav } from "./helper";
import logo from "../../assets/logo.png";

const drawerWidth = 220;

/* ================== STYLES ================== */

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
  const [open, setOpen] = useState(true);
  const [navigation, setNavigation] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ from userSlice
  const apiNavigations = useSelector(selectNavigations);
  const userName = useSelector(selectUserName);

  /* ---------- Convert API Nav ---------- */
  useEffect(() => {
    if (apiNavigations?.length) {
      setNavigation(getNav(apiNavigations));
    }
  }, [apiNavigations]);

  const handleDrawer = () => setOpen(!open);

  const handleCollapseToggle = (index) => {
    setNavigation((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, collapsed: !item.collapsed } : item
      )
    );
  };

  /* ---------- Logout ---------- */
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // ✅ Auth cleared
      navigate("/login", { replace: true });
    } catch {
      navigate("/login", { replace: true });
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ================== APP BAR ================== */}
      <MainAppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff", color: "#2f2f2f", boxShadow: 1 }}
        open={open}
      >
        <Toolbar>
          <IconButton onClick={handleDrawer} edge="start">
            <MenuIcon />
          </IconButton>

          <img
            src={logo}
            alt="Logo"
            width={160}
            height={50}
            style={{ marginLeft: 20 }}
          />

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: 2 }}>
              {userName || "User"}
            </Typography>

            <Tooltip title="Logout" arrow>
              <IconButton onClick={handleLogout}>
                <IoMdLogOut style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </div>
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
                    <ListItemButton onClick={() => handleCollapseToggle(index)}>
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
