import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import PopupSmall from "../../components/popup/PopupSmall";

const ChangePasswordPopup = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.newPassword.length < 10) {
      alert("New password must be at least 10 characters long");
      return;
    }

    if(form.newPassword === form.currentPassword) {
      alert("New password cannot be the same as current password");
      return;
    }

    console.log("Call change password API", form);

    handleClose();
  };

  return (
    <PopupSmall
      open={open}
      handleClose={handleClose}
      title="Change Password"
      submitButtonProps={{
        label: "Update",
        variant: "contained",
        onClick: handleSubmit,
      }}
      cancelButtonProps={{
        label: "Cancel",
        variant: "outlined",
      }}
    >
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField
          label="Current Password"
          type="password"
          name="currentPassword"
          fullWidth
          value={form.currentPassword}
          onChange={handleChange}
        />

        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          fullWidth
          value={form.newPassword}
          onChange={handleChange}
        />

        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          fullWidth
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </Stack>
    </PopupSmall>
  );
};

export default ChangePasswordPopup;
