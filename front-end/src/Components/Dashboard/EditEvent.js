import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/EditEvent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = process.env.REACT_APP_API;

function EditEvent({ setUpdateEvent, user_id }) {
  const { event_id } = useParams();
  const navigate = useNavigate();
  const head = useRef("");

  const [event, setEvent] = useState({
    event_name: "",
    event_budget: 0,
    event_date: "",
    event_time: "",
  });

  const [checklist, setChecklist] = useState({
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

  const initialState = useRef({
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

  useEffect(() => {
    if (user_id) {
      try {
        axios.get(`${API}/events/${user_id}/${event_id}`).then((res) => {
          const response = res.data.payload;
          setEvent({
            event_name: response.event_name,
            event_budget: response.event_budget,
            event_date: response.event_date.split("T")[0],
            event_time: response.event_time,
          });
          head.current = response.event_name;
          setUpdateEvent(false);
        });
      } catch (e) {
        console.error(e);
      }
    }
    return () => {
      setEvent({
        event_name: "",
        event_budget: 0,
        event_date: "",
        event_time: "",
      });
    };
  }, [user_id, event_id, setUpdateEvent]);

  useEffect(() => {
    if (user_id) {
      try {
        axios.get(`${API}/checklist/${user_id}/${event_id}`).then((res) => {
          let initial = initialState.current;
          res.data.payload.map((service) => {
            return (initial[service.task_name] = true);
          });
          setChecklist(initial);
        });
      } catch (e) {
        console.error(e);
      }
    }
    return () => {
      setChecklist({
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
    };
  }, [user_id, event_id]);

  const updateEvent = () => {
    axios
      .put(`${API}/events/${user_id}/${event_id}`, event)
      .then(
        (res) => {
          setUpdateEvent(true);
          const categories = Object.keys(initialState.current);
          for (const name of categories) {
            if (initialState.current[name] && !checklist[name]) {
              axios
                .delete(`${API}/checklist/${user_id}/${event_id}/${name}`)
                .then(
                  (res) => {},
                  (c) => console.warn("catch", c)
                )
                .catch((c) => {
                  console.error(c);
                });
            } else if (!initialState.current[name] && checklist[name]) {
              const category = {
                task_name: name,
              };
              axios
                .post(`${API}/checklist/${user_id}/${event_id}`, category)
                .then(
                  (res) => {},
                  (c) => console.warn("catch", c)
                )
                .catch((c) => {
                  console.error(c);
                });
            }
          }
        },
        (c) => console.warn("catch", c)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(checklist).includes(true)) {
      updateEvent(event, event_id);
      navigate("/dashboard");
    } else {
      toast.error("Choose at least one vendor to add to your checklist", {
        toastId: "customId",
      });
    }
  };

  const toggleState = (e) => {
    const val = e.target.value;
    setChecklist((prevState) => ({ ...prevState, [val]: !prevState[val] }));
  };

  return (
    <>
      <h1>
        Edit Event Details
      </h1>
      <div className="form-container">
        <form className="edit-eventform three-d" onSubmit={handleSubmit}>
          <Link to={`/dashboard/${user_id}`}>
            <button className="pg-buttons cancel-edit">Cancel Edit</button>
          </Link>
          <div className="edit-input">
            <label>Event Name: </label>
            <input
              className="three-d pg-input"
              id="event_name"
              type="text"
              required
              value={event.event_name}
              placeholder="Name"
              onChange={handleChange}
            />
            <label>Budget: </label>
            <input
              className="three-d pg-input"
              id="event_budget"
              type="number"
              required
              value={event.event_budget}
              placeholder="$0.00"
              onChange={handleChange}
            />
            <label>Time: </label>
            <input
              className="three-d pg-input"
              id="event_time"
              type="time"
              required
              value={event.event_time}
              onChange={handleChange}
            />
            <label>Date: </label>
            <input
              className="three-d pg-input"
              id="event_date"
              type="date"
              required
              value={event.event_date}
              placeholder="Date"
              onChange={handleChange}
            />
          </div>
          <span className="checkSpan-container">
            <h2>Select Your Event Requirements: </h2>

            <span className="checkbox-span">
              <label className="check-container edit-checkbox">
                <input
                  value="catering"
                  type="checkbox"
                  checked={checklist["catering"]}
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#127869; Caterer</span>
              </label>

              <label className="check-container edit-checkbox">
                <input
                  value="djs"
                  type="checkbox"
                  checked={checklist["djs"]}
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#128266; DJ</span>
              </label>
              <label className="check-container edit-checkbox">
                <input
                  value="musicians"
                  type="checkbox"
                  checked={checklist["musicians"]}
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#127926; Musician</span>
              </label>
              <label className="check-container edit-checkbox">
                <input
                  value="photographers"
                  type="checkbox"
                  checked={checklist["photographers"]}
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#128248; Photographer</span>
              </label>

              <label className="check-container edit-checkbox">
                <input
                  value="party_rental"
                  type="checkbox"
                  checked={
                    checklist["party_rental"] ? checklist.party_rental : false
                  }
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#129681; Party Rental</span>
              </label>

              <label className="check-container edit-checkbox">
                <input
                  value="videographers"
                  type="checkbox"
                  checked={
                    checklist["videographers"] ? checklist.videographers : false
                  }
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#128249; Videographer</span>
              </label>
              <label className="check-container edit-checkbox">
                <input
                  value="venues"
                  type="checkbox"
                  checked={checklist["venues"] ? checklist.venues : false}
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#127976; Venue</span>
              </label>
              <label className="check-container edit-checkbox">
                <input
                  value="balloons"
                  type="checkbox"
                  checked={checklist.balloons ? checklist.balloons : false}
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#127880; Balloon Services</span>
              </label>
              <label className="check-container edit-checkbox">
                <input
                  value="floral"
                  type="checkbox"
                  checked={checklist["floral"] ? checklist.floral : false}
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#128144; Floral Designer</span>
              </label>

              <label className="check-container edit-checkbox">
                <input
                  value="party_magician"
                  type="checkbox"
                  checked={
                    checklist["party_magician"]
                      ? checklist.party_magician
                      : false
                  }
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category"> &#127913; Magician</span>
              </label>

              <label className="check-container edit-checkbox">
                <input
                  value="party_characters"
                  type="checkbox"
                  checked={
                    checklist["party_characters"]
                      ? checklist.party_characters
                      : false
                  }
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#129464; Character Actors</span>
              </label>

              <label className="check-container edit-checkbox">
                <input
                  value="party_clown"
                  type="checkbox"
                  checked={
                    checklist["party_clown"] ? checklist.party_clown : false
                  }
                  onChange={toggleState}
                />
                <span className="checkmark"></span>
                <span className="category">&#129313; Clowns</span>
              </label>
            </span>
          </span>
          <div className="button-container">
            <button className="pg-buttons">Save Changes</button>
          </div>
        </form>
        <ToastContainer autoClose={false} position="bottom-center" />
      </div>
    </>
  );
}

export default EditEvent;
