import React, { useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useGlobalStyles } from "../../styles/useGlobalStyles";
import UserSearchForm from "./UsersSerachForm";
import { USER_GRID_TITLE } from "./users.helper";
import CommonDataGrid from "../../components/datagrid/CommonDataGrid";

const Users = () => {
  const styles = useGlobalStyles();
  const columns = [
    { field: "userId", headerName: "User ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
  ];

  const sampleRows = [
    {
      userId: 1,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
    },
    {
      userId: 2,
      firstName: "Bob",
      lastName: "Jones",
      email: "bob@example.com",
    },
    {
      userId: 3,
      firstName: "Carol",
      lastName: "Taylor",
      email: "carol@example.com",
    },
  ];

  const [grid] = useState({ data: { content: sampleRows } });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const handleExcelExport = useCallback(() => {
    console.log("Excel export");
  }, []);

  const handlePdfExport = useCallback(() => {
    console.log("PDF export");
  }, []);

  const handleZipExport = useCallback(() => {
    console.log("ZIP export");
  }, []);

  const handleSearch = useCallback((values) => {
    console.log("Search Values:", values);
    // API call
  }, []);

  const handleClear = useCallback(() => {
    console.log("Filters cleared");
  }, []);

  return (
    <Box sx={styles.pageContainer}>
      <Typography variant="h6" sx={styles.pageTitle}>
        Users
      </Typography>

      <UserSearchForm onSearch={handleSearch} onClear={handleClear} />

      {/* Users Table here */}
      <CommonDataGrid
        title={USER_GRID_TITLE}
        columns={columns}
        rows={grid.data?.content || []}
        getRowId={(row) => row.userId}
        totalRows={grid.data?.content?.length || 0}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        height={350}
        exportProp={{
          handleExcelExport,
          handlePdfExport,
          handleZipExport,
          exportDisabled: !(grid.data?.content?.length > 0),
        }}
      />
    </Box>
  );
};

export default Users;
