import React from "react";
import "./style.css";

function SelectBox({ options, placeholder, onChange, label, className }) {
  return (
    <div className={`select-box-component ${className}`}>
      <label>{label}</label>
      <select onChange={onChange} name="label">
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option className="select-options" value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
