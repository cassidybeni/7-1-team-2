import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import axios from "axios";

const API = process.env.REACT_APP_API;

function Timer({ user_id }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [updated, setUpdated] = useState(false);
  const { event_id } = useParams();

  useEffect(() => {
    try {
      axios.get(`${API}/events/${user_id}/${event_id}`).then((response) => {
        const data = response.data.payload;
        setDate(data.event_date.slice(0, 10));
        setTime(data.event_time);
        setUpdated(true);
      });
    } catch (e) {
      console.error(e);
    }

    return () => {
      setDate("");
      setTime("");
      setUpdated(false);
    };
  }, [event_id, user_id]);

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const countDown = () => {
    const finish = new Date(`${date}T${time}`);
    const startTime = Date.now() / 1000;
    const endTime = finish.getTime() / 1000;
    const remainingTime = Math.ceil(endTime - startTime);
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    return (
      <div className="countdown ">
        <CountdownCircleTimer
          {...timerProps}
          size={150}
          colors={[["#7bbce0"]]}
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime }) =>
            renderTime("days", getTimeDays(daysDuration - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          size={150}
          colors={[["#68a7ca"]]} 
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > hourSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("hours", getTimeHours(daySeconds - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          size={150}
          colors={[["#6291bd"]]}
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > minuteSeconds,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
          }
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          size={150}
          colors={[["#2c6b8e"]]}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > 0,
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("seconds", getTimeSeconds(elapsedTime))
          }
        </CountdownCircleTimer>
      </div>
    );
  };

  return <>{updated ? countDown() : null}</>;
}

export default Timer;