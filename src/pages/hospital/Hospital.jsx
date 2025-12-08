import { Grid, Paper, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Button from "../../components/button/Button";
import Popup from "../../components/popup/Popup";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HospitalForm from "./HospitalForm";

const Hospital = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formikRef = useRef();

  const handlePopup = () => {
    setOpen(!open);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", values);
      // Add your API call here
      // await api.submitHospital(values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handlePopupSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Typography variant="h6">Hospital Management</Typography>
      </Grid>
      <Grid>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container aligns="center" justifyContent="space-between">
            <Grid>
              <Typography variant="body1">Filters</Typography>
            </Grid>
            <Grid>
              <Grid container spacing={2} justifyContent="flex-end">
                <Button
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  label="Add Hospital"
                  color="success"
                  onClick={handlePopup}
                />
                <Button label="Search" color="primary" />
                <Button label="Clear" color="primary" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container>
            <Typography variant="body1">Hospital List</Typography>
            {/* Add your hospital list table/content here */}
          </Grid>
        </Paper>
      </Grid>

      {/* Popup */}
      <Popup
        open={open}
        handleClose={handleClose}
        title="Add Hospital"
        onSubmit={handlePopupSubmit}
        isSubmitting={isSubmitting}
      >
        <HospitalForm onSubmit={handleSubmit} formikRef={formikRef} />
      </Popup>
    </Grid>
  );
};

export default Hospital;
