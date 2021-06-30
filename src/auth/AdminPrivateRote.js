import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  
    const IsValid = ''

  return (
    <Route
      {...rest}
      render={(props) =>
        IsValid ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AdminPrivateRoute;
