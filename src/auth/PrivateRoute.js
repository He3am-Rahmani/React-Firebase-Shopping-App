import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const currentUser = useAuth();

  const { loading, currentUser } = useSelector((state) => state.currentUser);


  console.log(currentUser)

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser._id ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
