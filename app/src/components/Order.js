import React, { Component }  from 'react';
function Order({ order, pos, changeComponent }) {
  const inform = () => {
    changeComponent(order);
  };
  return (
    <tr onClick={inform}>
      <td>{pos}</td>
      <td>{order.trackId}</td>
      <td>{order.type_of_paper}</td>
      <td>${order.price}</td>
      <td className={order.progress_class}>{order.progress_status}</td>
      <td>{order.remaining_time}</td>
    </tr>
  );
}

export default Order;
