import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";
import Button from "../button/Button";

const CommonDataGrid = ({
  title,
  columns = [],
  rows = [],
  getRowId,
  loading = false,
  totalRows,
  onPaginationModelChange,
  checkboxSelection,
  onSelectionChange,
  height = 350,
  pageSizeOptions = [5, 25, 50, 100],
  paginationMode = "client",
  sortingMode = "client",
  sortModel,
  onSortModelChange,
  filterModel,
  onFilterModelChange,
  exportProp = {
    handleExcelExport,
    handlePdfExport,
    exportDisabled: false,
  },
  sx = {},
  ...otherProps
}) => {
  function CustomToolbar() {
    return (
      <Toolbar
        sx={{
          minHeight: "40px !important",
          height: "40px !important",
          px: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight="medium" sx={{ flex: 1, mx: 0.5 }}>
          {title} ({totalRows || rows.length})
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Export to Excel">
            <span>
              <Button
                variant="outlined"
                startIcon={<RiFileExcel2Fill size={16} />}
                onClick={exportProp.handleExcelExport}
                label="Excel"
                width="60px"
                disabled={exportProp.exportDisabled}
                icon="green"
              />
            </span>
          </Tooltip>
          {exportProp.handlePdfExport && (
            <Tooltip title="Export to Pdf">
              <span>
                <Button
                  variant="outlined"
                  startIcon={<FaRegFilePdf size={16} />}
                  onClick={exportProp.handlePdfExport}
                  label="Pdf"
                  width="60px"
                  disabled={exportProp.exportDisabled}
                  icon="red"
                />
              </span>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    );
  }

  return (
    <Paper elevation={3} sx={{ width: "100%" }}>
      <DataGrid
        // label= {title}
        rows={rows}
        getRowId={getRowId}
        columns={columns.map((col) => ({ ...col, resizable: false }))}
        loading={loading}
        pageSizeOptions={pageSizeOptions}
        paginationModel={{ page: 0, pageSize: 25 }}
        onPaginationModelChange={onPaginationModelChange}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onSelectionChange}
        sortingMode={sortingMode}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        // rowCount={totalRows || rows.length}
        paginationMode={paginationMode}
        rowHeight={30}
        columnHeaderHeight={30}
        disableRowSelectionOnClick
        showToolbar
        localeText={{
          noRowsLabel: "No results found.",
        }}
        slots={{ toolbar: CustomToolbar }}
        sx={{
          height: height,
          padding: "4px",
          border: "1px solid #E0E0E0 !important",
          // Header vertical separators
          "& .MuiDataGrid-columnHeader": {
            borderRight: "1px solid #E0E0E0",
          },
          "& .MuiDataGrid-columnHeader:last-child": {
            borderRight: "none !important",
          },
          // Row vertical separators
          "& .MuiDataGrid-virtualScrollerRenderZone > .MuiDataGrid-row > .MuiDataGrid-cell:not(:last-child)":
            {
              borderRight: "1px solid #E0E0E0",
            },
          // Optional: remove focus border
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#EFF4FA !important",
            fontSize: "12px !important",
            backgroundClip: "padding-box !important",
          },
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor: "#EFF4FA !important",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "#EFF4FA !important",
          },

          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
            backgroundColor: "#EFF4FA !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
          },
          "& .MuiDataGrid-cell": {
            paddingTop: "0px !important",
            paddingBottom: "0px !important",
            fontSize: "12px !important",
          },
          "& .MuiDataGrid-checkboxInput": {
            padding: "0 !important",
          },
          "& .MuiCheckbox-root": {
            padding: "0 !important",
            width: 16,
            height: 16,
          },
          "& .MuiSvgIcon-root": {
            fontSize: 16,
          },
          "& .MuiDataGrid-scrollbarContent": {
            overflowX: "auto !important",
          },
          ...sx,
        }}
        {...otherProps}
      />
    </Paper>
  );
};

export default CommonDataGrid;
