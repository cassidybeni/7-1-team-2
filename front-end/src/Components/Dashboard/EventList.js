import React from "react";
import Event from "./Event";

function EventList({ events, deleteEvent }) {
  const eventsList = events?.message || [];

  return (
    <div className="dash-container">
      <p className="new"> ( Events ) </p>

      {eventsList.length === 0 ? (
        <h2>No Existing Events. Create one above to begin planning!</h2>
      ) : (
        <ul
          className={
            eventsList.length === 1
              ? "one-event"
              : eventsList.length === 2
              ? "two-event"
              : "dash-events"
          }
        >
          {eventsList.map((event) => (
            <li key={event.event_id} className="dash-event drop">
              <Event event={event} deleteEvent={deleteEvent} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
