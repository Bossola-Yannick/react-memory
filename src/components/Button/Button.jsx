import React from "react";

export default function Button({ onClick, children, className }) {
  return (
    <button onClick={onClick} className={`custom-button ${className}`}>
      {children}
    </button>
  );
}
