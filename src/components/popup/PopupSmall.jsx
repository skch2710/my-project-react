import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Button from "../button/Button";

const PopupSmall = (props) => {
  const {
    open,
    handleClose,
    title,
    children,
    submitButtonProps = {},
    cancelButtonProps = {},
    maxWidth = "xs",
  } = props;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={maxWidth}>
      <DialogTitle sx={{ fontSize: "18px" }}>{title}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <Tooltip title="close">
          <CancelOutlinedIcon fontSize="small" />
        </Tooltip>
      </IconButton>
      <Divider />
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {(() => {
          const { label: submitLabel = "Submit", ...submitRest } = submitButtonProps;
          return (
            <Button {...submitRest}>
              {submitLabel}
            </Button>
          );
        })()}

        {(() => {
          const { label: cancelLabel = "Close", ...cancelRest } = cancelButtonProps;
          // If cancel button explicitly disabled/omitted, still render with default label
          return (
            <Button onClick={handleClose} {...cancelRest}>
              {cancelLabel}
            </Button>
          );
        })()}
      </DialogActions>
    </Dialog>
  );
};

export default PopupSmall;
