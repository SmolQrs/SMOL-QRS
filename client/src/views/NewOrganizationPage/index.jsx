import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";
import "./style.css";

function NewOrganizationPage() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { setPopup } = useContext(MsgPopupContext);

  const handleClick = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${BASE_URL}/organizations/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.success) {
        setPopup({
          type: "success",
          text: "De nieuwe organisatie is successvol aangemaakt...",
          open: true,
        });
        setData({});
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
  return (
    <div className="new-organization-page">
      <Input
        name="organizationName"
        type="text"
        placeholder="Naam van Organisatie"
        errorMessage="Verplicht veld"
        required={true}
        label="Organisatie Naam"
        value={data?.organizationName || ""}
        onChange={(e) => setData({ ...data, organizationName: e.target.value })}
      />
      <Input
        name="firstName"
        type="text"
        placeholder="Jan"
        label="Voornaam coördinator"
        errorMessage="Verplicht veld"
        required={true}
        value={data?.firstName || ""}
        onChange={(e) => setData({ ...data, firstName: e.target.value })}
      />
      <Input
        name="lastName"
        type="text"
        placeholder="Janssen"
        label="Achternaam coördinator"
        errorMessage="Verplicht veld"
        required={true}
        value={data?.lastName || ""}
        onChange={(e) => setData({ ...data, lastName: e.target.value })}
      />
      <Input
        name="email"
        type="email"
        placeholder="test@test.com"
        errorMessage="Verplicht veld"
        required={true}
        label="Email coördinator"
        value={data?.email || ""}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <Input
        name="phone"
        type="text"
        placeholder="+31061234567"
        pattern="^\+31(?:[0-9] ?){6,14}[0-9]$"
        errorMessage="Nummer moet beginnen met +31"
        label="Telefoon coördinator"
        value={data?.phone || ""}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
      />
      <Input
        name="password"
        type="password"
        label="Wachtwoord coördinator"
        errorMessage="Wachtwoord moet bestaan uit: minimaal 1 cijfer, 1 hoofd- en 1 kleine letter en bevat minimaal 6 karakters"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
        value={data?.password || ""}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <div className="organization-buttons">
        <Button text="Terug" onClick={() => navigate(-1)} />
        <Button text="Verzenden" onClick={handleClick} />
      </div>
    </div>
  );
}

export default NewOrganizationPage;
