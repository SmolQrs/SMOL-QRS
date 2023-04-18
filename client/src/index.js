import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppWrapper from "./AppWrapper";
import { MsgPopupProvider } from "./contexts/msgPopup";
import { UserProvider } from "./contexts/user";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppWrapper>
    <MsgPopupProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </MsgPopupProvider>
  </AppWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
