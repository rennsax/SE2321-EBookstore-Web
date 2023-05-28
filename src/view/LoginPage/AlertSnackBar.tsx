import React from "react";
import MySnackBar from "components/MySnackBar";
import { AlertColor } from "@mui/material";
import { ReactElement } from "react";

export type AlertType =
  | "success"
  | "login error"
  | "no"
  | "response error"
  | "incomplete"
  | "invalid email"
  | "repeat error"
  | "forbidden user"
  | "super user";

type LoginPageSnackBarProps = {
  alertType: AlertType;
  endAlertError: () => void;
};

const AlertSnackBar: React.FC<LoginPageSnackBarProps> = ({
  alertType,
  endAlertError, // set alert type to "no"
}) => {
  const handleOnClose: () => void = () => {
    setTimeout(() => {
      endAlertError();
    }, 1000);
  };

  const generateAlert: (
    alertType: AlertColor,
    message: string | null
  ) => ReactElement = (alertType, message) => {
    return (
      <MySnackBar onClose={handleOnClose} alertType={alertType}>
        {message}
      </MySnackBar>
    );
  };

  switch (alertType) {
    case "success":
      return generateAlert("success", "Login successfully!");
    case "login error":
      return generateAlert("error", "Wrong account/password!");
    case "response error":
      return generateAlert("error", "Server response error!");
    case "incomplete":
      return generateAlert("warning", "Please fill all information first!");
    case "invalid email":
      return generateAlert("warning", "Please input a valid email address!");
    case "repeat error":
      return generateAlert("warning", "Passwords are not identical!");
    case "forbidden user":
      return generateAlert(
        "error",
        "Your account has been banned! Try to contact with the administrator."
      );
    case "super user":
      return generateAlert("success", "Welcome, administrator!");
  }
  // assert(alertType == "no")
  return null;
};

export default AlertSnackBar;
