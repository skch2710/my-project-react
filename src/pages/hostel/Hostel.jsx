import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Popup from "../../components/popup/Popup";
import HostelForm from "./HostelForm";
import { useDispatch, useSelector } from "react-redux";
import useAccess, { ADD, EDIT, VIEW, DELETE } from "../../utils/constants";
import {
  saveOrUpdateHosteller,
  getHostellers,
  resetFormState,
  resetGridState,
  exportFile,
  inactiveHosteller,
} from "../../store/slices/hostelSlice";
import { toast } from "react-toastify";
import {
  initialValues,
  ADD_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  GRID_TITLE,
  buildColumns,
  getDefaultSearchPayload,
} from "./helper";
import Loader from "../../components/loader/Loader";
import CommonDataGrid from "../../components/datagrid/CommonDataGrid";
import HostelSearchForm from "./HostelSearchForm";
import PopupSmall from "../../components/popup/PopupSmall";

const Hostel = () => {
  const [open, setOpen] = useState(false);
  const [inactivePopupOpen, setInactivePopupOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [popupTitle, setPopupTitle] = useState(ADD_POPUP_TITLE);
  const formikRef = useRef();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [searchValues, setSearchValues] = useState(getDefaultSearchPayload());
  const [row, setRow] = useState(null);
  const isWriteAccessForHostel = useAccess(5, "write");

  const dispatch = useDispatch();
  const {
    form,
    grid,
    export: exportState,
    inactive,
  } = useSelector((state) => state.hostel);

  useEffect(() => {
    dispatch(resetGridState());
  }, []);

  const handlePopup = (type) => {
    if (type && type === ADD) {
      setPopupTitle(ADD_POPUP_TITLE);
      setFormValues(initialValues);
    }
    setOpen(!open);
  };

  const handleInactivePopup = () => {
    setInactivePopupOpen(!inactivePopupOpen);
  };

  const handleAction = useCallback((action, row) => {
    console.log("handleAction called:", action, row);

    if (action && action === ADD) {
      setPopupTitle(ADD_POPUP_TITLE);
      setFormValues(initialValues);
      handlePopup();
    } else if (action === EDIT) {
      setPopupTitle(EDIT_POPUP_TITLE);
      setFormValues({ ...initialValues, ...row });
      handlePopup();
    } else if (action === VIEW) {
      console.log("View:", row);
    } else if (action === DELETE) {
      setRow(row);
      handleInactivePopup();
    }
  }, []);

  const columns = useMemo(
    () => buildColumns(handleAction, isWriteAccessForHostel),
    [handleAction, isWriteAccessForHostel]
  );

  const handleSubmit = async (values) => {
    console.log("handleSubmit called with values:", values);
    // toast.info("Submitting hosteller data...");
    try {
      // Dispatch Redux thunk for API call
      const result = await dispatch(saveOrUpdateHosteller(values)).unwrap();
      toast.success("Hosteller data saved successfully!");
      console.log("API success:", result);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setOpen(false);
      dispatch(resetFormState());
      handleSearch(searchValues);
    }
  };

  const handleClear = () => {
    const cleared = getDefaultSearchPayload();
    setSearchValues(cleared);
  };

  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  const handleSearch = async (values) => {
    console.log("Search clicked", values);
    dispatch(resetGridState());
    setSearchValues(values);
    try {
      const result = await dispatch(getHostellers(values)).unwrap();
      toast.success("Hosteller data fetched successfully!");
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const handleInactive = async () => {
    console.log("Inactivating hostellerId:", row.hostellerId);
    try {
      const result = await dispatch(
        inactiveHosteller({
          hostellerId: row.hostellerId,
          emailId: row.emailId,
        })
      ).unwrap();
      handleSearch(searchValues);
      handleInactivePopup();
      toast.success("Hosteller inactivated successfully!");
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const inactiveProps = useMemo(
    () => ({
      open: inactivePopupOpen,
      handleClose: handleInactivePopup,
      title: "Inactive Hosteller",
      submitButtonProps: {
        label: "Yes, Inactive",
        onClick: handleInactive,
        color: "success",
      },
      cancelButtonProps: {
        label: "Cancel",
        color: "error",
        variant: "outlined",
        onClick: handleInactivePopup,
      },
      children: (
        <Box sx={{ pt: 1 }}>
          <Typography>
            inactivate <b>{row?.fullName}</b> hosteller?
          </Typography>
        </Box>
      ),
    }),
    [inactivePopupOpen, handleInactivePopup, handleInactive, row]
  );

  const handleExcelExport = async () => {
    console.log("Custom Export to Excel");
    const exportValues = { ...searchValues, exportExcel: true, fullLoad: true };
    await dispatch(exportFile(exportValues));
  };

  const handlePdfExport = async () => {
    console.log("Custom Export to PDF");
    const exportValues = { ...searchValues, exportPdf: true, fullLoad: true };
    await dispatch(exportFile(exportValues));
  };

  const handleZipExport = async () => {
    console.log("Custom Export to ZIP");
    const exportValues = { ...searchValues, exportZip: true, fullLoad: true };
    await dispatch(exportFile(exportValues));
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Typography variant="h6">Hostel Management</Typography>
      </Grid>
      <Grid>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            position: "relative",
            minHeight: 120,
            overflow: "hidden",
          }}
        >
          <Grid container spacing={2} flexDirection={"column"}>
            <Grid>
              <Typography variant="body1">Filters</Typography>
            </Grid>
            <Grid>
              <HostelSearchForm
                handlePopup={handlePopup}
                handleSearch={handleSearch}
                searchValues={searchValues}
                handleClear={handleClear}
                isWriteAccessForHostel={isWriteAccessForHostel}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* <Grid container> */}
      <CommonDataGrid
        title={GRID_TITLE}
        columns={columns}
        rows={grid.data?.content || []}
        getRowId={(row) => row.hostellerId}
        totalRows={grid.data?.content?.length || 0}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        // checkboxSelection
        // onSelectionChange={setSelectionModel}
        height={350}
        exportProp={{
          handleExcelExport,
          handlePdfExport,
          handleZipExport,
          exportDisabled: !(grid.data?.content?.length > 0),
        }}
      />
      {/* </Grid> */}

      {/* Popup */}
      <Popup
        open={open}
        handleClose={handlePopup}
        title={popupTitle}
        onSubmit={handlePopupSubmit}
        isSubmitting={form.loading}
      >
        <HostelForm
          onSubmit={handleSubmit}
          formikRef={formikRef}
          formData={formValues}
        />
        {form.loading && <Loader />}
      </Popup>

      <PopupSmall {...inactiveProps} />

      {(grid.loading || inactive.loading || exportState.loading) && <Loader />}
    </Grid>
  );
};

export default Hostel;
