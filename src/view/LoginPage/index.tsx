import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import timer from "utils/timer";

import MySnackBar from "components/MySnackBar";
import "css/LoginPage.css";
import { useRef } from "react";
import login from "service/LoginServer";
import useAuth from "utils/useAuth";
import useAppContext from "utils/useAppContext";

type AlertTypes = "success" | "login error" | "no" | "response error";

export default function LoginPage() {
  // uncontrolled component
  const accountInputRef = useRef<HTMLInputElement>(null);
  const passwdInputRef = useRef<HTMLInputElement>(null);

  const { authed, login: authorize } = useAuth();
  const [, dispatch] = useAppContext();

  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);
  const [alertType, setAlertType] = React.useState<AlertTypes>("no");
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler = async (e) => {
    e.preventDefault();

    if (isWaiting) {
      return;
    }
    setIsWaiting(true);

    const account = accountInputRef.current?.value as string;
    const passwd = passwdInputRef.current?.value as string;

    await timer(1000);
    const loginResult = await login(account, passwd);
    switch (loginResult) {
      case "response error":
        setAlertType("response error");
        break;
      case "ok":
        setAlertType("success");
        await timer(1000);
        authorize(account);
        break;
      case "wrong":
        setAlertType("login error");
    }

    setIsWaiting(false);
  };

  useEffect(() => {
    if (authed) {
      navigate("/home/books", {replace: true})
    }
  });

  useEffect(() => {
    dispatch({
      bookPage: () => 1
    })
  }, [dispatch]);

  const endAlertError = (): void => {
    setAlertType("no");
  };

  return (
    <>
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
        </form>
      </div>
      <div className="login-page__snackbar">
        <MySnackBar
          open={alertType === "login error"}
          onClose={endAlertError}
          alertType="error"
        >
          Wrong account/password!
        </MySnackBar>
        <MySnackBar open={alertType === "success"}>
          Login successfully!
        </MySnackBar>
        <MySnackBar
          open={alertType === "response error"}
          onClose={endAlertError}
          alertType="error"
        >
          Server response error!
        </MySnackBar>
        {/* <MySnackBar
          open={showPleaseLogin}
          onClose={() => setShowPleaseLogin(false)}
        >
          Please first login!
        </MySnackBar> */}
      </div>
    </>
  );
}
