import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Checklist from "../Components/EventPage/Checklist";
import Budget from "../Components/EventPage/Budget";
import Timer from "../Components/EventPage/Timer";
import CapitalizeEvent from "../Components/CapitalizeEvent";
import axios from "axios";

const API = process.env.REACT_APP_API;

export default function Event({ formatter, user_id }) {
  const { event_id } = useParams();
  const [eventName, setEventName] = useState("");
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(0);
  const [shownCost, setShownCost] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (user_id) {
      try {
        axios.get(`${API}/events/${user_id}/${event_id}`).then((response) => {
          const data = response.data.payload;
          setEventName(data.event_name);
          setBudget(data.event_budget);
        });
      } catch (e) {
        console.error(e);
      }

      try {
        axios
          .get(`${API}/checklist/${user_id}/${event_id}`)
          .then((response) => {
            const data = response.data.payload;
            const vendorCategories = data.map((point) => {
              return {
                name: point.task_name,
                booked: point.is_completed,
                cost: point.task_cost,
                id: point.task_id,
              };
            });
            let vendorCategories2 = {};
            for (let category of data) {
              vendorCategories2[category.task_name] = category.task_cost;
            }

            setShownCost(vendorCategories2);
            setCategories(vendorCategories);
          });
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      setEventName("");
      setBudget(0);
      setShownCost({});
      setCategories([]);
    };
  }, [event_id, user_id]);

  const updateCost = (body, category) => {
    try {
      axios
        .put(`${API}/checklist/cost/${user_id}/${event_id}`, body)
        .then((response) => {
          setShownCost({ ...shownCost, [category]: body.task_cost });
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        className="pg-buttons back-button"
        onClick={() => history.push("/dashboard")}
      >
        {" "}
        &#x21e6; Back to Dashboard
      </button>

      <div className="event-page page">
        <h1 className="pg-head">
          {eventName ? CapitalizeEvent(eventName) : null}
        </h1>
        <div className="eventpage-container ">
          <div id="checklist-container" className="evenpg-containers drop">
            <h2 className="col-h">( Booked ? )</h2>
            <h2 className="col-h">( Find Vendors )</h2>
            <Checklist
              categories={categories}
              user_id={user_id}
              event_id={event_id}
              updateCost={updateCost}
              eventName={eventName}
            />
          </div>

          <div id="budget-container" className="evenpg-containers drop">
            <h2 className="col-h">( Budget: {formatter.format(budget)} )</h2>
            <Budget
              categories={categories}
              budget={budget}
              shownCost={shownCost}
              formatter={formatter}
            />
          </div>

          <div id="countdown-container" className="evenpg-containers drop">
            <h2 className="col-h">( Countdown to {CapitalizeEvent(eventName)} !)</h2>
            <Timer user_id={user_id} />
          </div>
        </div>
      </div>
    </>
  );
}
