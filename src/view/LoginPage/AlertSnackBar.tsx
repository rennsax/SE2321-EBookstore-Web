import "css/LoginPageLab.css";
import React from "react";

import MySnackBar from "components/MySnackBar";
import "css/LoginPage.css";

export type AlertType =
  | "success"
  | "login error"
  | "no"
  | "response error"
  | "incomplete"
  | "invalid email"
  | "repeat error";

type LoginPageSnackBarProps = {
  alertType: AlertType;
  endAlertError: () => void;
};

const AlertSnackBar: React.FC<LoginPageSnackBarProps> = ({
  alertType,
  endAlertError,
}) => {
  switch (alertType) {
    case "success":
      return <MySnackBar open>Login successfully!</MySnackBar>;
    case "login error":
      return (
        <MySnackBar open onClose={endAlertError} alertType="error">
          Wrong account/password!
        </MySnackBar>
      );
    case "response error":
      return (
        <MySnackBar open onClose={endAlertError} alertType="error">
          Server response error!
        </MySnackBar>
      );
    case "incomplete":
      return (
        <MySnackBar open onClose={endAlertError} alertType="warning">
          Please fill all information first!
        </MySnackBar>
      );
    case "invalid email":
      return (
        <MySnackBar open onClose={endAlertError} alertType="warning">
          Please input a valid email address!
        </MySnackBar>
      );
    case "repeat error":
      return (
        <MySnackBar open onClose={endAlertError} alertType="warning">
          Passwords are not identical!
        </MySnackBar>
      )
  }
  // assert(alertType == "no")
  return null;
};

export default AlertSnackBar;
