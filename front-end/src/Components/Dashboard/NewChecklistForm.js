import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = process.env.REACT_APP_API;

export default function NewChecklistForm({
  setUpdateEvent,
  user_id,
  id,
  setCreated,
  setEventId,
}) {
  const [eventForm, setEventForm] = useState({
    catering: false,
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

  const addToCheckedList = () => {
    const categories = Object.keys(eventForm);
    for (const checked of categories) {
      if (eventForm[checked] === true) {
        const category = {
          task_name: checked,
        };
        axios
          .post(`${API}/checklist/${user_id}/${id}`, category)
          .then((res) => {
            setUpdateEvent(true);
          })
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
    if (Object.values(eventForm).includes(true)) {
      addToCheckedList();
      setEventId(null);
      setCreated(true);
      setTimeout(() => {
        setCreated(false);
      }, 1000);
    } else {
      toast.error("Choose at least one vendor to add to your checklist", {
        toastId: "customId",
      });
    }
  };

  return (
    <section className="eventcheckbox">
      <h2>Select Your Event Requirements: </h2>

      <form onSubmit={handleSubmit}>
        <span className="checkbox-span new-checkbox">
          <label className="check-container edit-checkbox">
            <input
              value="catering"
              type="checkbox"
              checked={eventForm.catering}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category">&#127869; Caterer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="djs"
              type="checkbox"
              checked={eventForm.djs}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#128266; DJ</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="musicians"
              type="checkbox"
              checked={eventForm.musicians}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#127926; Musician</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="photographers"
              type="checkbox"
              checked={eventForm.photographers}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#128248; Photographer</span>
          </label>
        </span>
        <span className="checkbox-span new-checkbox">
          <label className="check-container edit-checkbox">
            <input
              value="party_rental"
              type="checkbox"
              checked={eventForm.party_rental}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#129681; Party Rental</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="videographers"
              type="checkbox"
              checked={eventForm.videographers}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#128249; Videographer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="venues"
              type="checkbox"
              checked={eventForm.venues}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#127976; Venues</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="balloons"
              type="checkbox"
              checked={eventForm.balloons}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#127880; Balloon Services</span>
          </label>
        </span>
        <span className="checkbox-span new-checkbox">
          <label className="check-container edit-checkbox">
            <input
              value="floral"
              type="checkbox"
              checked={eventForm.floral}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#128144; Floral Designer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="party_magician"
              type="checkbox"
              checked={eventForm.party_magician}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#127913; Magician</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="party_characters"
              type="checkbox"
              checked={eventForm.party_characters}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#129464; Character Actors</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="party_clown"
              type="checkbox"
              checked={eventForm.party_clown}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> &#129313; Clowns</span>
          </label>
        </span>

        <button className="pg-buttons drop" id="create" type="submit">
          Create Event
        </button>
      </form>

      <ToastContainer autoClose={false} position="bottom-center" />
    </section>
  );
}
