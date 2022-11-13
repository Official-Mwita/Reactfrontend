import React  from 'react';
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes({ component: Component, auth }) {
  const loggedIn = auth.loggedIn;
  const location = useLocation();
  return (
    loggedIn?
    <Component auth={auth} />:
    <Navigate
        to={{
          pathname: "/login",
          state: {
            from: location.location,
          },
        }}
    />
  );
}

export default ProtectedRoutes;

/**
 *  <Route
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
 */