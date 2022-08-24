import React, { Component }  from 'react';
import { Navigate, Route } from "react-router-dom";

function ProtectedRoutes({ component: Component, auth, orders, ...rest }) {
  const loggedIn = auth.loggedIn;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component auth={auth} />;
        } else {
          return (
            <Navigate
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoutes;
