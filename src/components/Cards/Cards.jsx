import React from "react";

export default function Card({ onClick, flipped, image }) {
  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img
            src={`./public/image/logo.png`}
            alt="carte"
            className="card-image"
          />
        </div>
        <div className="card-back">
          <img
            src={`./public/image/${image}`}
            alt="carte"
            className="card-image"
          />
        </div>
      </div>
    </div>
  );
}
