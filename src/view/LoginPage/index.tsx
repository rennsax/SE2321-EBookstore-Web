import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import timer from "utils/timer";
import myFetch, { FetchProps } from "utils/ajax";

import "css/LoginPage.css";
import { useRef } from "react";

type AlertTypes = "success" | "error" | "no" | "response error";
type LoginResult = {
  content: boolean;
};

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
      url: "http://localhost:8080/login",
      params: {
        account: account,
        passwd: passwd,
      },
    };
    try {
      const response: LoginResult = await myFetch(fetchProps).then((res) => {
        return res.json();
      });
      if (response.content === true) {
        setAlertType("success");
        setIsWaiting(false);
        await timer(1000);
        navigate("/home/books");
      } else {
        setAlertType("error");
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
        <button type="submit" onClick={handleClick} className="form__btn">
          {isWaiting ? <CircularProgress color="inherit" /> : "Log in"}
        </button>
        <Snackbar
          open={alertType.search("error") > 0}
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
            {alertType === "response error"
              ? "Response error from the service!"
              : "Wrong account/password!"}
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
