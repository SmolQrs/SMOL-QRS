import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/smol.jpeg";

import "./style.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-text">
        <img className="home-logo" src={logo} alt="logo" />
        <h2 className="home-header">Welkom SMOL Quick Response System</h2>
        <p className="home-definition">
          Snel antwoord op de vraag welke maatschappelijke organisatie hulp kan
          bieden.
        </p>
      </div>
      <Button text="Start" onClick={() => navigate("/login")} />
    </div>
  );
}

export default WelcomePage;
