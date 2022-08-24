import React, { Component }  from 'react';
import { Container, Row, Col } from "react-bootstrap";
import OrderForm from "./OrderForm";

function OrderWrapper({ order, auth, createOrder, updatePendingOrder }) {
  return (
    <Container fluid className="bg-light">
      <Container>
        <Row className="justify-content-center p-4">
          {/* <Col
            md={4}
            className="bg-body p-3 mb-4 shadow rounded"
            style={{
              paddingRight: 30 + "px",
              height: 350 + "px",
            }}
          >
            <p className="h3" style={{ textDecoration: "underline" }}>
              Order Summary
            </p>
            <Pricing order={order} cost={orderCost} />
          </Col>
          <Col style={{ width: 40 + "px" }} className="col-auto"></Col> */}
          <Col
            md={8}
            className="bg-body col-lg-7 shadow-lg rounded"
            // style={{ border: 1 + "px solid green" }}
          >
            <p
              className="h3"
              style={{
                textAlign: "center",
                textDecoration: "underline",
                marginBottom: 20 + "px",
              }}
            >
              Place Your Order
            </p>
            <OrderForm
              updateOrder={createOrder}
              order={order}
              auth={auth}
              updatePendingOrder={updatePendingOrder}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default OrderWrapper;
