import "./style.css";
import React, { useContext, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { MsgPopupContext } from "../../contexts/msgPopup";
import { BASE_URL } from "../../constrains";

function KeyWordUpdateModal({ isOpen, keyWord, setIsOpen, setKeyWords }) {
  const { setPopup } = useContext(MsgPopupContext);
  const [updatedKeyWord, setUpdatedKeyword] = useState(
    keyWord
    // keyWord: keyWord?.keyWord,
    // definition: keyWord?.definition,
  );
  const updateKeyWord = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${BASE_URL}/categories/update-keyWord/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedKeyWord),
      });
      const json = await res.json();
      if (json.success) {
        setPopup({
          type: "success",
          text: "De kernwoord is successvol updated...",
          open: true,
        });
        setKeyWords(json?.result?.keyWords);
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
    }
  };

  return (
    <div className={`key-word-update ${isOpen && "modal-visible"}`}>
      <i className="fa-solid fa-xmark" onClick={() => setIsOpen(false)}></i>
      <Input
        className="login-input"
        name="keyWord"
        type="text"
        label="Kern Woord"
        value={updatedKeyWord?.keyWord}
        onChange={(e) =>
          setUpdatedKeyword({ ...updatedKeyWord, keyWord: e.target.value })
        }
      />

      <Input
        className="login-input"
        name="definition"
        type="text"
        label="Definitie"
        value={updatedKeyWord?.definition}
        onChange={(e) =>
          setUpdatedKeyword({ ...updatedKeyWord, definition: e.target.value })
        }
      />
      <div className="modal-buttons">
        <Button
          className="cancel-button"
          text="Cancel"
          onClick={() => setIsOpen(false)}
        />
        <Button
          className="update-button"
          text="Update"
          onClick={() => updateKeyWord(updatedKeyWord?._id)}
        />
      </div>
    </div>
  );
}

export default KeyWordUpdateModal;
