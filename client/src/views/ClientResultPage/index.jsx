import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { MsgPopupContext } from "../../contexts/msgPopup";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import "./style.css";
import { BASE_URL } from "../../constrains";
function ClientResultPage() {
  const { clientNumber } = useParams();
  const [clientData, setClientData] = useState();
  const { setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();
  const { performFetch, isLoading } = useFetch(
    `/clients/client/${clientNumber}`,
    (data) => setClientData(data?.result)
  );
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  const sendEmail = async () => {
    setPopup({
      type: "success",
      text: "Please wait emails are sending",
      open: true,
    });
    try {
      const response = await fetch(
        `${BASE_URL}/clients/send-new-client-mail/${clientNumber}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      console.log(json);
      if (json?.success) {
        performFetch({
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setPopup({
          type: "success",
          text: "Emails succesvol verzonden.",
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
  if (isLoading) return <Spinner />;
  return (
    <div className="client-result-page">
      <div className="client-info-result-page">
        <h3>
          Cliënt: {clientData?.client?.clientNumber}{" "}
          {clientData?.client?.clientName}
        </h3>
        <h4>
          {clientData?.client?.isClosed
            ? "(afgehandeld)"
            : clientData?.client?.isEmailSent
            ? "(in behandeling)"
            : "(nog niet verzonden)"}
        </h4>
      </div>
      <div className="organization-tables">
        <div className="matched-organizations">
          <div className="table-title">Gematchte Organisaties</div>
          {clientData?.matchedCoordinators.length > 0 ? (
            <ul className="coordinators-list">
              {clientData?.matchedCoordinators?.map((coordinator) => (
                <li key={coordinator?._id}>
                  <span>{coordinator?.organizationName}</span>
                  {coordinator?.firstName} {coordinator?.lastName}
                  {/* <i class="fa-regular fa-address-card"></i> */}
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-match-message">
              <i className="fa-regular fa-face-sad-tear"></i>
              <p>Er is helaas geen match gevonden voor deze aanvraag.</p>
            </div>
          )}
        </div>
        <div className="reacted-organizations">
          <div className="accepted-organizations">
            <div className="table-title">Organisaties met een match</div>
            {clientData?.acceptedCoordinators.length > 0 && (
              <ul className="coordinators-list accepted-coordinators">
                {clientData?.acceptedCoordinators?.map((coordinator) => (
                  <li key={coordinator?._id}>
                    <span>{coordinator?.organizationName}</span>
                    {coordinator?.firstName} {coordinator?.lastName}
                    {/* <i class="fa-regular fa-address-card"></i> */}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rejected-organizations">
            <div className="table-title">Organisaties met geen match</div>
            {clientData?.rejectedCoordinators.length > 0 && (
              <ul className="coordinators-list rejected-coordinators">
                {clientData?.rejectedCoordinators?.map((coordinator) => (
                  <li key={coordinator?._id}>
                    <span>{coordinator?.organizationName}</span>
                    {coordinator?.firstName} {coordinator?.lastName}
                    {/* <i class="fa-regular fa-address-card"></i> */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="result-page-buttons">
        <Button text="Home" onClick={() => navigate("/home")} />
        <Button
          text="Aanvraag inzien"
          onClick={() => navigate(`/client-edit-page/${clientNumber}`)}
        />
        {clientData?.matchedCoordinators?.length > 0 && (
          <Button
            text="Verzenden"
            onClick={sendEmail}
            disabled={clientData?.client?.isEmailSent}
          />
        )}
      </div>
    </div>
  );
}

export default ClientResultPage;

//Deze aanvraag is reeds verzonden en kan niet gewijzigd worden.
