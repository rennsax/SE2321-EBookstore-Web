import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";

type MySnackBarProps = {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  alertType?: AlertColor;
  autoHideDuration?: number;
};

export default function MySnackBar({
  open: defaultOpen,
  onClose,
  children,
  alertType,
  autoHideDuration,
}: MySnackBarProps) {
  const [open, setOpen] = useState(defaultOpen ?? true);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={autoHideDuration ?? 2000}
      onClose={(e, r) => {
        if (r == "clickaway" || onClose === undefined) {
          return;
        }
        setOpen(false);
        onClose();
      }}
    >
      <Alert
        elevation={4}
        severity={alertType}
        sx={{ width: "100%" }}
        onClose={() => {
          setOpen(false);
          if (onClose) onClose();
        }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}
