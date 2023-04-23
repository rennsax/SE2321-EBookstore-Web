import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myFetch, { FetchProps } from "utils/ajax";
import timer from "utils/timer";

import config from "config/front.json";
import "css/LoginPage.css";
import { useRef } from "react";

type AlertTypes = "success" | "login error" | "no" | "response error";

export default function LoginPage() {
  // uncontrolled component
  const accountInputRef = useRef<HTMLInputElement>(null);
  const passwdInputRef = useRef<HTMLInputElement>(null);
  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<AlertTypes>("no");
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    if (isWaiting) {
      return;
    }
    setIsWaiting(true);

    const account = accountInputRef.current?.value;
    const passwd = passwdInputRef.current?.value;

    await timer(1000);
    const fetchProps: FetchProps = {
      method: "POST",
      url: config["login.url"],
      params: {
        account: account,
        passwd: passwd,
      },
    };
    try {
      const response: SuccessInfo = await myFetch(fetchProps).then((res) => {
        return res.json();
      });
      if (response.flag === true) {
        setAlertType("success");
        await timer(1000);
        navigate("/home/books");
      } else {
        setAlertType("login error");
      }
    } catch (err) {
      console.error(err);
      setAlertType("response error");
    }
    setIsWaiting(false);
  };

  useEffect(() => {
    accountInputRef.current?.focus();
  }, []);

  const endAlertError = (): void => {
    setAlertType("no");
  };

  return (
    <div className="form-container">
      <form className="form" autoComplete="on">
        <h2 className="form__title">Welcome!</h2>
        <div className="form__control">
          <label htmlFor="account" className="form__label">
            Account
          </label>
          <input
            type="email"
            id="account"
            placeholder="Your Account"
            className="form__input"
            ref={accountInputRef}
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
            ref={passwdInputRef}
          />
        </div>
        <button
          type="submit"
          onClick={handleClick}
          className="form__btn"
          tabIndex={-1}
        >
          {isWaiting ? <CircularProgress color="inherit" /> : "Log in"}
        </button>
        <Snackbar
          open={alertType === "login error"}
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
        <Snackbar
          open={alertType === "response error"}
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
            Server response error!
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
