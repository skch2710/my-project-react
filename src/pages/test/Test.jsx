import { useState } from "react";
import MuiTable from "../../components/table/MuiTable";

const Test = () => {
  const headers = [
    { label: "Module", field: "module" },
    { label: "Read", field: "read", type: "checkbox" },
    { label: "Write", field: "write", type: "checkbox" },
    { label: "Terminate", field: "terminate", type: "checkbox" },
  ];

  const [rows, setRows] = useState([
    { module: "Dashboard", read: true, write: true, terminate: false },
    { module: "Reports", read: true, write: false, terminate: false },
    { module: "User Management", read: true, write: false, terminate: true },
  ]);

  const handleChange = (rowIndex, field, value) => {
    const updated = [...rows];
    updated[rowIndex][field] = value;
    setRows(updated);
  };

  return (
    <MuiTable
      title="Role Privileges"
      headers={headers}
      rows={rows}
      onChange={handleChange}
    />
  );
};

export default Test;
