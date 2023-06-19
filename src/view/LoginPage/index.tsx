import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import timer from "utils/timer";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "css/LoginPage.css";
import { ReactEventHandler, useRef, useState } from "react";
import login from "service/LoginServer";
import useAppContext from "utils/useAppContext";
import useAuth from "utils/useAuth";
import AlertSnackBar, { AlertType } from "./AlertSnackBar";
import { register } from "service/UserServer";

const checkEmail = function (email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const checkComplete = function (s: string): boolean {
  return s.trim().length !== 0;
};

export default function LoginPage() {
  // whether the window is on the right
  const [isRight, setIsRight] = useState(true);
  const { authed, isSuper, login: authorize } = useAuth();
  const [, dispatch] = useAppContext();
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>("no");

  const loginAccountRef = useRef<HTMLInputElement>(null);
  const loginPasswdRef = useRef<HTMLInputElement>(null);

  const regNameRef = useRef<HTMLInputElement>(null);
  const regAccountRef = useRef<HTMLInputElement>(null);
  const regPasswdRef = useRef<HTMLInputElement>(null);
  const regPasswdRepeatRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Set the book navigated page to 1
    dispatch({
      bookPage: () => 1,
    });
    if (authed) {
      if (isSuper) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home/books", { replace: true });
      }
    }
  });

  // Switch login and register.
  const handleSwitch: ReactEventHandler = (e) => {
    e.preventDefault();
    setIsRight((f) => !f);
  };

  const endAlertError = (): void => {
    setAlertType("no");
  };

  const buttonEventWrapper = (
    doFunction: () => Promise<void>
  ): ReactEventHandler => {
    return async (e) => {
      e.preventDefault();
      // Lock
      if (isWaiting) {
        return;
      }
      setIsWaiting(true);

      await doFunction();

      // Unlock
      setIsWaiting(false);
    };
  };

  const handleLogin: () => Promise<void> = async () => {
    const account = loginAccountRef.current?.value as string;
    const passwd = loginPasswdRef.current?.value as string;

    // Complete?
    if (!checkComplete(account) || !checkComplete(passwd)) {
      setAlertType("incomplete");
      return;
    }

    // Explicitly waiting for 1 second
    await timer(1000);
    const loginResult = await login(account, passwd);
    switch (loginResult) {
      /** Login successfully */
      case "login success":
        setAlertType("login success");
        await timer(1000);
        /** Store the account in the app context, i.e. authorized */
        authorize(account);
        break;
      case "super user":
        setAlertType("super user");
        await timer(1000);
        authorize(account, true);
        break;
      // Other cases: errors and warnings
      default:
        setAlertType(loginResult);
        break;
    }
  };

  const handleRegister: () => Promise<void> = async () => {
    const userName = regNameRef.current?.value as string;
    const account = regAccountRef.current?.value as string;
    const passwd1 = regPasswdRef.current?.value as string;
    const passwd2 = regPasswdRepeatRef.current?.value as string;

    // check frontend mistakes
    if (
      !checkComplete(userName) ||
      !checkComplete(account) ||
      !checkComplete(passwd1) ||
      !checkComplete(passwd2)
    ) {
      setAlertType("incomplete");
      return;
    }
    if (!checkEmail(account)) {
      setAlertType("invalid email");
      return;
    }
    if (passwd1 !== passwd2) {
      setAlertType("repeat error");
      return;
    }

    // Explicitly waiting for 1 second
    await timer(1000);

    const registerRes = await register(userName, account, passwd1);
    switch (registerRes) {
      case "register success":
        setAlertType("register success");
        await timer(1000);
        /** Store the account in the app context, i.e. authorized */
        authorize(account);
        break;
      default:
        setAlertType(registerRes);
        break;
    }
  };

  return (
    <>
      <div className="login-box">
        <div
          className={
            "login-box__switch" + (isRight ? "" : " login-box__switch--r")
          }
        >
          <div
            className={
              "login-box__container__a login-box__container" +
              (isRight ? "" : " login-box__container__a--r")
            }
          >
            <form action="" className="login-box__form__a login-box__form">
              <h2 className="login-box__form__title">Login</h2>
              <p className="login-box__form__motto">Books = life</p>
              <div className="login-box__form__main">
                <input
                  type="email"
                  className="login-box__form__input"
                  placeholder="Email"
                  id="email-login"
                  ref={loginAccountRef}
                />
                <input
                  type="password"
                  className="login-box__form__input"
                  placeholder="Password"
                  id="passwd-login"
                  ref={loginPasswdRef}
                />
                <a className="login-box__form__link">Forgot your password?</a>
              </div>
              <button
                type="submit"
                className="login-box__form__btn"
                onClick={buttonEventWrapper(handleLogin)}
              >
                SIGN IN
              </button>
            </form>
          </div>
          <div
            className={
              "login-box__container__b login-box__container" +
              (isRight ? "" : " login-box__container__b--r")
            }
          >
            <form action="" className="login-box__form__b login-box__form">
              <h2 className="login-box__form__title">Register</h2>
              <p className="login-box__form__motto">Books = life</p>
              <div className="login-box__form__main">
                <input
                  type="text"
                  className="login-box__form__input"
                  placeholder="Name"
                  autoComplete="off"
                  ref={regNameRef}
                />
                <input
                  type="email"
                  className="login-box__form__input"
                  placeholder="Email"
                  autoComplete="off"
                  ref={regAccountRef}
                />
                <input
                  type="password"
                  className="login-box__form__input"
                  placeholder="Password"
                  autoComplete="new-password"
                  id="passwd-register"
                  ref={regPasswdRef}
                />
                <input
                  type="password"
                  className="login-box__form__input"
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  id="password-register-repeat"
                  ref={regPasswdRepeatRef}
                />
              </div>
              <button
                type="submit"
                className="login-box__form__btn"
                onClick={buttonEventWrapper(handleRegister)}
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
        <div
          className={`login-box__window login-box__window--${
            isRight ? "r" : "l"
          }`}
          // control the position and shadow
        >
          <div className="login-box__window__container">
            <div
              className={
                "login-box__window__content" +
                (isRight ? " login-box__window__content--display" : "")
              }
            >
              <h3 className="login-box__window__container__title">
                Welcome back,
                <br /> my friend!
              </h3>
              <p className="login-box__window__container__hint">
                {"Do not have an account yet?"}
                <br />
                Click here to register now!
              </p>
              <button className="login-box__window__btn" onClick={handleSwitch}>
                SIGN UP
              </button>
            </div>
            <div
              className={
                "login-box__window__content login-box__window__content__l" +
                (isRight ? "" : " login-box__window__content--display")
              }
            >
              <h3 className="login-box__window__container__title">
                Hello,
                <br />
                finally we meet you!
              </h3>
              <p className="login-box__window__container__hint">
                Already have your account?
                <br />
                Click here to login now.
              </p>
              <button className="login-box__window__btn" onClick={handleSwitch}>
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>
      <AlertSnackBar alertType={alertType} endAlertError={endAlertError} />
      <Backdrop
        open={isWaiting}
      >
        <CircularProgress size={80} className="login-page__process" />
      </Backdrop>
    </>
  );
}
