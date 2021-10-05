import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL.js";
import { UserContext } from "../Providers/UserProvider";

const API = apiURL();

function EventForm() {
  const loggedInUser = useContext(UserContext);
  let history = useHistory();
  const [myEvent, setEvent] = useState({
    event_name: "",
    event_budget: 0,
    event_date: "",
    event_time: "",
  });

  const addEvent = () => {
    const { user_id } = loggedInUser;
    try {
      axios.post(`${API}/events/${user_id}`, myEvent).then((res) => {
        const id = res.data.payload.event_id;
        history.push(`/dashboard/new_event/checklist/${id}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextChange = (e) => {
    setEvent({ ...myEvent, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  if (loggedInUser) {
    console.log(`event form user_id is ${loggedInUser.user_id}`);
  }

  return (
    <section>
      <form className="eventform-container three-d" onSubmit={handleSubmit}>
        <label htmlFor="event_name">New Event</label>
        <input
          className="three-d pg-input"
          id="event_name"
          type="text"
          value={myEvent.name}
          placeholder="Name your Event"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="event_budget">Event Budget</label>
        <input
          className="three-d pg-input"
          id="event_budget"
          type="number"
          value={myEvent.budget}
          placeholder="Set your Budget"
          onChange={handleTextChange}
          min={1}
          required
        />
        <label htmlFor="event_time">Time of your Event</label>
        <input
          className="three-d pg-input"
          id="event_time"
          type="time"
          value={myEvent.time}
          placeholder="Enter Event Time"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="event_date">Event Date</label>
        <input
          className="three-d pg-input"
          id="event_date"
          type="date"
          value={myEvent.date}
          placeholder="Enter Event Date"
          onChange={handleTextChange}
          required
        />
        <button className="pg-buttons" type="submit">
          Create Event
        </button>
      </form>
    </section>
  );
}
export default EventForm;
