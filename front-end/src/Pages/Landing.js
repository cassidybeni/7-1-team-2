import React, { useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import call2action from "../assets/call2action.jpg";
import "../css/Landing.css";

function Landing() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const isUserLoggedIn = currentUser !== null;

  const handleNavigation = () => {
    if (isUserLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="Landing-Container">
      <div className="Landing">
        <span>
          <div className="a">
            <img
              src={call2action}
              alt="call2action"
              display="block"
              className="call2action drop"
              onClick={handleNavigation}
              style={{ cursor: "pointer" }}
            />
          </div>
        </span>
        <h2 className="col-h">( Our Mission )</h2>
        <span>
          <p>
            Here at Event(ful), we simplify all your planning needs and keep all
            of your event details in one location. From selecting a photographer
            to choosing your hors d’ oeuvres, its all right where you need it to
            be for your big day! Let’s get planning!
          </p>
        </span>
      </div>
    </div>
  );
}

export default Landing;
