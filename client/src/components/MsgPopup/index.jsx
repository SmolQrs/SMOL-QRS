import React, { useContext, useEffect } from "react";
import { MsgPopupContext } from "../../contexts/msgPopup";
import "./style.css";

const MsgPopup = () => {
  const { popup, setPopup } = useContext(MsgPopupContext);
  useEffect(() => {
    if (popup.open) {
      const timer = setTimeout(() => {
        setPopup({ ...popup, open: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [popup, setPopup]);

  return (
    <div
      className={
        popup?.open
          ? `msg-box ${popup?.type}-popup`
          : `msg-box ${popup?.type}-popup hidden`
      }
    >
      <h5 className="alert-text">{popup?.text}</h5>
    </div>
  );
};

export default MsgPopup;
