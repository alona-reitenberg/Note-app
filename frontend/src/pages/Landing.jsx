import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="main-info">
      <div className="app-title">Note Application</div>
      <p>Create your own notes and manage them</p>
      <div>
        <Link to={`/notes`}>
          <button className="start-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
