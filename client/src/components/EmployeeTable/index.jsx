import React, { useContext } from "react";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";
import "./style.css";

function EmployeeTable({ setSelectedEmployee, employees, setEmployees }) {
  const { setPopup } = useContext(MsgPopupContext);

  const deleteEmployee = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${BASE_URL}/users/delete/${id}`, {
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
          text: "De medewerker is successvol verwijderd...",
          open: true,
        });
        setEmployees(employees.filter((employee) => employee._id !== id));
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
    <div className="employee-table">
      <div className="table">
        <div className="row header">
          <div className="cell">Nr</div>
          <div className="cell">Naam</div>
          <div className="cell">Functie</div>
          <div className="cell"></div>
        </div>
        {employees?.map((employee, index) => (
          <div className="row" key={employee?._id}>
            <div className="cell">{index + 1}</div>
            <div
              className="cell employee-name"
              onClick={() => {
                setSelectedEmployee(employee?._id);
              }}
            >
              {employee?.lastName + " " + employee?.firstName}
            </div>
            <div className="cell">{employee?.role}</div>
            <div className="cell">
              <i
                className="fa-solid fa-trash"
                onClick={() => deleteEmployee(employee?._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeTable;
