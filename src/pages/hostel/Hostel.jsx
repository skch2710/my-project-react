import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
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
} from "../../store/slices/hostelSlice";
import { toast } from "react-toastify";
import {
  initialValues,
  ADD_POPUP_TITLE,
  EDIT_POPUP_TITLE,
  GRID_TITLE,
  buildColumns,
  searchPayload,
} from "./helper";
import Loader from "../../components/loader/Loader";
import CommonDataGrid from "../../components/datagrid/CommonDataGrid";
import HostelSearchForm from "./HostelSearchForm";

const Hostel = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [popupTitle, setPopupTitle] = useState(ADD_POPUP_TITLE);
  const formikRef = useRef();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const isWriteAccessForHostel = useAccess(5, "write");

  const dispatch = useDispatch();
  const { form, grid } = useSelector((state) => state.hostel);

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
      console.log("Delete:", row);
    }
  }, []);

  const columns = useMemo(
    () => buildColumns(handleAction, isWriteAccessForHostel),
    [handleAction, isWriteAccessForHostel]
  );

  const handleSubmit = async (values) => {
    console.log("handleSubmit called with values:", values);
    toast.info("Submitting hosteller data...");
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
      handleSearch(searchPayload);
    }
  };

  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  const handleSearch = async (values) => {
    console.log("Search clicked", values);

    dispatch(resetGridState());
    try {
      const result = await dispatch(getHostellers(values)).unwrap();
      toast.success("Hosteller data fetched successfully!");
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const handleExcelExport = () => {
    console.log("Custom Export to Excel");
    // Implement your custom export logic here
  };
  const handlePdfExport = () => {
    console.log("Custom Export to PDF");
    // Implement your custom export logic here
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
        {form.loading && <Loader loading={form.loading} />}
      </Popup>

      {grid.loading && <Loader loading={grid.loading} />}
    </Grid>
  );
};

export default Hostel;
