import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { BASE_URL } from "../../constrains";
import { MsgPopupContext } from "../../contexts/msgPopup";
import "./style.css";
// import useFetch from "../../hooks/useFetch";

function EmailReactionPage() {
  const { coordinatorId, clientId, accept } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const { setPopup } = useContext(MsgPopupContext);
  const navigate = useNavigate();

  //   const {performFetch,isLoading}=useFetch(`/clients/email-reply/${coordinatorId}/${clientId}/accepted`)

  useEffect(() => {
    const sendReply = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}/clients/email-reply/${coordinatorId}/${clientId}/${accept}`,
          {
            method: "PATCH",
          }
        );
        const res = await response.json();
        setData(res);
        console.log(res?.result);
      } catch (error) {
        setPopup({
          type: "error",
          text: "Sorry er ging iets fout. Probeer opnieuw.",
          open: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    sendReply();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="email-reply-message">
      <h2>Bedankt voor uw reactie!</h2>
      <p>
        {accept === "1" ? (
          <i className="fa-regular fa-face-smile"></i>
        ) : (
          <i className="fa-regular fa-face-sad-tear"></i>
        )}
        {data?.msg}
      </p>
      <Button text="Home" onClick={() => navigate("/")} />
    </div>
  );
}

export default EmailReactionPage;
