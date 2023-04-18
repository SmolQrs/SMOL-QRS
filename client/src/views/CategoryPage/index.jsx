import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import CategoryTable from "../../components/CategoryTable";
import Input from "../../components/Input";
import KeyWordTable from "../../components/KeyWordTable";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";

import useFetch from "../../hooks/useFetch";
import "./style.css";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newKeyWord, setNewKeyWord] = useState({});
  const [keyWords, setKeyWords] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();

  const { performFetch } = useFetch(
    `/categories/search?query=${categorySearch}`,
    (data) => setCategories(data?.result)
  );

  useEffect(() => {
    performFetch();
  }, [categorySearch]);

  const createNewCategory = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${BASE_URL}/categories/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newCategory }),
      });
      const json = await response.json();
      if (json?.success) {
        setNewCategory("");
        setPopup({
          type: "success",
          text: "De nieuwe category is successvol aangemaakt...",
          open: true,
        });
        setCategories([...categories, json?.result]);
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
  const createNewKeyWord = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${BASE_URL}/categories/add-keyword/${selectedCategory}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newKeyWord),
        }
      );
      const json = await response.json();
      if (json?.success) {
        setNewCategory("");
        setPopup({
          type: "success",
          text: "De nieuwe kernwoord is successvol aangemaakt...",
          open: true,
        });
        setKeyWords(json?.result?.keyWords);
        setNewKeyWord({});
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
    <div className="category-page">
      <div className="tables-section">
        <div className="category-section">
          <div className="category-search">
            <Input
              name="category"
              type="text"
              placeholder="Search a category"
              value={categorySearch || ""}
              onChange={(e) => setCategorySearch(e.target.value)}
            />
            <i className="fa-solid fa-filter"></i>
          </div>
          <CategoryTable
            categories={categories}
            setKeyWords={setKeyWords}
            setSelectedCategory={setSelectedCategory}
            setCategories={setCategories}
          />
          <div className="new-category">
            <Input
              name="category"
              type="text"
              label="Nieuwe Category"
              placeholder="Naam van de category"
              value={newCategory || ""}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              className="add-keyword-button"
              onClick={createNewCategory}
              text="Add"
            />
          </div>
        </div>
        <div className="keywords-section">
          {keyWords && (
            <>
              <KeyWordTable keyWords={keyWords} setKeyWords={setKeyWords} />
              <div className="new-keyWord">
                <div className="newKeyWord-inputs">
                  <Input
                    name="keyWord"
                    type="text"
                    label={`KernW. voor ${selectedCategory}`}
                    placeholder="Naam van de kernwoord"
                    value={newKeyWord?.keyWord || ""}
                    onChange={(e) =>
                      setNewKeyWord({ ...newKeyWord, keyWord: e.target.value })
                    }
                  />
                  <Input
                    name="keyWord"
                    type="text"
                    label="Definition"
                    placeholder="Over de kernwoord"
                    value={newKeyWord?.definition || ""}
                    onChange={(e) =>
                      setNewKeyWord({
                        ...newKeyWord,
                        definition: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  className="add-keyword-button"
                  onClick={createNewKeyWord}
                  text="Add"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Button
        className="add-keyword-button"
        onClick={() => navigate(-1)}
        text="Terug"
      />
    </div>
  );
}

export default CategoryPage;
