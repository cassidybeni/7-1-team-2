import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Event from "./Event";
import { Link } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import { UserContext } from "../../Providers/UserProvider.js"

const API = apiURL();

function EventList() {
  const loggedInUser = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [user_id, setUserId] = useState(null);
console.log(`eventslist user_id is ${user_id}`)
  useEffect(() => {
    axios
      .get(`${API}/events/${user_id}`)
      .then(
        (res) => {
          setEvents(res.data.message);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, [user_id]);

  const handleDelete = async (event_id) => {
    try {
      await axios.delete(`${API}/events/${user_id}/${event_id}`).then((res) => {
        const eventsCopy = [...events];
        const index = eventsCopy.findIndex(
          (event) => event.event_id === event_id
        );
        eventsCopy.splice(index, 1);
        setEvents(eventsCopy);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (loggedInUser) {
        const email = loggedInUser.email;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          setUserId(checkUser.data.payload.user_id);
        }
      }
    })();
    return () => {
      // cleanup
      // setUserId(null)
    };
  }, [loggedInUser]);

  return (
    <>
      <ul className="dash-events">
        <span className="dash-event new-sq">
          <Link to={`/dashboard/new_event`} className="new-event">
            <p id="new">Create a new event and start planning! </p>
            <p className="plus-sign"> &#x002B;</p>
          </Link>
        </span>
        { events ? events.map((event) => {
          return (
            <li key={event.event_id} className="dash-event">
              <Event
                event={event}
                user_id={user_id}
                handleDelete={handleDelete}
              />
            </li>
          );
        } ) : null}
      </ul>
    </>
  );
}

export default EventList;
