import React, { useState } from "react";
import { Box, Typography, Menu, MenuItem, Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockResetIcon from "@mui/icons-material/LockReset";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const UserMenu = ({ userName, onChangePassword }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    handleMenuClose();
    onChangePassword();
  };

  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <>
      <Box
        onClick={handleUserClick}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mr: 2,
          gap: 1,
          userSelect: "none",
          "&:hover": {
            color: "#1976d2",
          },
        }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: 14,
            bgcolor: "#1976d2",
          }}
        >
          {avatarLetter}
        </Avatar>

        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{userName || "User"}</Typography>

        <ArrowDropDownIcon
          sx={{
            transition: "0.2s",
            transform: openMenu ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
            },
          },
        }}
      >
        <MenuItem
          onClick={handleChangePassword}
          sx={{
            "&:hover": {
              color: "#1976d2",
              backgroundColor: "#f0f7ff",
            },
          }}
        >
          <LockResetIcon sx={{ mr: 1, fontSize: 20 }} />
          Change Password
        </MenuItem>

        <MenuItem
          sx={{
            "&:hover": {
              color: "#1976d2",
              backgroundColor: "#f0f7ff",
            },
          }}
        >
          <InfoOutlinedIcon sx={{ mr: 1, fontSize: 20 }} />
          About You
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
