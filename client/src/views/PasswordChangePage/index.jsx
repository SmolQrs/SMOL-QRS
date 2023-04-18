import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";
import "./style.css";

function PasswordChangePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();

  const changePassword = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/users/password-change`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: password }),
      });
      const res = await response.json();
      if (res?.success) {
        setPopup({
          type: "success",
          text: "Wachtwoord wijzigen is successvol",
          open: true,
        });
      } else {
        setPopup({
          type: "error",
          text: "Sorry link nog niet geldig.Ga naar login pagina en vraag nog een keer",
          open: true,
        });
      }
      console.log(res?.result);
    } catch (error) {
      setPopup({
        type: "error",
        text: "Sorry er ging iets fout. Probeer opnieuw.",
        open: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <h2>Type jouw nieuwe wachtwoord aub! </h2>
      <div className="password-input">
        <Input
          className="login-input-password"
          name="password"
          type={typePassword}
          label="Wachtwoord"
          errorMessage="Wachtwoord moet bestaan uit: minimaal 1 cijfer, 1 hoofd- en 1 kleine letter en bevat minimaal 6 karakters"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={
            typePassword === "text"
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
          onClick={() =>
            typePassword === "password"
              ? setTypePassword("text")
              : setTypePassword("password")
          }
        ></i>
      </div>
      <div className="change-password-buttons">
        <Button text="Save Password" onClick={changePassword} />
        <Button text="inloggen pagina" onClick={() => navigate("/login")} />
      </div>
    </div>
  );
}

export default PasswordChangePage;
