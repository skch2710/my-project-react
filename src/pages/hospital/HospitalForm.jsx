import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { initialValues, validationSchema } from "./helper";
import FormicField from "../../components/fields/FormicField";
import FormicDatePicker from "../../components/fields/FormicDatePicker";

const HospitalFormContent = () => {
  return (
    <Form>
      <Grid container spacing={3} flexDirection={"column"}>
        {/* First Row */}
        <Grid container spacing={3}>
          <Grid size={3}>
            <FormicField
              type="text"
              name="hospitalName"
              label="Hospital Name"
              placeholder="Enter hospital name"
              required
              maxLength={150}
            />
          </Grid>

          <Grid size={3}>
            <FormicField
              type="email"
              name="hospitalEmail"
              label="Hospital Email"
              placeholder="Enter hospital email"
              required
              maxLength={50}
            />
          </Grid>

          <Grid size={4}>
            <FormicField
              // as="textarea"
              type="text"
              name="hospitalAddress"
              label="Hospital Address"
              placeholder="Enter hospital address"
              required
              maxLength={250}
            />
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid container spacing={3}>
          <Grid size={3}>
            <FormicField
              type="text"
              name="phoneNumber"
              label="Hospital Number"
              placeholder="Enter hospital number"
              maxLength={15}
            />
          </Grid>

          <Grid size={2}>
            <FormicDatePicker
              name="startDate"
              label="Hospital Start Date"
              required={true}
            />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
};

const HospitalForm = ({ onSubmit, formikRef }) => {
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <HospitalFormContent />
    </Formik>
  );
};

export default HospitalForm;