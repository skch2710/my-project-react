import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadTemplate } from "../../store/slices/hostelSlice";
import { UPLOAD_FILE } from "../../utils/axiosHelper";
import { HOSTELLER_BULK_UPLOAD_API } from "../../utils/constants";
import Button from "../../components/button/Button";
import { useTheme } from "@mui/material/styles";
import FileUploadPopup from "../../components/fileUpload/FileUploadPopup";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const HostelBulkUpload = () => {
  const [open, setOpen] = useState(false);
  const { loading, error } = useSelector((state) => state.hostel);

  const dispatch = useDispatch();

  const theme = useTheme();

  const handleDownloadTemplate = async () => {
    console.log("Downloading template...");
    await dispatch(downloadTemplate());
  };

  const handleUpload = async (file, onProgress, validation) => {
    const dto = { validation };
    const response = await UPLOAD_FILE(HOSTELLER_BULK_UPLOAD_API, file, {
      dto,
      onProgress,
    });
    return response.data;
  };

  return (
    <>
      <Button
        variant="darkBlue"
        startIcon={<CloudUploadOutlinedIcon />}
        onClick={() => setOpen(true)}
      >
        Bulk Upload
      </Button>
      <FileUploadPopup
        open={open}
        handleClose={() => setOpen(false)}
        title="Hostel Bulk Upload"
        handleDownloadTemplate={handleDownloadTemplate}
        onUpload={handleUpload}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default HostelBulkUpload;
