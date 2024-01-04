import React, { useEffect, useState, createContext } from "react";
import { auth } from "../Services/Firebase";
import axios from "axios";

const API = process.env.REACT_APP_API;
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const userSignOut = async () => {
    auth
      .signOut()
      .then(() => {})
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const email = currentUser.email;
        try {
          const checkUser = await axios.get(`${API}/users/${email}`);
          if (checkUser.data.success) {
            setCurrentUser((prevUser) => ({
              ...prevUser,
              user_id: checkUser.data.payload.user_id,
            }));
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    })();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, userSignOut }}>
      {children}
    </UserContext.Provider>
  );
};
