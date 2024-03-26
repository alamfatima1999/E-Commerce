import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../../configuration";

const OrdersByProductId = (props) => {
  const [orderListByPorductId, setOrderListByPorductId] = useState([]);
  const productId = props.productId;

  useEffect(() => {
    let URL = `${getBaseUrl()}api/products/getOrdersByProduct/${productId}`;
    axios
      .get(URL)
      .then((res) => {
        console.log(res);
        setOrderListByPorductId(res.data);
      })
      .catch((err) => console.log("Error found"));
  }, []);

  return (
    <div>
      Orders of This Product
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {orderListByPorductId.map((order) => {
            return (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  {order.fname} {order.lname}
                </td>
                <td>{order.createdDate}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersByProductId;
