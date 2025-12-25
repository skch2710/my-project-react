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
  } = props;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontSize: "16px" }}>{title}</DialogTitle>
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
        <Button {...submitButtonProps} />
        {cancelButtonProps?.label && (
          <Button onClick={handleClose} {...cancelButtonProps} />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PopupSmall;
