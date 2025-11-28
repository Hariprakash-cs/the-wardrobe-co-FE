import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../actions/userActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { toast } from "react-toastify";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import "./Loginscreen.css";

export default function Registerscreen() {
  const registerstate = useSelector((state) => state.registerNewUserReducer);

  const { loading, error, success } = registerstate;

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const dispatch = useDispatch();

  function register(e) {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };

    if (password === cpassword) {
      dispatch(registerNewUser(user));
    } else {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="auth-page-container">
      <div className="auth-content-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <PersonAddIcon className="auth-main-icon" />
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join us today and start shopping</p>
          </div>

          {loading && <Loader />}
          {error && <Error error="Email Address is already registered" />}
          {success && <Success success="Your Registration is successful!" />}

          <form onSubmit={register} className="auth-form">
            <div className="input-group">
              <div className="input-icon">
                <PersonIcon />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="auth-input"
                required
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </div>

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

            <div className="input-group">
              <div className="input-icon">
                <LockIcon />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="auth-input"
                value={cpassword}
                required
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="auth-submit-button">
              <PersonAddIcon className="button-icon" />
              <span>Create Account</span>
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <a href="/login" className="auth-secondary-link">
              <LoginIcon className="link-icon" />
              <span>Already have an account? Sign In</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
