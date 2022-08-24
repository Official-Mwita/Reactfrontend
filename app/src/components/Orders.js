import React, { Component }  from 'react';
import Order from "./Order";
import { Table } from "react-bootstrap";

function Orders({ orders, changeComponent }) {
  let pos = 0;
  return (
    <>
      {orders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Track Id</th>
              <th>Paper</th>
              <th>Cost</th>
              <th>Progres</th>
              <th>Time Remaining</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Order
                key={order.trackId}
                order={order}
                pos={++pos}
                changeComponent={changeComponent}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <h1 className=" home-name">No orders</h1>
      )}
    </>
  );
}

export default Orders;
