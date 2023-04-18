import React from "react";
import "./style.css";

function Button({ text, onClick, className, disabled, ...rest }) {
  return (
    <div>
      <button
        className={`${className} button-component`}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {" "}
        {text}
      </button>
    </div>
  );
}

export default Button;
