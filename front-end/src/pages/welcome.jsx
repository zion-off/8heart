import React from "react";
import "../css/welcome.css";
import "../css/index.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="button-container">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
