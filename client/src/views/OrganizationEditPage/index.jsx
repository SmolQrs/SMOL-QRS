import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MsgPopupContext } from "../../contexts/msgPopup";
import { UserContext } from "../../contexts/user";
import Spinner from "../../components/Spinner";
import useFetch from "../../hooks/useFetch";
import "./style.css";
import { BASE_URL } from "../../constrains";

function OrganizationEditPage() {
  const { user } = useContext(UserContext);
  const [organization, setOrganization] = useState(null);
  const { performFetch, isLoading } = useFetch(
    `/organizations/organization_detail/${user?.organizationName}`,
    (data) => setOrganization(data.result)
  );
  const navigate = useNavigate();
  const { setPopup } = useContext(MsgPopupContext);

  useEffect(() => {
    performFetch();
  }, [user]);

  const handleClick = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${BASE_URL}/organizations/update/${user?.organizationName}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(organization),
        }
      );
      const json = await response.json();
      if (json.success) {
        setPopup({
          type: "success",
          text: `De organisatie ${user?.organizationName} is successvol updated...`,
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
      console.log(error.message);
    }
  };

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
  const disabilityOptions = [
    { value: "Lichamelijk", label: "Lichamelijk" },
    { value: "Psychisch", label: "Psychisch" },
    { value: "Verstandelijk", label: "Verstandelijk" },
    { value: "Geen", label: "Geen" },
  ];
  const defaultDisabilities = organization?.disabilities?.map((disability) => ({
    value: disability,
    label: disability,
  }));
  const defaultGender = {
    value: organization?.forGender,
    label:
      organization?.forGender === "all"
        ? "alle"
        : organization?.forGender === "M"
        ? "Mannen"
        : "Vrouwen",
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="organization-edit-page">
      <h3>Profiel doelgroep voor {user?.organizationName}</h3>
      <div className="age-limits">
        <Input
          name="minAge"
          type="number"
          label="Leeftijd van"
          value={organization?.minAge || ""}
          errorMessage="Required Field"
          onChange={(e) =>
            setOrganization({ ...organization, minAge: e.target.value })
          }
        />
        <Input
          name="maxAge"
          type="number"
          label="Leeftijd tot"
          value={organization?.maxAge || ""}
          onChange={(e) =>
            setOrganization({ ...organization, maxAge: e.target.value })
          }
        />
      </div>
      <div>
        <label>Geslacht</label>
        <Select
          onChange={(selectedOption) =>
            setOrganization({
              ...organization,
              forGender: selectedOption?.value,
            })
          }
          // closeMenuOnSelect={false}
          styles={selectStyles}
          defaultValue={defaultGender}
          placeholder="Kies een functie"
          options={[
            { value: "all", label: "alle" },
            { value: "M", label: "Mannen" },
            { value: "V", label: "Vrouwen" },
          ]}
        />
      </div>
      <div>
        <label>Mogelijkheden voor gehandicapten</label>
        <Select
          onChange={(selectedOption) =>
            setOrganization({
              ...organization,
              disabilities: selectedOption?.map((elm) => elm.value),
            })
          }
          isMulti
          // closeMenuOnSelect={false}
          styles={selectStyles}
          defaultValue={defaultDisabilities}
          placeholder="Kies een functie"
          options={disabilityOptions}
        />
      </div>
      <div className="organization-edit-buttons">
        <Button text="Terug" onClick={() => navigate(-1)} />
        <Button text="Wijzigen" onClick={handleClick} />
      </div>
    </div>
  );
}

export default OrganizationEditPage;
