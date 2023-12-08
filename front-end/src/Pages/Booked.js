import React, { useNavigate } from "react";
import BookedVendorsList from "../Components/Booked/BookedVendorsList";
import { useParams } from "react-router";
import CapitalizeEvent from "../Components/CapitalizeEvent";

export default function Booked({ user_id }) {
  const navigate = useNavigate();
  const { event_name } = useParams();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button className="pg-buttons back-button" onClick={goBack}>
        {" "}
        &#x21e6; Back to Event
      </button>

      <div className="page">
        <h1 className="pg-head">
          {" "}
          Booked Vendors for {CapitalizeEvent(event_name)}{" "}
        </h1>
        <BookedVendorsList user_id={user_id} />
      </div>
    </>
  );
}
