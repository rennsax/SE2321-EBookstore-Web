import React from 'react'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import "css/LoginPage.css"

export default function LoginPage() {
  // controlled component
  const [account, saveAccount] = React.useState("");
  const [passwd, savePasswd] = React.useState("");
  const [isWaiting, toWait] = React.useState<boolean>(false);
  const [alertType, toAlert] = React.useState<'success' | 'error' | null>(null);
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler = async (e) => {
    // console.log(document.querySelector("form"));
    e.preventDefault();
    if (isWaiting)
      return;
    toWait(true);
    setTimeout(() => {
      toWait(false);
      if (!(account == "123" && passwd == "123")) {
        toAlert("error");
        return;
      }
      toAlert("success")
      setTimeout(() => {
        toAlert(null);
        navigate("/home/books");
      }, 1000);
    }, 2000);
    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://127.0.0.1:8080");
    // xhr.send("123");
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       const target = document.getElementById("test-target");
    //       if (target != null)
    //         target.innerHTML = xhr.response;
    //     }
    //   }
    // };

  };

  const endAlertError = (): void => {
    toAlert(null);
  };

  return (
    <div className="form-container">
      <form className='form'>
        <h2 className='form__title'>Welcome!</h2>
        <div className="form__control">
          <label htmlFor="account" className='form__label'>Account</label>
          <input
            type="text" id="account"
            placeholder="Your Account"
            className='form__input'
            onChange={(e) => { saveAccount(e.target.value) }}
          />
        </div>
        <div className="form__control">
          <label htmlFor="passwd" className='form__label'>Password</label>
          <input
            type="password" id="passwd"
            placeholder="Your Password"
            className='form__input'
            onChange={(e) => { savePasswd(e.target.value) }}
          />
        </div>
        <div className="form__control" id="test-target">
        </div>
        <button type="submit" onClick={handleClick} className='form__btn'>
          {isWaiting ? (<CircularProgress color='inherit' />) : "Log in"}
        </button>
        <Snackbar open={alertType === "error"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
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
        <Snackbar open={alertType === "success"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // sx={{height: "20px", width: "200px"}}
        >
          <Alert
            elevation={4}
            severity="success"
            sx={{ width: "100%" }}
          >
            Login successfully!
          </Alert>
        </Snackbar>
      </form>
    </div>
  )
}
