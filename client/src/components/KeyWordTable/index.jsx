import React, { useContext, useState } from "react";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";
import KeyWordUpdateModal from "../KeyWordUpdateModal";
import "./style.css";

function KeyWordTable({ keyWords, setKeyWords }) {
  const { setPopup } = useContext(MsgPopupContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeyWord, setSelectedKeyWord] = useState(null);

  const deleteKeyWord = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${BASE_URL}/categories/delete-keyword/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setPopup({
          type: "success",
          text: "De kernwoord is successvol deleted...",
          open: true,
        });
        setKeyWords(keyWords?.filter((keyWord) => keyWord?._id !== id));
      } else {
        setPopup({ type: "error", text: json?.msg, open: true });
      }
    } catch (error) {}
  };

  return (
    <div className="keywords-table">
      {isOpen && (
        <KeyWordUpdateModal
          isOpen={isOpen}
          keyWord={selectedKeyWord}
          setIsOpen={setIsOpen}
          setKeyWords={setKeyWords}
        />
      )}
      <div className="table">
        <div className="row header">
          <div className="cell">Nr</div>
          <div className="cell">K.Woord</div>
          <div className="cell">Definitie</div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        {keyWords.map((elm, index) => (
          <div className="row" key={elm?._id}>
            <div className="cell">{index + 1}</div>
            <div className="cell">{elm.keyWord}</div>
            <div className="cell">{elm.definition}</div>
            <div className="cell">
              <i
                className="fa-solid fa-wrench"
                onClick={() => {
                  setSelectedKeyWord(elm);
                  setIsOpen(!isOpen);
                }}
              ></i>
            </div>
            <div className="cell">
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteKeyWord(elm?._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyWordTable;
