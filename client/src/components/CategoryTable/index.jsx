import React, { useContext } from "react";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";

import "./style.css";

function CategoryTable({
  categories,
  setKeyWords,
  setSelectedCategory,
  setCategories,
}) {
  const { setPopup } = useContext(MsgPopupContext);

  const deleteCategory = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${BASE_URL}/categories/delete/${id}`, {
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
          text: "De CATEGORY is successvol deleted...",
          open: true,
        });
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        setPopup({ type: "error", text: json?.msg, open: true });
      }
    } catch (error) {}
  };
  const getKeyWords = async (title) => {
    try {
      const res = await fetch(`${BASE_URL}/categories/category/${title}`);
      const category = await res.json();
      setKeyWords(category?.result?.keyWords);
    } catch (error) {}
  };

  return (
    <div className="category-table">
      <div className="table">
        <div className="row header">
          <div className="cell">Nr</div>
          <div className="cell">Categorien</div>
          <div className="cell"></div>
        </div>
        {categories?.map((category, index) => (
          <div className="row" key={category?._id}>
            <div className="cell">{index + 1}</div>
            <div
              className="cell category-title"
              onClick={() => {
                getKeyWords(category?.title);
                setSelectedCategory(category?.title);
              }}
            >
              {category?.title}
            </div>

            <div className="cell">
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteCategory(category?._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryTable;
