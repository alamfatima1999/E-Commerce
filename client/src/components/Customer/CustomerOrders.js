import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerOrders = (props) => {
  const [pastOrders, setPastOrders] = useState([]);
  const customerId = props.customerId;

  useEffect(() => {
    axios
      .get("http://localhost:3001/my/past/orders/" + customerId)
      .then((res) => {
        console.log(res.data);
        setPastOrders(res.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  return (
    <>
      <div>My Orders</div>
      <div>
        <table>
          <tr>
            <th>Order Id</th>
            <th>Product Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>

          {pastOrders.map((order) => {
            return (
              <>
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.name}</td>
                  <td>{order.createdDate}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalPrice}</td>
                  <td></td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default CustomerOrders;
