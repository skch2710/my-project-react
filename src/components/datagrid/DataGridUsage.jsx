import React, { useEffect, useState } from "react";
import CommonDataGrid from "./CommonDataGrid";
import { Box } from "@mui/material";
import { columns,revisedFields, rows, rowsempty } from "./helper";
import { exportToExcel } from "../exportExcel/ExportExcel";
import { exportToPDF } from "../exportPdf/ExportPdf";

const DataGridUsage = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [selectionModel, setSelectionModel] = useState([]);

  console.log("Selected Rows:", selectionModel);

  const handleExcelExport = () => {
    console.log("Custom Export to Excel");
    // Implement your custom export logic here
    exportToExcel(revisedFields, rows, "EmployeeData");
  };

  const handlePdfExport = () => {
    console.log("Custom Export to PDF");
    // Implement your custom export logic here
    exportToPDF(revisedFields, rows, "EmployeeData");
  };

  return (
    <Box sx={{ p: 3 }}>
      <CommonDataGrid
        title="Employee List"
        columns={columns}
        rows={rows}
        getRowId={(row) => row.empId}
        totalRows={rows.length}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
        onSelectionChange={setSelectionModel}
        height={350}
        exportProp={{
          handleExcelExport,
          handlePdfExport,
          exportDisabled: false,
        }}
      />
    </Box>
  );
};

export default DataGridUsage;