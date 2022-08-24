import React, { Component }  from 'react';
import { Route, Navigate } from "react-router-dom";

function PlaceorderRoute({
  component: Component,
  order,
  createOrder,
  authInfo,
  updatePendingOrder,
  ...rest
}) {
  const loggedIn = authInfo.loggedIn;
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Component
            order={order}
            auth={authInfo}
            createOrder={createOrder}
            updatePendingOrder={updatePendingOrder}
          />
        );
      }}
    />
  );
}

export default PlaceorderRoute;
