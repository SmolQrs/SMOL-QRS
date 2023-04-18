import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import { MsgPopupContext } from "../../contexts/msgPopup";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constrains";
import { UserContext } from "../../contexts/user";
import Spinner from "../../components/Spinner";

function ClientEditPage() {
  const { user, isLoading } = useContext(UserContext);
  const [client, setClient] = useState({});
  const { clientNumber } = useParams();
  const [municipalityData, setMunicipalityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [keyWordsData, setKeyWordsData] = useState([]);
  const { setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();

  const { performFetch: performFetchClient, isLoading: isLoadingClient } =
    useFetch(`/clients/client/${clientNumber}`, (data) =>
      setClient(data?.result?.client)
    );
  const { performFetch: performFetchMunicipalities } = useFetch(
    "/municipalities",
    setMunicipalityData
  );
  const { performFetch: performFetchCategories } = useFetch(
    "/categories",
    setCategoryData
  );
  const { performFetch: performFetchKeyWords } = useFetch(
    `/categories/category/${client?.category}`,
    setKeyWordsData
  );
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    performFetchMunicipalities();
    performFetchCategories();
    performFetchClient({
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  useEffect(() => {
    performFetchKeyWords();
  }, [client?.category]);

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
  switch (client?.disabilityType) {
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

  const defaultMunicipality = client
    ? {
        value: client?.municipality,
        label: client?.municipality,
      }
    : null;

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

  const updateClient = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${BASE_URL}/clients/update/${clientNumber}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(client),
        }
      );
      const json = await response.json();
      if (json?.success) {
        setPopup({
          type: "success",
          text: "De nieuwe client is successvol aangemaakt...",
          open: true,
        });
        navigate(`/client-result-page/${json?.result?.clientNumber}`);
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

  //   if (isLoading && isLoadingClient) return <Spinner />;
  if (user?.role === "intaker" || user?.role === "coordinator")
    return (
      <>
        {isLoading && <Spinner />}
        {!isLoadingClient && (
          <div className="new-client-page">
            <div className="new-client-form ">
              <div className="new-client-left">
                <Input
                  className="login-input"
                  name="clientName"
                  type="text"
                  placeholder="Mia Pieters"
                  label="Cliént Naam"
                  value={client?.clientName || ""}
                  onChange={(e) =>
                    setClient({ ...client, clientName: e.target.value })
                  }
                />

                <Input
                  className="login-input"
                  name="age"
                  type="text"
                  placeholder={25}
                  label="Leeftijd"
                  value={client?.age || ""}
                  onChange={(e) =>
                    setClient({ ...client, age: e.target.value })
                  }
                />
                <label>Gemeente</label>
                <Select
                  defaultValue={defaultMunicipality}
                  onChange={(selectedOption) =>
                    setClient({
                      ...client,
                      municipality: selectedOption?.value,
                    })
                  }
                  styles={selectStyles}
                  placeholder="Kies een Gemeente"
                  options={municipalityOptions}
                />

                <Input
                  className="login-input"
                  name="adress"
                  type="text"
                  placeholder="Straat + Huis Nummer"
                  label="Adres"
                  value={client?.address || ""}
                  onChange={(e) =>
                    setClient({ ...client, address: e.target.value })
                  }
                />
                <Input
                  className="login-input"
                  name="postCode"
                  type="text"
                  placeholder="1234AB"
                  label="Postcode Plaats"
                  value={client?.postCode || ""}
                  onChange={(e) =>
                    setClient({ ...client, postCode: e.target.value })
                  }
                />
                <Input
                  className="login-input"
                  name="email"
                  type="email"
                  placeholder="test@gmail.com"
                  label="Email"
                  value={client?.email || ""}
                  onChange={(e) =>
                    setClient({ ...client, email: e.target.value })
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
                  value={client?.phone || ""}
                  onChange={(e) =>
                    setClient({ ...client, phone: e.target.value })
                  }
                />
              </div>

              <div className="new-client-right">
                <label>Geslacht</label>
                <Select
                  onChange={(selectedOption) =>
                    setClient({ ...client, gender: selectedOption?.value })
                  }
                  // closeMenuOnSelect={false}
                  styles={selectStyles}
                  defaultValue={{
                    value: client?.gender,
                    label: client?.gender,
                  }}
                  placeholder="Kies een geslacht"
                  options={[
                    { value: "V", label: "Vrouw" },
                    { value: "M", label: "Meneer" },
                  ]}
                />
                <label>Beperking</label>
                <Select
                  onChange={(selectedOption) =>
                    setClient({
                      ...client,
                      disabilityType: selectedOption?.value,
                    })
                  }
                  // closeMenuOnSelect={false}
                  styles={selectStyles}
                  defaultValue={{
                    value: client?.disabilityType,
                    label: client?.disabilityType,
                  }}
                  placeholder="Kies een Beperking"
                  options={disabilityTypeOptions}
                />
                <label>Beperking (optioneel)</label>
                <Select
                  onChange={(selectedOption) =>
                    setClient({
                      ...client,
                      disability: selectedOption?.value,
                    })
                  }
                  // closeMenuOnSelect={false}
                  styles={selectStyles}
                  defaultValue={{
                    value: client?.disability,
                    label: client?.disability,
                  }}
                  placeholder="Kies een Beperking"
                  options={disabilityOptions}
                />
                <label>Categorie</label>
                <Select
                  onChange={(selectedOption) => {
                    setClient({ ...client, category: selectedOption?.value });
                  }}
                  // closeMenuOnSelect={false}
                  styles={selectStyles}
                  defaultValue={{
                    value: client?.category,
                    label: client?.category,
                  }}
                  placeholder="Kies een Category"
                  options={categoryOptions}
                />
                <label>Kernwoord(en)</label>
                <Select
                  onChange={(selectedOption) =>
                    setClient({
                      ...client,
                      keyWords: selectedOption?.map((elm) => elm.value),
                    })
                  }
                  // closeMenuOnSelect={false}
                  styles={selectStyles}
                  defaultValue={client?.keyWords?.map((elm) => ({
                    value: elm,
                    label: elm,
                  }))}
                  isMulti
                  placeholder="Kies Kernwoord(en)"
                  options={keyWordsOptions}
                />

                <label>Toelichting</label>
                <textarea
                  name="extraInformation"
                  placeholder="Eventueel extra informatie hier notereen."
                  rows={5}
                  value={client?.extraInformation || ""}
                  onChange={(e) =>
                    setClient({ ...client, extraInformation: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="new-client-buttons">
              <Button text="Terug" onClick={() => navigate(-1)} />
              <Button
                text="Wijzigen"
                onClick={updateClient}
                disabled={client?.isEmailSent}
              />
            </div>
          </div>
        )}
      </>
    );
}

export default ClientEditPage;
