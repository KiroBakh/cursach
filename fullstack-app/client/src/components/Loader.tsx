import React from "react";
import "../styles/styles.css";

export default function Loader() {
  return (
    <div className="back-loader">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
}
