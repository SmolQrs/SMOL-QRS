import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../contexts/user";
import AdvisorHomePage from "../AdvisorPage";
import "./style.css";

function HomePage() {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  if (user === undefined) return <Navigate to="/login" />;
  return (
    <div className="home-page">
      <div className="home-page-welcome">
        <h1>{`Welkom ${user?.firstName} ${user?.lastName}`}</h1>
        <p>Maak een keuze:</p>
      </div>
      {user?.role === "admin" && (
        <>
          <div className="admin-home">
            <Button
              text="Nieuwe Organizatie"
              onClick={() => navigate("/new-organization")}
            />
            <Button
              text="Beheer Categoriën"
              onClick={() => navigate("/category")}
            />
            <Button
              text="Analyse Tool"
              onClick={() => navigate("/report-page")}
            />
          </div>
        </>
      )}
      {user?.role === "intaker" && (
        <>
          <AdvisorHomePage />
        </>
      )}
      {user?.role === "coordinator" && (
        <div className="coordinator-home">
          <AdvisorHomePage />
          <div className="coordinator-buttons">
            <Button
              text="Beheer Medewerkers"
              onClick={() => navigate("/new-employee")}
            />
            <Button
              text="Profiel Doelgroep"
              onClick={() => navigate("/organization-edit")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
