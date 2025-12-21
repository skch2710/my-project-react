import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import FormicField from "../../components/fields/FormicField";
import Button from "../../components/button/Button";
import { ADD } from "../../utils/constants";

const HostelSearchForm = (props) => {
  const {
    handlePopup,
    handleSearch,
    searchValues,
    handleClear,
    isWriteAccessForHostel,
  } = props;
  return (
    <Formik
      initialValues={searchValues}
      onSubmit={(values) => handleSearch(values)}
      enableReinitialize
    >
      {({ handleSubmit, resetForm }) => (
        <Form id="hostelSearchForm">
          <Grid container flexDirection={"column"}>
            {/* First Row */}
            <Grid container spacing={3}>
              <Grid size={3}>
                <FormicField
                  type="text"
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  maxLength={200}
                />
              </Grid>

              <Grid size={3}>
                <FormicField
                  type="email"
                  name="emailId"
                  label="Email ID"
                  placeholder="Enter Email ID"
                  maxLength={150}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Grid>
              <Grid container spacing={2} justifyContent="flex-end">
                <Button
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  label="Add Hostel"
                  color="success"
                  onClick={() => handlePopup(ADD)}
                  disabled={!isWriteAccessForHostel}
                />
                <Button label="Search" color="primary" onClick={handleSubmit} />
                <Button
                  label="Clear"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleClear()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default HostelSearchForm;
