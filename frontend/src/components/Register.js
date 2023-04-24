import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import password__eye from "../images/password-eye.svg";

const Register = ({ handleSignUp, handleEyeIcon }) => {
  //use state object for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    handleSignUp(userData.email, userData.password);
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Sign up</h2>
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth-form__input"
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          required
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
            src={password__eye}
            onClick={handleEyeIcon}
          />
        </div>
        <div className="auth-form__footer">
          <div className="auth-form__footer-wrapper">
            <button type="submit" className="auth-form__submit-button">
              Sign up
            </button>
            <p className="auth-form__footer-text">
              Already a member?
              <Link to="/signin" className="auth-form__footer-link">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
