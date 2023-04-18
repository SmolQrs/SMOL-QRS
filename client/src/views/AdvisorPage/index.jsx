import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";
import { UserContext } from "../../contexts/user";
import "./style.css";

function AdvisorHomePage() {
  const [clientNumber, setClientNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();
  const closeClient = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${BASE_URL}/clients/close-client/${clientNumber}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success) {
        setPopup({
          type: "success",
          text: "U heeft de aanvraag afgesloten.",
          open: true,
        });
        setIsOpen(false);
      } else {
        setPopup({ type: "error", text: json?.msg, open: true });
      }
    } catch (error) {
      setPopup({
        type: "error",
        text: "Sorry er ging iets fout. Probeer opnieuw.",
        open: true,
      });
      console.log(error.message);
    }
  };
  const lookOrganizations = () => {
    if (user?.clients?.includes(clientNumber)) {
      navigate(`/client-result-page/${clientNumber}`);
    } else {
      setPopup({
        type: "error",
        text: "Ongeldig aanvraag nummer.",
        open: true,
      });
    }
  };
  return (
    <div className="advisor-page">
      <div className={`info-popup ${isOpen && "popup-visible"}`}>
        <h3>{`Bevestig aanvraag afsluiten! Aanvraag: ${clientNumber}?`}</h3>
        <div className="info-popup-buttons">
          <Button text="Annuleren" onClick={() => setIsOpen(false)} />
          <Button text="Afsluiten" onClick={closeClient} />
        </div>
      </div>
      <div className="advisor-page-client-search">
        <Input
          label="Aanvraag Nummer"
          name="clientNumber"
          value={clientNumber}
          onChange={(e) => setClientNumber(e.target.value.trim())}
        />
        <Button text="Aanvraag Tonen" onClick={lookOrganizations} />
        <Button text="Aanvraag Afsluiten" onClick={() => setIsOpen(true)} />
      </div>
      <div className="advisor-page-new-client">
        <Button
          text="Nieuwe Aanvraag"
          onClick={() => navigate("/new-client")}
        />
        {/* <Button text="Organisatie Zoeken" /> */}
      </div>
    </div>
  );
}

export default AdvisorHomePage;
