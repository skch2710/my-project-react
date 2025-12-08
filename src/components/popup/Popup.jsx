import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Button from "../button/Button";

const Popup = (props) => {
  const {
    open,
    handleClose,
    title,
    onSubmit,
    children,
    submitButtonProps = {},
    cancelButtonProps = {},
    isSubmitting = false,
  } = props;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
        disabled={isSubmitting}
      >
        <Tooltip title="close">
          <CancelOutlinedIcon fontSize="small" />
        </Tooltip>
      </IconButton>
      <Divider />
      <DialogContent
        sx={{
          height: "400px",
          overflowY: "auto",
        }}
      >
        {children}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          type="submit"
          label="Save"
          onClick={onSubmit}
          color="success"
          loading={isSubmitting}
          disabled={isSubmitting}
          {...submitButtonProps}
        />
        <Button
          variant="outlined"
          label="Cancel"
          onClick={handleClose}
          disabled={isSubmitting}
          {...cancelButtonProps}
        />
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
