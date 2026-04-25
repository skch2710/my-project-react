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
import { Padding } from "@mui/icons-material";

const Popup = (props) => {
  const {
    open,
    handleClose,
    title,
    children,
    submitButtonProps = {},
    cancelButtonProps = {},
    isSubmitting = false,
    isView = false,
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
      <DialogActions sx={{ pr: 3, pb: 2, pt: 2, pl: 3 }}>
        {(() => {
          const { label: submitLabel = "Save", ...submitRest } =
            submitButtonProps;
          return (
            !isView && (
              <Button
                disabled={isSubmitting || submitRest.disabled}
                onClick={submitRest.onClick}
                {...submitRest}
              >
                {isSubmitting ? "Saving..." : submitLabel}
              </Button>
            )
          );
        })()}

        {(() => {
          const {
            label: cancelLabel = isView ? "Close" : "Cancel",
            ...cancelRest
          } = cancelButtonProps;
          return (
            <Button
              variant={cancelRest.variant || "outlined"}
              onClick={handleClose}
              disabled={isSubmitting || cancelRest.disabled}
              {...cancelRest}
            >
              {cancelLabel}
            </Button>
          );
        })()}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
