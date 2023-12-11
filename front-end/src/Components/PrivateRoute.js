import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

const PrivateRoute = ({ path, element }) => {
  const currentUser = useContext(UserContext);

  return (
    <Routes>
      <Route
        path={path}
        element={currentUser.currentUser ? element : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default PrivateRoute;
