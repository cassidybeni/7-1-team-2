import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { apiURL } from "../util/apiURL.js";

const API = apiURL();

export default function EventCheckbox({ user_id }) {
  const { id } = useParams();
  const history = useHistory();

  const [eventForm, setEventForm] = useState({
    djs: false,
    musicians: false,
    photographers: false,
    party_rental: false,
    videographers: false,
    venues: false,
    balloons: false,
    floral: false,
    party_magician: false,
    party_characters: false,
    party_clown: false,
  });

  //pass props from eventForm to represent the name,date, budget, etc.
  const addToCheckedList = () => {
    const categories = Object.keys(eventForm);
    // console.log(categories);
    // const id = lastEvent.event_id + 1;

    for (const checked of categories) {
      if (eventForm[checked] === true) {
        const category = {
          task_name: checked,
        };
        // console.log(category);
        axios
          .post(`${API}/checklist/${user_id}/${id}`, category)
          .then((res) => history.push("/dashboard"))
          .catch((c) => console.warn("catch", c));
      }
    }
  };

  const toggleState = (e) => {
    const val = e.target.value;
    setEventForm((prevState) => ({ ...prevState, [val]: !prevState[val] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCheckedList();
  };

  return (
    <section className="NewEvent">
      <form className=" col-h three-d" onSubmit={handleSubmit}>
        <label class="check-container">
          DJ
          <input
            value="djs"
            type="checkbox"
            checked={eventForm.djs}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Musician
          <input
            value="musicians"
            type="checkbox"
            checked={eventForm.musicians}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Photographer
          <input
            value="photographers"
            type="checkbox"
            checked={eventForm.photographers}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Party Rental
          <input
            value="party_rental"
            type="checkbox"
            checked={eventForm.party_rental}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Videographer
          <input
            value="videographers"
            type="checkbox"
            checked={eventForm.videographers}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Venues
          <input
            value="venues"
            type="checkbox"
            checked={eventForm.venues}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Balloon Services
          <input
            value="balloons"
            type="checkbox"
            checked={eventForm.balloons}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Floral Designer
          <input
            value="floral"
            type="checkbox"
            checked={eventForm.floral}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Magician
          <input
            value="party_magician"
            type="checkbox"
            checked={eventForm.party_magician}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Character Actors
          <input
            value="party_characters"
            type="checkbox"
            checked={eventForm.party_characters}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <label class="check-container">
          Clowns
          <input
            value="party_clown"
            type="checkbox"
            checked={eventForm.party_clown}
            onChange={toggleState}
          />
          <span class="checkmark"></span>
        </label>
        <button className=" three-d pg-buttons" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}
