import { useState } from "react";
import MuiTable from "../../components/table/MuiTable";
import Popup from "../../components/popup/Popup";
import Button from "../../components/button/Button";
import { Grid } from "@mui/material";

const Test = () => {
  const headers = [
    { label: "Module", field: "module" },
    { label: "Read", field: "read", type: "checkbox" },
    { label: "Write", field: "write", type: "checkbox" },
    { label: "Terminate", field: "terminate", type: "checkbox" },
  ];

  const [rows, setRows] = useState([
    {
      module: "Dashboard",
      read: true,
      write: true,
      terminate: false,
      disabled: true,
    },
    {
      module: "Reports",
      read: true,
      write: false,
      terminate: false,
      disabled: false,
    },
    {
      module: "User Management",
      read: true,
      write: false,
      terminate: true,
      disabled: false,
    },
    {
      module: "Settings",
      read: false,
      write: false,
      terminate: false,
      disabled: true,
    },
    {
      module: "Notifications",
      read: true,
      write: true,
      terminate: true,
      disabled: false,
    },
    {
      module: "Integrations",
      read: false,
      write: false,
      terminate: false,
      disabled: true,
    },
    {
      module: "API Access",
      read: true,
      write: false,
      terminate: false,
      disabled: false,
    },
    {
      module: "Audit Logs",
      read: true,
      write: false,
      terminate: false,
      disabled: false,
    },
    {
      module: "Billing",
      read: false,
      write: false,
      terminate: false,
      disabled: true,
    },
    {
      module: "Support",
      read: true,
      write: true,
      terminate: false,
      disabled: false,
    },
    {
      module: "Feedback",
      read: true,
      write: false,
      terminate: false,
      disabled: false,
    },
    {
      module: "Activity Log",
      read: true,
      write: false,
      terminate: true,
      disabled: false,
    },
  ]);

  const handleChange = (rowIndex, field, value) => {
    const updated = [...rows];
    updated[rowIndex][field] = value;
    setRows(updated);
  };

  const [open, setOpen] = useState(false);

  const openPopup = () => setOpen(true);
  const closePopup = () => setOpen(false);

  return (
    <Grid sx={{ pt: 2, pl: 2 }}>
      <Button variant="contained" color="success" onClick={openPopup}>
        User Privilages Management
      </Button>

      <Popup
        open={open}
        handleClose={closePopup}
        title={"User Privilages"}
        onSubmit={closePopup}
        submitButtonProps={{
          variant: "contained",
          color: "success",
          disabled: false,
          onClick: closePopup,
        }}
        cancelButtonProps={{
          variant: "outlined",
          disabled: false,
          onClick: closePopup,
        }}
      >
        <MuiTable
          title=""
          headers={headers}
          rows={rows}
          onChange={handleChange}
        />
      </Popup>
    </Grid>
  );
};

export default Test;
