import { Box, Grid, Paper, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Popup from "../../components/popup/Popup";
import Loader from "../../components/loader/Loader";
import CommonDataGrid from "../../components/datagrid/CommonDataGrid";

import HostelForm from "./HostelForm";
import HostelSearchForm from "./HostelSearchForm";
import HostellerInactivePopup from "./HostellerInactivePopup";

import useAccess, { ADD, EDIT, VIEW, DELETE } from "../../utils/constants";
import {
  saveOrUpdateHosteller,
  getHostellers,
  resetFormState,
  resetGridState,
  exportFile,
} from "../../store/slices/hostelSlice";

import {
  initialValues,
  ADD_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  VIEW_POPUP_TITLE,
  GRID_TITLE,
  buildColumns,
  getDefaultSearchPayload,
} from "./helper";

const Hostel = () => {
  const [open, setOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState(ADD_POPUP_TITLE);
  const [formValues, setFormValues] = useState(initialValues);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [searchValues, setSearchValues] = useState(getDefaultSearchPayload());
  const [inactivePopupOpen, setInactivePopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const formikRef = useRef();
  const dispatch = useDispatch();
  const isWriteAccessForHostel = useAccess(5, "write");

  const {
    form,
    grid,
    export: exportState,
    inactive,
  } = useSelector((state) => state.hostel);

  useEffect(() => {
    dispatch(resetGridState());
  }, [dispatch]);

  const handlePopup = useCallback((type) => {
    if (type === ADD) {
      setPopupTitle(ADD_POPUP_TITLE);
      setFormValues(initialValues);
    }
    setOpen((prev) => !prev);
  }, []);

  const handleGridAction = useCallback((action, row) => {
    if (action === ADD) {
      setPopupTitle(ADD_POPUP_TITLE);
      setFormValues(initialValues);
      setOpen(true);
    } else if (action === EDIT) {
      setPopupTitle(EDIT_POPUP_TITLE);
      setFormValues({ ...initialValues, ...row });
      setOpen(true);
    } else if (action === VIEW) {
      console.log("View:", row);
      setFormValues({ ...initialValues, ...row });
      setPopupTitle(VIEW_POPUP_TITLE);
      setOpen(true);
    } else if (action === DELETE) {
      setSelectedRow(row);
      setInactivePopupOpen(true);
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      await dispatch(saveOrUpdateHosteller(values)).unwrap();
      toast.success("Hosteller data saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setOpen(false);
      dispatch(resetFormState());
      handleSearch(searchValues);
    }
  };

  const handleSearch = async (values) => {
    dispatch(resetGridState());
    setSearchValues(values);
    try {
      await dispatch(getHostellers(values)).unwrap();
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleInactiveSuccess = useCallback(() => {
    setInactivePopupOpen(false);
    setSelectedRow(null);
    handleSearch(searchValues);
  }, [searchValues]);

  const handleExcelExport = async () => {
    await dispatch(
      exportFile({ ...searchValues, exportExcel: true, fullLoad: true })
    );
  };

  const handlePdfExport = async () => {
    await dispatch(
      exportFile({ ...searchValues, exportPdf: true, fullLoad: true })
    );
  };

  const handleZipExport = async () => {
    await dispatch(
      exportFile({ ...searchValues, exportZip: true, fullLoad: true })
    );
  };

  const columns = useMemo(
    () => buildColumns(handleGridAction, isWriteAccessForHostel),
    [handleGridAction, isWriteAccessForHostel]
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Typography variant="h6">Hostel Management</Typography>

      {/* Filters */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="body1">Filters</Typography>
        <HostelSearchForm
          handlePopup={handlePopup}
          handleSearch={handleSearch}
          handleClear={() => setSearchValues(getDefaultSearchPayload())}
          searchValues={searchValues}
          isWriteAccessForHostel={isWriteAccessForHostel}
        />
      </Paper>

      {/* Grid */}
      <CommonDataGrid
        title={GRID_TITLE}
        columns={columns}
        rows={grid.data?.content || []}
        getRowId={(row) => row.hostellerId}
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

      {/* Add / Edit Popup */}
      <Popup
        open={open}
        handleClose={handlePopup}
        title={popupTitle}
        onSubmit={() => formikRef.current?.handleSubmit()}
        isSubmitting={form.loading}
        isView={popupTitle === VIEW_POPUP_TITLE}
      >
        <HostelForm
          onSubmit={handleSubmit}
          formikRef={formikRef}
          formData={formValues}
          isView={popupTitle === VIEW_POPUP_TITLE}
        />
        {form.loading && <Loader />}
      </Popup>

      {/* Inactivate Popup */}
      <HostellerInactivePopup
        open={inactivePopupOpen}
        row={selectedRow}
        onClose={() => setInactivePopupOpen(false)}
        onSuccess={handleInactiveSuccess}
        loading={inactive.loading}
      />

      {(grid.loading || inactive.loading || exportState.loading) && <Loader />}
    </Grid>
  );
};

export default Hostel;
