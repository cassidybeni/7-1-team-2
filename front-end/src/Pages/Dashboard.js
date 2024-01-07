import React, { useEffect } from "react";
import EventList from "../Components/Dashboard/EventList";
import Loading from "../Components/Loading";
import NewEventForm from "../Components/Dashboard/NewEventForm";

export default function Dashboard({
  events,
  deleteEvent,
  setUpdateEvent,
  user_id,
  formattedName,
  created,
  setCreated,
}) {
  useEffect(() => {
    setUpdateEvent(false);
    return () => {
      setUpdateEvent(false);
    };
  }, [setUpdateEvent]);

  return (
    <div className="page">
      {user_id ? (
        <>
          <h1 className="pg-head">{`${formattedName}'s Dashboard`} </h1>
          <NewEventForm
            user_id={user_id}
            created={created}
            setCreated={setCreated}
            setUpdateEvent={setUpdateEvent}
          />
          <>
            <EventList
              events={events}
              deleteEvent={deleteEvent}
              user_id={user_id}
            />
          </>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
