import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "react-select";
import { MsgPopupContext } from "../../contexts/msgPopup";
import "./style.css";
import useFetch from "../../hooks/useFetch";
import EmployeeTable from "../../components/EmployeeTable";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../contexts/user";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constrains";

function EmployeeCreateAndEdit() {
  const [newEmployee, setNewEmployee] = useState({});
  const [municipalityData, setMunicipalityData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { performFetch: performFetchEmployees } = useFetch(
    "/users/coworkers",
    (data) => setEmployees(data?.result)
  );
  const token = localStorage.getItem("accessToken");
  const { setPopup } = useContext(MsgPopupContext);
  const roleSelect = useRef();
  const categorySelect = useRef();
  const municipalitySelect = useRef();
  const { performFetch } = useFetch("/municipalities", setMunicipalityData);
  const { performFetch: performFetchSelectedEmployee, isLoading } = useFetch(
    `/users/coworker/${selectedEmployee}`,
    (data) => setNewEmployee(data?.result)
  );
  const { performFetch: performFetchCategories } = useFetch(
    "/categories",
    setCategoryData
  );

  useEffect(() => {
    if (selectedEmployee)
      performFetchSelectedEmployee({
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    // console.log(newEmployee);
  }, [selectedEmployee]);

  useEffect(() => {
    performFetch();
    performFetchCategories();
    performFetchEmployees({
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  //* ~~~ All Code in This Section For select boxes ~~~~

  // * This is for select box styling

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

  // * This is done for options type of Select component

  const municipalityOptions = municipalityData?.result?.map((municipality) => ({
    value: municipality?.municipalityName,
    label: municipality?.municipalityName,
  }));
  const categoryOptions = categoryData?.result?.map((category) => ({
    value: category?.title,
    label: category?.title,
  }));
  const defaultMunicipalities = selectedEmployee
    ? newEmployee?.municipalities?.map((elm) => ({ value: elm, label: elm }))
    : null;
  const defaultCategories = selectedEmployee
    ? newEmployee?.categories?.map((elm) => ({ value: elm, label: elm }))
    : null;
  const defaultRole = selectedEmployee
    ? {
        value: newEmployee?.role,
        label: newEmployee?.role,
      }
    : null;

  //* This is for clearing selected option
  const clearSelectBoxes = () => {
    roleSelect.current.clearValue();
    categorySelect.current.clearValue();
    municipalitySelect.current.clearValue();
  };

  //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const createEmployee = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newEmployee,
          organizationName: user?.organizationName,
        }),
      });
      const json = await response.json();
      if (json.success) {
        performFetchEmployees({
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPopup({
          type: "success",
          text: "De nieuwe medewerker is aangemaakt en heeft een mail ontvangen.",
          open: true,
        });

        clearSelectBoxes();
        setNewEmployee({});
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
  const updateEmployee = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/update/${selectedEmployee}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newEmployee),
        }
      );
      const json = await response.json();
      if (json.success) {
        if (user._id === selectedEmployee) setUser(json.result);
        setEmployees(
          employees.map((employee) =>
            employee._id === selectedEmployee ? newEmployee : employee
          )
        );
        setPopup({
          type: "success",
          text: "De medewerker is bijgewerkt.",
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

  return (
    <div className="new-employee-page">
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="left-side">
          <label>Functie</label>
          <Select
            onChange={(selectedOption) =>
              setNewEmployee({ ...newEmployee, role: selectedOption?.value })
            }
            // closeMenuOnSelect={false}
            styles={selectStyles}
            ref={roleSelect}
            defaultValue={defaultRole}
            placeholder="Kies een functie"
            options={[
              { value: "coordinator", label: "coordinator" },
              { value: "intaker", label: "intaker" },
            ]}
          />
          <Input
            name="firstName"
            type="text"
            placeholder="Jan"
            label="Voornaam Medewerker"
            value={newEmployee?.firstName || ""}
            errorMessage="Verplicht veld"
            required={true}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, firstName: e.target.value })
            }
          />
          <Input
            name="lastName"
            type="text"
            placeholder="Janssen"
            label="Achternaam Medewerker"
            errorMessage="Verplicht veld"
            required={true}
            value={newEmployee?.lastName || ""}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, lastName: e.target.value })
            }
          />
          <Input
            name="email"
            type="email"
            placeholder="test@test.com"
            label="Email Medewerker"
            value={newEmployee?.email || ""}
            errorMessage="Verplicht veld"
            required={true}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                email: e.target.value,
              })
            }
          />
          <Input
            name="phone"
            type="text"
            placeholder="+3161234567"
            label="Telefoon Medewerker"
            value={newEmployee?.phone || ""}
            pattern="^\+31(?:[0-9] ?){6,14}[0-9]$"
            errorMessage="Nummer moet beginnen met +31"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
          />
          {!selectedEmployee && (
            <Input
              name="password"
              type="password"
              label="Wachtwoord Medewerker"
              value={newEmployee?.password || ""}
              errorMessage="Wachtwoord moet bestaan uit: minimaal 1 cijfer, 1 hoofd- en 1 kleine letter en bevat minimaal 6 karakters"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  password: e.target.value,
                })
              }
            />
          )}
          <label>Categorië(n)</label>
          <Select
            onChange={(selectedOption) =>
              setNewEmployee({
                ...newEmployee,
                categories: selectedOption?.map((elm) => elm.value),
              })
            }
            // closeMenuOnSelect={false}
            styles={selectStyles}
            defaultValue={defaultCategories}
            placeholder="Kies categorië(n)"
            isMulti
            ref={categorySelect}
            options={categoryOptions}
          />

          <label>Gemeente(n)</label>
          <Select
            onChange={(selectedOption) =>
              setNewEmployee({
                ...newEmployee,
                municipalities: selectedOption?.map((elm) => elm.value),
              })
            }
            // closeMenuOnSelect={false}
            styles={selectStyles}
            defaultValue={defaultMunicipalities}
            placeholder="Kies gemeente(n)"
            isMulti
            ref={municipalitySelect}
            options={municipalityOptions}
          />
          {selectedEmployee ? (
            <div className="update-buttons">
              <Button
                text="Terug"
                onClick={() => {
                  setSelectedEmployee("");
                  clearSelectBoxes();
                  setNewEmployee({});
                }}
              />
              <Button text="Wijzigen" onClick={() => updateEmployee()} />
            </div>
          ) : (
            <div className="update-buttons">
              <Button text="Terug" onClick={() => navigate(-1)} />
              <Button text="Opslaan" onClick={() => createEmployee()} />
            </div>
          )}
        </div>
      )}
      <div className="right-side">
        <p className="edit-explanation">
          {" "}
          Klik de medewerker aan om te wijzigen
        </p>
        <EmployeeTable
          setSelectedEmployee={setSelectedEmployee}
          employees={employees}
          setEmployees={setEmployees}
        />
      </div>
    </div>
  );
}

export default EmployeeCreateAndEdit;
