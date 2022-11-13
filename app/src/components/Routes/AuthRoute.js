import React, { Component }  from 'react';
import { Route, Navigate, useLocation } from "react-router-dom";

function AuthRoute({ component: Component, auth, changeAuth}) {
  const loggedIn = auth.loggedIn;
  const location = useLocation();
  return (
    loggedIn ?
    <Navigate
      to={{
        pathname: "/dashboard",
        state: {
          from: location.location,
        },
      }}
    /> :
    <Component changeAuth={changeAuth} auth={auth} />
  );
}

export default AuthRoute;


/**
 * <Route
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
 */