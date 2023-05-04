import "css/LoginPageLab.css"

export default function LoginPageLab() {
  return (
    <div className="login-box">
      <div className="login-box__container__a login-box__container">
        <form action="" className="login-box__form__a login-box__form">
          <h2 className="login-box__form__title">Login</h2>
          <p className="login-box__form__motto">
            Books = life
          </p>
          <input type="email" className="login-box__form__input" placeholder="Email"
          id="email-login"
          />
          <input
            type="password"
            className="login-box__form__input"
            placeholder="Password"
          id="passwd-login"
          />
          <a className="login-box__form__link">Forgot your password?</a>
          <button type="button" className="login-box__form__btn">
            SIGN IN
          </button>
        </form>
      </div>
      <div className="login-box__container__b login-box__container">
        <form action="" className="login-box__form__b login-box__form">
          <h2 className="login-box__form__title">Register Here</h2>
          <p className="login-box__form__motto">
            Books = life
          </p>
          <input type="email" className="login-box__form__input" placeholder="Email" autoComplete="off"/>
          <input
            type="password"
            className="login-box__form__input"
            placeholder="Password"
            autoComplete="new-password"
            id="passwd-register"
          />
          <input
            type="password"
            className="login-box__form__input"
            placeholder="Repeat password"
            autoComplete="new-password"
            id="password-register-repeat"
          />
          <button type="button" className="login-box__form__btn">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}
