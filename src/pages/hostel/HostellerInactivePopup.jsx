import React, { memo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PopupSmall from "../../components/popup/PopupSmall";
import { inactiveHosteller } from "../../store/slices/hostelSlice";

const HostellerInactivePopup = ({ open, row, onClose, onSuccess, loading }) => {
  const dispatch = useDispatch();

  const handleInactive = useCallback(async () => {
    if (!row) return;
    try {
      await dispatch(
        inactiveHosteller({
          hostellerId: row.hostellerId,
          emailId: row.emailId,
        })
      ).unwrap();

      toast.success("Hosteller inactivated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Inactive hosteller failed:", error);
    }
  }, [dispatch, row, onSuccess]);

  return (
    <PopupSmall
      open={open}
      handleClose={onClose}
      title="Inactive Hosteller"
      submitButtonProps={{
        label: "Yes, Inactivate",
        onClick: handleInactive,
        color: "success",
        disabled: loading,
      }}
      cancelButtonProps={{
        label: "Cancel",
        color: "error",
        variant: "outlined",
        onClick: onClose,
        disabled: loading,
      }}
    >
      <Box sx={{ pt: 1 }}>
        <Typography>
          Inactivate <b>{row?.fullName}</b> hosteller?
        </Typography>
      </Box>
    </PopupSmall>
  );
};

export default memo(HostellerInactivePopup);
