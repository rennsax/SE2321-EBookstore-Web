import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import React from "react";

interface BookDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  doDelete: () => Promise<void>;
}
const BookDeleteDialog: React.FC<BookDeleteDialogProps> = ({
  open,
  onClose,
  doDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>Are you sure to delete this book?</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            doDelete()
              .catch(() => {
                // TODO: more elegant way
                alert(
                  "You can't delete this book, since it's referenced by some orders"
                );
              })
              .finally(onClose);
          }}
        >
          Yes
        </Button>
        <Button onClick={onClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
};
export default BookDeleteDialog;