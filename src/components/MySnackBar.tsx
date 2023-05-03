import { Alert, AlertColor } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

type MySnackBarProps = {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  alertType?: AlertColor;
  autoHideDuration?: number;
};

export default function MySnackBar({
  open,
  onClose,
  children,
  alertType,
  autoHideDuration
}: MySnackBarProps) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={autoHideDuration ?? 2000}
      onClose={onClose}
    >
      <Alert
        elevation={4}
        severity={alertType}
        sx={{ width: "100%" }}
        onClose={onClose}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}
