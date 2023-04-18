import React, { useState } from "react";
import "./style.css";
function Input(props) {
  const [focus, setFocus] = useState(false);
  const { defaultValue, label, onChange, errorMessage, className, ...inputs } =
    props;
  return (
    <div className={`input-component ${className}`}>
      {label && <label>{label}</label>}
      <input
        {...inputs}
        onChange={onChange}
        defaultValue={defaultValue}
        onBlur={() => setFocus(true)}
        focus={focus.toString()}
      />
      <span>
        <i className="fa-solid fa-triangle-exclamation"></i>
        {errorMessage}
      </span>
    </div>
  );
}

export default Input;
