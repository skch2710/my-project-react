import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="xs"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {cancelButtonProps.label && (
          <Button 
            onClick={handleClose}
            {...cancelButtonProps}
          />
        )}
        <Button {...submitButtonProps} />
      </DialogActions>
    </Dialog>
  );
};

export default PopupSmall;