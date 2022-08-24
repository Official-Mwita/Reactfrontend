import React, { Component }  from 'react';
function Pricing({ order }) {
  return (
    <div className="m-1 mr-3">
      <table
        className="table table-borderless" /*style={{ width: 100 + "px" }}*/
      >
        <tbody>
          <th className="col-6" scope="row">
            Paper:{" "}
          </th>
          <td className="col-6">{order.typeOfPaper}</td>
        </tbody>
        <tbody>
          <th className="col-6" scope="row">
            Subject:{" "}
          </th>
          <td className="col-6">{order.subject}</td>
        </tbody>
        <tbody>
          <th scope="row">Academic Level: </th>
          <td>{order.academicLevel}</td>
        </tbody>
        <tbody>
          <th scope="row">Pages: </th>
          <td>{order.noOfPages} Pages</td>
        </tbody>
        <tbody>
          <th scope="row">Service: </th>
          <td>{order.writingService}</td>
        </tbody>
        <tbody style={{ borderTop: 1 + "px solid black" }}>
          <th scope="row" style={{ textAlign: "right" }}>
            Cost:{" "}
          </th>
          <th>${order.cost}</th>
        </tbody>
      </table>
      {!order.orderFeasibility && (
        <p className="formDataError">Order not feasable: time-pages conflict</p>
      )}
    </div>
  );
}

export default Pricing;
