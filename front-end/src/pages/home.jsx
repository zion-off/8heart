import React from "react";
import "../css/home.css";
import "../css/index.css";
import logo from "../assets/logo.png";

function Home() {
    
  return (
    <div className="home-container">
      <div className="eight-ball">
        <img src={logo} alt=""></img>
      </div>
    </div>
  );
}

export default Home;
