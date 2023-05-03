import React, { useState } from "react";
import { Link } from "react-router-dom";
import password__eye from "../images/password-eye.svg";

const Login = ({ handleLogin, handleEyeIcon }) => {
  //use state object for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getEmail = localStorage.getItem("email");
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      getEmail,
      password,
    };

    handleLogin({ userData });
  };

  return (
    <div className="auth-form" height="80" width="80" color="#fff">
      <h2 className="auth-form__title">Log in</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth-form__input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="auth-form__password-holder">
          <input
            type="text"
            name="password"
            className="auth-form__input auth-form__input-password auth-form__password-holder-active"
            placeholder="Password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <img
            className="auth-form__password-eye-icon"
            alt="see coverd password eye icon"
            onClick={handleEyeIcon}
            src={password__eye}
          />
        </div>

        <div className="auth-form__footer">
          <div className="auth-form__footer-wrapper">
            <button type="submit" className="auth-form__submit-button">
              Log in
            </button>
            <p className="auth-form__footer-text">
              Not a member yet?
              <Link to="/signup" className="auth-form__footer-link">
                {" "}
                Sign up here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
