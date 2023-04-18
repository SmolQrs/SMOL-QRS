import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "react-select";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import { MsgPopupContext } from "../../contexts/msgPopup";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constrains";
import { UserContext } from "../../contexts/user";
import Spinner from "../../components/Spinner";

function NewClientPage() {
  const { user, isLoading } = useContext(UserContext);
  const [newClient, setNewClient] = useState({});
  const [municipalityData, setMunicipalityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [keyWordsData, setKeyWordsData] = useState([]);
  const { setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();
  const municipalitySelect = useRef();
  const categorySelect = useRef();
  const keyWordsSelect = useRef();
  const genderSelect = useRef();
  const disabilityTypeSelect = useRef();
  const disabilitySelect = useRef();

  const { performFetch } = useFetch("/municipalities", setMunicipalityData);
  const { performFetch: performFetchCategories } = useFetch(
    "/categories",
    setCategoryData
  );
  const { performFetch: performFetchKeyWords } = useFetch(
    `/categories/category/${newClient?.category}`,
    setKeyWordsData
  );

  useEffect(() => {
    performFetch();
    performFetchCategories();
  }, []);

  useEffect(() => {
    performFetchKeyWords();
  }, [newClient?.category]);

  const municipalityOptions = municipalityData?.result?.map((municipality) => ({
    value: municipality?.municipalityName,
    label: municipality?.municipalityName,
  }));
  const categoryOptions = categoryData?.result?.map((category) => ({
    value: category?.title,
    label: category?.title,
  }));
  const keyWordsOptions = keyWordsData?.result?.keyWords?.map((keyWord) => ({
    value: keyWord?.keyWord,
    label: keyWord?.keyWord,
  }));
  const disabilityTypeOptions = [
    { value: "Geen", label: "Geen" },
    { value: "Lichamelijk", label: "Lichamelijk" },
    { value: "Psychisch", label: "Psychisch" },
    { value: "Verstandelijk", label: "Verstandelijk" },
  ];
  let disabilityOptions;
  switch (newClient?.disabilityType) {
    case "Geen":
      disabilityOptions = [{ value: "Geen", label: "Geen" }];
      break;
    case "Lichamelijk":
      disabilityOptions = [
        {
          value: "Mobiliteit (Rolstoel, rollator, etc.)",
          label: "Mobilitiet (Rolstoel, rollator, etc.)",
        },
        { value: "Visuele Beperking", label: "Visuele Beperking" },
        { value: "Auditieve Beperking", label: "Auditieve Beperking" },
        {
          value: "Niet Aangeboren Hersenletsel (NAH)",
          label: "Niet Aangeboren Hersenletsel (NAH)",
        },
        { value: "Anders (svp toelichten)", label: "Anders (svp toelichten)" },
      ];
      break;
    case "Verstandelijk":
      disabilityOptions = [
        {
          value: "Lichte verstandelijke beperking",
          label: "Lichte verstandelijke beperking",
        },
        { value: "Anders (svp toelichten)", label: "Anders (svp toelichten)" },
      ];
      break;
    case "Psychisch":
      disabilityOptions = [
        { value: "Autisme", label: "Autisme" },
        { value: "Angst en onzekerheid", label: "Angst en onzekerheid" },
        { value: "Anders (svp toelichten)", label: "Anders (svp toelichten)" },
      ];
      break;
    default:
      disabilityOptions = [
        { value: "Anders (svp toelichten)", label: "Anders (svp toelichten)" },
      ];
  }

  const clearSelectBoxes = () => {
    genderSelect.current.clearValue();
    categorySelect.current.clearValue();
    municipalitySelect.current.clearValue();
    keyWordsSelect.current.clearValue();
    disabilityTypeSelect.current.clearValue();
    disabilitySelect.current.clearValue();
  };

  // TODO *** For authentication token will be added ***

  const createNewClient = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${BASE_URL}/clients/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });
      const json = await response.json();
      if (json?.success) {
        setPopup({
          type: "success",
          text: "De nieuwe client is successvol aangemaakt...",
          open: true,
        });
        clearSelectBoxes();
        setNewClient({});
        navigate(`/client-result-page/${json?.result?.clientNumber}`);
        console.log(json?.result);
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
  // const handleClick = () => {

  //   console.log(newClient);
  // };

  const selectStyles = {
    control: (styles) => ({ ...styles, fontSize: "14px", overflowY: "scroll" }),
    option: (styles) => ({ ...styles, fontSize: "14px" }),
    multiValue: (styles) => ({
      ...styles,
      background: "#fce599",
      color: "#195482",
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      background: "#fce599",
      color: "#195482",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      background: "#fce599",
      cursor: "pointer",
      color: "#195482",
      ":hover": {
        color: "#195482",
      },
    }),
  };
  if (isLoading) return <Spinner />;
  if (user?.role === "intaker" || user?.role === "coordinator")
    return (
      <div className="new-client-page">
        <div className="new-client-form ">
          <div className="new-client-left">
            <Input
              className="login-input"
              name="clientName"
              type="text"
              placeholder="Mia Pieters"
              label="Cliént Naam"
              value={newClient?.clientName || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, clientName: e.target.value })
              }
            />

            <Input
              className="login-input"
              name="age"
              type="text"
              placeholder={25}
              label="Leeftijd"
              value={newClient?.age || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, age: e.target.value })
              }
            />
            <label>Gemeente</label>
            <Select
              onChange={(selectedOption) =>
                setNewClient({
                  ...newClient,
                  municipality: selectedOption?.value,
                })
              }
              // closeMenuOnSelect={false}
              styles={selectStyles}
              ref={municipalitySelect}
              placeholder="Kies een Gemeente"
              options={municipalityOptions}
            />

            <Input
              className="login-input"
              name="adress"
              type="text"
              placeholder="Straat + Huis Nummer"
              label="Adres"
              value={newClient?.address || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, address: e.target.value })
              }
            />
            <Input
              className="login-input"
              name="postCode"
              type="text"
              placeholder="1234AB"
              label="Postcode Plaats"
              value={newClient?.postCode || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, postCode: e.target.value })
              }
            />
            <Input
              className="login-input"
              name="email"
              type="email"
              placeholder="test@gmail.com"
              label="Email"
              value={newClient?.email || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
            />
            <Input
              className="login-input"
              name="phone"
              type="text"
              pattern="^\+(?:[0-9] ?){6,14}[0-9]$"
              errorMessage="Phone number format should be like +3112345678"
              placeholder="+310612345678"
              label="Telefoon"
              value={newClient?.phone || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, phone: e.target.value })
              }
            />
          </div>

          <div className="new-client-right">
            <label>Geslacht</label>
            <Select
              ref={genderSelect}
              onChange={(selectedOption) =>
                setNewClient({ ...newClient, gender: selectedOption?.value })
              }
              // closeMenuOnSelect={false}
              styles={selectStyles}
              placeholder="Kies een geslacht"
              options={[
                { value: "V", label: "Vrouw" },
                { value: "M", label: "Meneer" },
              ]}
            />
            <label>Beperking</label>
            <Select
              ref={disabilityTypeSelect}
              onChange={(selectedOption) =>
                setNewClient({
                  ...newClient,
                  disabilityType: selectedOption?.value,
                })
              }
              // closeMenuOnSelect={false}
              styles={selectStyles}
              placeholder="Kies een Beperking"
              options={disabilityTypeOptions}
            />
            <label>Beperking (optioneel)</label>
            <Select
              ref={disabilitySelect}
              onChange={(selectedOption) =>
                setNewClient({
                  ...newClient,
                  disability: selectedOption?.value,
                })
              }
              // closeMenuOnSelect={false}
              styles={selectStyles}
              placeholder="Kies een Beperking"
              options={disabilityOptions}
            />
            <label>Categorie</label>
            <Select
              ref={categorySelect}
              onChange={(selectedOption) => {
                setNewClient({ ...newClient, category: selectedOption?.value });
              }}
              // closeMenuOnSelect={false}
              styles={selectStyles}
              placeholder="Kies een Category"
              options={categoryOptions}
            />
            <label>Kernwoord(en)</label>
            <Select
              ref={keyWordsSelect}
              onChange={(selectedOption) =>
                setNewClient({
                  ...newClient,
                  keyWords: selectedOption?.map((elm) => elm.value),
                })
              }
              // closeMenuOnSelect={false}
              styles={selectStyles}
              isMulti
              placeholder="Kies Kernwoord(en)"
              options={keyWordsOptions}
            />

            <label>Toelichting</label>
            <textarea
              name="extraInformation"
              placeholder="Eventueel extra informatie hier notereen."
              rows={5}
              value={newClient?.extraInformation || ""}
              onChange={(e) =>
                setNewClient({ ...newClient, extraInformation: e.target.value })
              }
            />
          </div>
        </div>
        <div className="new-client-buttons">
          <Button text="Terug" onClick={() => navigate(-1)} />
          <Button text="Opslaan" onClick={createNewClient} />
        </div>
      </div>
    );
}

export default NewClientPage;
