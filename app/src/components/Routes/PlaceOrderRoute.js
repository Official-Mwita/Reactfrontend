import React  from 'react';

function PlaceorderRoute({
  component: Component,
  order,
  createOrder,
  authInfo,
  updatePendingOrder
}) {
  return (
    <Component
      order={order}
      auth={authInfo}
      createOrder={createOrder}
      updatePendingOrder={updatePendingOrder}
    />
  );
}

export default PlaceorderRoute;

/**
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
 */