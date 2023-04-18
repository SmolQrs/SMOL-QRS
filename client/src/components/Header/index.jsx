import React, { useContext } from "react";
import smol from "../../assets/logo.svg";
import "./style.css";
import { UserContext } from "../../contexts/user";

function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="nav-header">
      <div className="header-container">
        <div className="logo-organization-name">
          <div className="logo-image">
            <img src={smol} alt="smol-logo" />
          </div>
          <div className="moving-text">
            {user?.organizationName && (
              <marquee truespeed={1000}>{user?.organizationName}</marquee>
            )}
          </div>
        </div>
        <div className="user-name-logout">
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <span className="logout-button" onClick={logout}>
            <i className="fa-solid fa-power-off"></i> <span>uitloggen</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;

// ?.length > 25
//                 ? user?.organizationName?.substring(0, 24) + "..."
//                 : user?.organizationName
