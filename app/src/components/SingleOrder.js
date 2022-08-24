import React from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";

//values to switch through active component
const allOrdersComponent = "All Orders Component";
function SingleOrder({ order, changeComponent }) {
  //Payment modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Make sure back button is well handle
  window.onpopstate = function (event) {
    changeComponent(allOrdersComponent);
  };
  const back = () => {
    changeComponent(allOrdersComponent);
  };
  return (
    <div className="pl-4 pr-5">
      <Row>
        <Col>
          <Button
            onClick={back}
            variant="secondary"
            style={{ width: 80 + "px" }}
          >
            Back
          </Button>
        </Col>
        <Col>
          <p className="text-right">
            ORDER NUMBER:{" "}
            <span className="font-weight-bold">{order.trackId}</span>
          </p>
        </Col>
      </Row>
      <hr className="order-divider" />
      <Row className="m-1">
        <Col lg={7} md={12} className="shadow-lg rounded">
          <p>
            <span className="font-weight-normal text-capitalize">
              {order.subject}
            </span>
            <br></br>
            <span className="font-weight-light">
              {order.description.length > 200
                ? order.description.substring(0, 200) + "..."
                : order.description}
            </span>
          </p>
          <Row>
            <Col lg={6} md={12}>
              <p>
                <span className="font-weight-bold">Paper: </span>
                {order.type_of_paper}
              </p>
              <p>
                <span className="font-weight-bold">Academic Level: </span>
                {order.academic_level}
              </p>
              <p>
                <span className="font-weight-bold">No. of Pages: </span>
                {order.pages} Pages
              </p>
              <p>
                <span className="font-weight-bold">Progess Status: </span>
                {order.progress_status}
              </p>
            </Col>
            <Col lg={6} md={12}>
              <p>
                <span className="font-weight-bold">Service: </span>
                {order.service}
              </p>
              <p>
                <span className="font-weight-bold">Reference Style: </span>
                {order.reference_style}
              </p>
              <p>
                <span className="font-weight-bold">Spacing: </span>
                {order.spacing}
              </p>
              <p>
                <span className="font-weight-bold">Date Due: </span>
                {order.datedue}
              </p>
            </Col>
          </Row>
          <p>
            <span className="font-weight-bold">Cost: </span>${order.price}
            <Button variant="outline-success m-1" onClick={handleShow}>
              Pay
            </Button>
          </p>
        </Col>
        <Col lg={5} md={12}>
          <p className="h3  text-center">Download Completed Files</p>
          {/* <table class="table">
            <thead>
              <tr>
                <th scope="col" className="col-5">
                  File Name
                </th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Order file name</td>
                <td>Message from the writer</td>
              </tr>
            </tbody>
          </table> */}
          <p className="h-4 text-center">
            <br />
            No files yet. Your order is not yet done. Files are uploaded as soon
            as the order is completed
          </p>
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <p className="text-center">
          Please ${order.price} to our PayPal account.
          <br />
          <span className="font-weight-bold">TOPNOPCHWRITERS@GMAIL.COM</span>
        </p>
        <p className="font-weight-light text-center">
          We will process the payments and let you know.
        </p>

        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            OKAY
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SingleOrder;
