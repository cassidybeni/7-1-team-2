import axios from "axios";
import { Link } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import React, { useEffect, useState } from "react";

const api = apiURL();

function Checklist({ categories, user_id, event_id, updateCost }) {
  const [bookedStatus, setBookedStatus] = useState({});
  const [showForm, setShowForm] = useState({});
  const [costInput, setCostInput] = useState({});

  useEffect(() => {
    const booked = {};
    const show = {};
    const cost = {};

    for (let category of categories) {
      booked[category.name] = category.booked;
      show[category.name] = false;
      cost[category.name] = category.cost;
    }

    setBookedStatus(booked);
    setShowForm(show);
    setCostInput(cost);
  }, [categories]);

  const listItem = (category) => {
    let item = "";
    switch (category) {
      case "catering":
        item = "Find a Caterer";
        break;
      case "djs":
        item = "Find a DJ";
        break;
      case "musicians":
        item = "Find a Musician";
        break;
      case "party rental":
        item = "Find Equipment Rentals";
        break;
      case "photographers":
        item = "Find a Photographer";
        break;
      case "videographers":
        item = "Find a Videographer";
        break;
      case "venues":
        item = "Find a Venue";
        break;
      case "balloons":
        item = "Find Balloon Services";
        break;
      case "floral":
        item = "Find a Floral Designer";
        break;
      default:
        item = "";
    }

    return item;
  };

  const updateBookedStatus = (category) => {
    let body = {
      is_completed: !bookedStatus[category],
      task_name: category,
      user_id: user_id,
      event_id: event_id,
    };
    setBookedStatus({ ...bookedStatus, [category]: !bookedStatus[category] });

    try {
      axios
        .put(`${api}/checklist/${user_id}/${event_id}`, body)
        .then((response) => {});
    } catch {}
  };

  const handleFormChange = (category, e) => {
    setCostInput({ ...costInput, [category]: e.target.value });
  };

  const handleSubmit = (category, e) => {
    e.preventDefault();

    const body = {
      task_name: category,
      task_cost: costInput[category],
      user_id: user_id,
      event_id: event_id,
    };

    setShowForm({ ...showForm, [category]: false });
    updateCost(body, category);
  };

  const form = (category) => {
    return (
      <form onSubmit={(e) => handleSubmit(category, e)} id="cost-form">
        <input
          id={category}
          placeholder="cost"
          value={costInput[category]}
          onChange={(e) => handleFormChange(category, e)}
          type="number"
          min="0"
          step=".01"
        />
        <input type="submit" value="Update" />
      </form>
    );
  };


  const editButton = (cost) => {
    let button = "";
    if (cost !== "0") {
      button = "Edit Cost";
    } else {
      button = "Add Cost";
    }

    return button;
  };

  return (
    <ul className="checklist checklist-ul">
      {categories.map((category, i) => {
        return (
          <li key={i} className="checklist check-listitem">
            <div className="book-buttons">
              <button
                className={bookedStatus[category.name] ? "book-button check" : "book-button x"}
                onClick={() => updateBookedStatus(category.name)}
              >
                {" "}
                {bookedStatus[category.name] ? <>&#10003;</> : <>&#10007;</>}
              </button>
  

              <button
                onClick={() =>
                  setShowForm({
                    ...showForm,
                    [category.name]: !showForm[category.name],
                  })
                }
              >
                {editButton(category.cost)}
              </button>
            </div>

            <div>
              <button className="checklist-button">
                <Link
                  to={`/vendors/${category.name}`}
                  className="checklist-span"
                >
                  <span> {listItem(category.name)} </span>{" "}
                  <span>&#187;</span>
                </Link>
              </button>
            </div>
            {showForm[category.name] ? form(category.name) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default Checklist;
