import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

const PrivateRoute = ({ path, element }) => {
  const currentUser = useContext(UserContext);

  return (
    <Route
      path={path}
      element={currentUser.currentUser ? element : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;
