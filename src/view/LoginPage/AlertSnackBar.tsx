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
  endAlertError, // set alert type to "no"
}) => {

  const handleOnClose: () => void = () => {
    setTimeout(() => {
      endAlertError();
    }, 1000)
  }

  switch (alertType) {
    case "success":
      return <MySnackBar>Login successfully!</MySnackBar>;
    case "login error":
      return (
        <MySnackBar onClose={handleOnClose} alertType="error">
          Wrong account/password!
        </MySnackBar>
      );
    case "response error":
      return (
        <MySnackBar onClose={handleOnClose} alertType="error">
          Server response error!
        </MySnackBar>
      );
    case "incomplete":
      return (
        <MySnackBar onClose={handleOnClose} alertType="warning">
          Please fill all information first!
        </MySnackBar>
      );
    case "invalid email":
      return (
        <MySnackBar onClose={handleOnClose} alertType="warning">
          Please input a valid email address!
        </MySnackBar>
      );
    case "repeat error":
      return (
        <MySnackBar onClose={handleOnClose} alertType="warning">
          Passwords are not identical!
        </MySnackBar>
      )
  }
  // assert(alertType == "no")
  return null;
};

export default AlertSnackBar;
