import React, { Component }  from 'react';
import { Route, Navigate } from "react-router-dom";

function AuthRoute({ component: Component, auth, changeAuth, ...rest }) {
  const loggedIn = auth.loggedIn;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return (
            <Navigate
              to={{
                pathname: "/dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component changeAuth={changeAuth} auth={auth} />;
        }
      }}
    />
  );
}

export default AuthRoute;
