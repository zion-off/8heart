import React, { useState } from "react";
import "../css/home.css";
import "../css/index.css";
import logo from "../assets/logo.png";

function Home() {
  const [isHeld, setIsHeld] = useState(false);

  const handleHold = () => {
    setIsHeld(true);
  };

  const handleRelease = () => {
    setIsHeld(false);
  };

  return (
    <div className="home-container">
      <div className={`eight-ball ${isHeld ? "held" : ""}`}
      onMouseDown={handleHold}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}>
        <img src={logo} alt=""></img>
      </div>
    </div>
  );
}

export default Home;
