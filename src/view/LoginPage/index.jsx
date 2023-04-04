import React from 'react'
import { useNavigate } from 'react-router-dom';

import "css/LoginPage.css"

export default function LoginPage() {
  // controlled component
  const [account, saveAccount] = React.useState("");
  const [passwd, savePasswd] = React.useState("");
  const navigate = useNavigate();

  function handleClick(e) {
    // console.log(document.querySelector("form"));
    e.preventDefault();
    if (!(account == "123" && passwd == "123")) {
      alert("Wrong account or password!");
      return;
    }
    alert("Successfully login!")
    // go to home
    navigate("/home/books");
  };

  return (
    <div className="form-container">
      <form className='form'>
        <h2 className='form__title'>Login</h2>
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
        <button type="submit" onClick={handleClick} className='form__btn'>Login</button>
      </form>
    </div>
  )
}
