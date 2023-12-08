import React, { useEffect, useState, createContext, useNavigate } from "react";
import { auth } from "../Services/Firebase";
import axios from "axios";

const API = process.env.REACT_APP_API;
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        setCurrentUser(loggedInUser);
      } else {
        setCurrentUser(null);
      }
    });
  }, [navigate]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const email = currentUser.email;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          currentUser.user_id = checkUser.data.payload.user_id;
        }
      }
    })();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{currentUser}}>{children}</UserContext.Provider>
  );
};
