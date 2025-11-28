import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./Loginscreen.css";

export default function Loginscreen() {
  const loginreducer = useSelector((state) => state.loginReducer);
  const { loading, error } = loginreducer;
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  function login(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    dispatch(loginUser(user));
  }

  useEffect(() => {
    // if(localStorage.getItem('currentUser'))
    // {
    //     window.location.href='/'
    // }
  }, []);

  return (
    <div className="auth-page-container">
      <div className="auth-content-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <LoginIcon className="auth-main-icon" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          {loading && <Loader />}
          {error && <Error error="Invalid Credentials" />}

          <form onSubmit={login} className="auth-form">
            <div className="input-group">
              <div className="input-icon">
                <EmailIcon />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="auth-input"
                value={email}
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <LockIcon />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                value={password}
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="auth-submit-button">
              <LoginIcon className="button-icon" />
              <span>Sign In</span>
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <a href="/register" className="auth-secondary-link">
              <PersonAddIcon className="link-icon" />
              <span>Create New Account</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
