import React, { useContext, useState } from "react";
import "./style.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import { MsgPopupContext } from "../../contexts/msgPopup";
import { BASE_URL } from "../../constrains";
import Spinner from "../../components/Spinner";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const navigate = useNavigate();
  const { setPopup } = useContext(MsgPopupContext);
  const [typePassword, setTypePassword] = useState("password");
  const { user, setUser, isLoading } = useContext(UserContext);

  const sendPasswordLink = async () => {
    try {
      if (email === "") {
        setPopup({
          type: "error",
          text: "Vul het mailadres in.",
          open: true,
        });
      } else {
        const response = await fetch(
          `${BASE_URL}/users/send-password-change-link`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          }
        );
        const json = await response.json();
        if (json.success) {
          setPopup({
            type: "success",
            text: "De wachtwoord aanvrag link is verzonden.",
            open: true,
          });
        } else {
          setPopup({ type: "error", text: json?.msg, open: true });
        }
      }
    } catch (error) {
      setPopup({
        type: "error",
        text: "Sorry er ging iets fout. Probeer opnieuw.",
        open: true,
      });
    }
  };

  const sendSmsCode = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/sms-authentication`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const json = await response.json();
      localStorage.setItem("smsToken", json?.result?.smsToken);
      if (json.success) {
        setPopup({
          type: "success",
          text: "De sms verificatie-code is verzonden.",
          open: true,
        });
      } else {
        setPopup({ type: "error", text: json?.msg, open: true });
      }
    } catch (error) {
      setPopup({
        type: "error",
        text: "Sorry er ging iets fout. Probeer opnieuw.",
        open: true,
      });
    }
  };

  const login = async () => {
    const smsToken = localStorage.getItem("smsToken");

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password, smsToken, smsCode }),
    });
    const json = await response.json();
    if (json.success === true) {
      navigate("/home");
      localStorage.removeItem("smsToken");
      localStorage.setItem("accessToken", json?.result?.accessToken);
      setUser(json?.result?.user);
    }
  };
  if (isLoading) return <Spinner />;
  if (user) return <Navigate to="/home" />;
  return (
    <div className="login-form">
      <Input
        className="login-input"
        name="email"
        type="email"
        placeholder="test@mail.com"
        label="Mail Gebruiker"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="sms-input">
        <div className="password-input">
          <Input
            className="login-input-password"
            name="password"
            type={typePassword}
            label="Wachtwoord"
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
        <Button className="login-sms-button" onClick={sendSmsCode} text="Oké" />
      </div>
      <Input
        className="login-input"
        name="message"
        type="text"
        label="Sms Code"
        value={smsCode || ""}
        onChange={(e) => setSmsCode(e.target.value)}
      />
      <div className="sms-input">
        <Button
          className="password-link-button"
          onClick={sendPasswordLink}
          text="wachtwoord aanvragen"
        />
        <Button
          className="login-button"
          onClick={login}
          text="Login"
          disabled={smsCode.length === 5 ? false : true}
        />
      </div>
    </div>
  );
}

export default LoginPage;
