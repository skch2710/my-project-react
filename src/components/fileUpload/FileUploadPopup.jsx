import { useCallback, useRef, useState } from "react";
import { Box, Typography, Divider, IconButton, Alert } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PopupSmall from "../popup/PopupSmall";
import { RiFileExcel2Fill } from "react-icons/ri";
import Button from "../button/Button";
import LinearProgressUpload from "../progressbar/LinearProgressUpload";
import { ALLOWED_UPLOAD_TYPES } from "../../utils/constants";

const FileUploadPopup = (props) => {
  const {
    open,
    handleClose,
    title,
    handleDownloadTemplate,
    onUpload,
    loading,
  } = props;

  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  const validateFile = async (selectedFile) => {
    if (!selectedFile) return;
    setApiResponse("");
    setError("");
    if (!ALLOWED_UPLOAD_TYPES.includes(selectedFile.type)) {
      setError("Only CSV or Excel files are allowed");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(
        `File size exceeds 10 MB limit (${(
          selectedFile.size /
          (1024 * 1024)
        ).toFixed(2)} MB)`
      );
      return;
    }
    setFile(selectedFile);
    // Server-side validation
    await handleUpload(selectedFile, true);
  };

  const handleFileSelect = useCallback(
    (e) => validateFile(e.target.files[0]),
    []
  );

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    validateFile(e.dataTransfer.files[0]);
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
    setError("");
    setApiResponse("");
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleUpload = async (uploadFile, validation) => {
    if (!uploadFile) {
      setError("Please select a file");
      return;
    }
    setUploading(true);
    setProgress(0);
    setError("");
    try {
      const response = await onUpload(uploadFile, setProgress, validation);
      if (response?.statusCode === 200) {
        setApiResponse(response.data);
      } else {
        setError(response?.errorMessage || "Upload failed. Please try again.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClosePopup = () => {
    removeFile();
    handleClose();
  };

  return (
    <PopupSmall
      open={open}
      handleClose={handleClosePopup}
      title={title}
      submitButtonProps={{
        label: uploading ? "Uploading..." : "Upload",
        onClick: () => handleUpload(file, false),
        disabled: !file || uploading,
      }}
      cancelButtonProps={{
        label: "Close",
        variant: "outlined",
        color: "secondary",
        disabled: uploading,
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Template Download */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Need a template?</Typography>
          <Button
            variant="outlined"
            startIcon={<RiFileExcel2Fill size={16} />}
            onClick={handleDownloadTemplate}
            label="Download Template"
            icon="green"
            loading={loading}
            disabled={loading}
          />
        </Box>

        <Alert severity="info">File size must be 10 MB or less</Alert>

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileSelect}
        />

        {/* Drag & Drop */}
        {!file && !error && (
          <Box
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              padding: 3,
              textAlign: "center",
              backgroundColor: dragOver ? "#f5f5f5" : "transparent",
              cursor: "pointer",
            }}
          >
            <CloudUploadOutlinedIcon fontSize="large" sx={{ color: "gray" }} />
            <Typography variant="body2" mt={1}>
              Drag and drop a file here
            </Typography>
            <Typography variant="caption" color="text.secondary">
              or click to browse
            </Typography>
          </Box>
        )}

        {/* Selected File */}
        {file && !error && (
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {/* File Row */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" fontWeight={500}>
                {file.name} ({(file.size / (1024 * 1024)).toFixed(3)} MB)
              </Typography>
              <IconButton
                size="small"
                onClick={removeFile}
                disabled={uploading}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Progress */}
            {uploading && <LinearProgressUpload value={progress} />}

            {/* API Response */}
            {apiResponse && (
              <Typography color="success.main" variant="body2">
                {apiResponse}
              </Typography>
            )}
          </Box>
        )}

        {/* Error */}
        {error && (
          <Box sx={{ border: "2px dashed #ccc", borderRadius: 2, padding: 3 }}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}

        <Divider>(OR)</Divider>

        <Button
          startIcon={<CloudUploadOutlinedIcon />}
          variant="outlined"
          onClick={() => fileInputRef.current.click()}
          label="Choose File"
        />
      </Box>
    </PopupSmall>
  );
};

export default FileUploadPopup;
