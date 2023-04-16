import React from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import timer from "utils/timer";

import "css/LoginPage.css";

type AlertTypes = "success" | "error" | "no";

export default function LoginPage() {
  // controlled component
  const [account, saveAccount] = React.useState("");
  const [passwd, savePasswd] = React.useState("");
  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<AlertTypes>("no");
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    if (isWaiting) return;
    setIsWaiting(true);

    timer(1000) // TODO simulate a POST request
      .then(() => {
        setIsWaiting(false);
        if (!(account == "123" && passwd == "123")) {
          setAlertType("error");
          return Promise.reject<string>("login error");
        }
        setAlertType("success");
        return timer(1000);
      })
      .then(() => {
        navigate("/home/books");
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  const endAlertError = (): void => {
    setAlertType("no");
  };

  return (
    <div className="form-container">
      <form className="form">
        <h2 className="form__title">Welcome!</h2>
        <div className="form__control">
          <label htmlFor="account" className="form__label">
            Account
          </label>
          <input
            type="text"
            id="account"
            placeholder="Your Account"
            className="form__input"
            onChange={(e) => {
              saveAccount(e.target.value);
            }}
          />
        </div>
        <div className="form__control">
          <label htmlFor="passwd" className="form__label">
            Password
          </label>
          <input
            type="password"
            id="passwd"
            placeholder="Your Password"
            className="form__input"
            onChange={(e) => {
              savePasswd(e.target.value);
            }}
          />
        </div>
        <div className="form__control" id="test-target"></div>
        <button type="submit" onClick={handleClick} className="form__btn">
          {isWaiting ? <CircularProgress color="inherit" /> : "Log in"}
        </button>
        <Snackbar
          open={alertType === "error"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={endAlertError}
          // sx={{height: "20px", width: "200px"}}
        >
          <Alert
            elevation={4}
            severity="error"
            sx={{ width: "100%" }}
            onClose={endAlertError}
          >
            Wrong account/password!
          </Alert>
        </Snackbar>
        <Snackbar
          open={alertType === "success"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          // sx={{height: "20px", width: "200px"}}
        >
          <Alert elevation={4} severity="success" sx={{ width: "100%" }}>
            Login successfully!
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
