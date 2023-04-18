import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";
import { MsgPopupContext } from "../../contexts/msgPopup";
import useFetch from "../../hooks/useFetch";
import "./style.css";

function ReportPage() {
  const [report, setReport] = useState({});
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { setPopup } = useContext(MsgPopupContext);
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();
  const { performFetch: performFetchReport, isLoading } = useFetch(
    `/clients/report`,
    (data) => setReport(data?.result)
  );
  const { performFetch: performFetchOrganizations } = useFetch(
    `/organizations`,
    (data) => setOrganizations(data?.result)
  );

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    performFetchOrganizations();
  }, []);
  const showReport = () => {
    if (!startDate || !endDate) {
      setPopup({
        type: "error",
        text: "Please choose start and end date",
        open: true,
      });
    } else {
      performFetchReport({
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ startDate: startDate, endDate: endDate }),
      });
      setVisible(true);
    }
  };
  console.log(endDate);
  console.log(startDate);
  const {
    totalRequest,
    unmatchedAmount,
    matchedAmount,
    acceptedAmount,
    rejectedAmount,
  } = report;
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="report-page">
          <div className="date-inputs">
            <Input
              className="date-input"
              name="clientName"
              type="date"
              label="Datum vanaf"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              className="date-input"
              name="clientName"
              type="date"
              label="Datum eind"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button text="Rapport" onClick={showReport} />
          </div>
          {visible && (
            <>
              <div className="summary">
                <p>
                  Totaal Aanvragen:{" "}
                  <span className="total">
                    {totalRequest && (totalRequest[0]?.myCount || 0)}
                  </span>
                </p>
                <p>
                  Geen Match:{" "}
                  <span className="no-match">
                    {unmatchedAmount && (unmatchedAmount[0]?.myCount || 0)}
                  </span>
                </p>
              </div>
              <div className="report-organization">
                <div className="table">
                  <div className="row header">
                    <div className="cell">Organisatie</div>
                    <div className="cell">Totaal Matches</div>
                    <div className="cell">Geaccepteerd</div>
                    <div className="cell">Afgewezen</div>
                  </div>
                  {organizations?.map((item) => (
                    <div className="row" key={item?._id}>
                      <div className="cell">{item?.organizationName}</div>
                      <div className="cell">
                        {matchedAmount?.find(
                          (organization) =>
                            organization?._id === item?.organizationName
                        )?.count || 0}
                      </div>

                      <div className="cell accepted">
                        {acceptedAmount?.find(
                          (organization) =>
                            organization?._id === item?.organizationName
                        )?.count || 0}
                      </div>
                      <div className="cell rejected">
                        {rejectedAmount?.find(
                          (organization) =>
                            organization?._id === item?.organizationName
                        )?.count || 0}
                      </div>
                    </div>
                  ))}
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                  <div className="row">
                    <div className="cell">extra organization for try</div>
                    <div className="cell">1</div>
                    <div className="cell">2</div>
                    <div className="cell">3</div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="back-button">
            <Button text="Terug" onClick={() => navigate(-1)} />
          </div>
        </div>
      )}
    </>
  );
}

export default ReportPage;
