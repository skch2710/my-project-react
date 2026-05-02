import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";
import { MdOutlineFolderZip } from "react-icons/md";
import Button from "../button/Button";
import {
  dataGridSx,
  toolbarSx,
  toolbarButtonBoxSx,
} from "./commonDataGrid.styles";

function CustomToolbar(props) {
  const theme = useTheme();
  const { title, totalRows, exportProp } = props || {};
  const hasExcelExport = Boolean(exportProp?.handleExcelExport);
  const hasPdfExport = Boolean(exportProp?.handlePdfExport);
  const hasZipExport = Boolean(exportProp?.handleZipExport);

  return (
    <Toolbar sx={toolbarSx}>
      <Typography
        fontWeight="medium"
        sx={{ flex: "1 1 auto", minWidth: 0, mx: 0.5 }}
        noWrap
      >
        {title} ({totalRows ?? 0})
      </Typography>

      <Box sx={toolbarButtonBoxSx}>
        {hasExcelExport && (
          <Tooltip title="Export to Excel">
            <span>
              <Button
                variant="outlined"
                sx={{ minWidth: 84 }}
                startIcon={
                  <RiFileExcel2Fill
                    fontSize="small"
                    color={
                      exportProp?.exportDisabled
                        ? theme.palette.action.disabled
                        : theme.palette.success.main
                    }
                  />
                }
                onClick={exportProp?.handleExcelExport}
                disabled={exportProp?.exportDisabled}
              >
                Excel
              </Button>
            </span>
          </Tooltip>
        )}
        {hasPdfExport && (
          <Tooltip title="Export to Pdf">
            <span>
              <Button
                variant="outlined"
                sx={{ minWidth: 84 }}
                startIcon={
                  <FaRegFilePdf
                    fontSize="small"
                    color={
                      exportProp?.exportDisabled
                        ? theme.palette.action.disabled
                        : theme.palette.error.main
                    }
                  />
                }
                onClick={exportProp?.handlePdfExport}
                disabled={exportProp?.exportDisabled}
              >
                Pdf
              </Button>
            </span>
          </Tooltip>
        )}
        {hasZipExport && (
          <Tooltip title="Export to Zip">
            <span>
              <Button
                variant="outlined"
                sx={{ minWidth: 84 }}
                startIcon={
                  <MdOutlineFolderZip
                    size={20}
                    color={
                      exportProp?.exportDisabled
                        ? theme.palette.action.disabled
                        : theme.palette.yellow.main
                    }
                  />
                }
                onClick={exportProp?.handleZipExport}
                disabled={exportProp?.exportDisabled}
              >
                Zip
              </Button>
            </span>
          </Tooltip>
        )}
      </Box>
    </Toolbar>
  );
}

const CommonDataGrid = ({
  title,
  columns = [],
  rows = [],
  getRowId,
  loading = false,
  totalRows,
  paginationModel = { page: 0, pageSize: 25 },
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
  exportProp = {},
  sx = {},
  ...otherProps
}) => {
  const theme = useTheme();
  const normalizedColumns = useMemo(() => {
    return columns.map((col) => {
      const base = { ...col, resizable: false };
      if (col.width) {
        return { ...base, minWidth: col.minWidth ?? col.width };
      }
      return { ...base, flex: col.flex ?? 1, minWidth: col.minWidth ?? 120 };
    });
  }, [columns]);
  const rowCount = totalRows ?? rows.length;
  const serverPaginationProps =
    paginationMode === "server" ? { rowCount } : {};

  return (
    <Paper elevation={2} sx={{ width: "100%", overflow: "hidden" }}>
      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={normalizedColumns}
        loading={loading}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onSelectionChange}
        sortingMode={sortingMode}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        paginationMode={paginationMode}
        rowHeight={30}
        columnHeaderHeight={30}
        disableRowSelectionOnClick
        showToolbar
        localeText={{
          noRowsLabel: "No results found.",
        }}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{ toolbar: { title, totalRows: rowCount, exportProp } }}
        sx={dataGridSx(theme, height, sx)}
        {...serverPaginationProps}
        {...otherProps}
      />
    </Paper>
  );
};

export default CommonDataGrid;
