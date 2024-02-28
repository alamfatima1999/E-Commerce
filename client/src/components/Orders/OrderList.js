import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const OrderList = (props) => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setorders(data);
      })
      .catch((err) => console.log("Couldn't receive order list"));
  }, []);

  const openOrderDetails = (order) => {
    props.handleOrderDetails(order);
  };

  return (
    <div>
      <div>
        <h1>order List</h1>
      </div>
      <table>
        <tr>
          <th>Id</th>
          <th>Customer Name</th>
          <th>Order Date</th>
          <th>Price</th>
          <th></th>
        </tr>

        {orders.map((order) => {
          return (
            <>
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.fname}</td>
                <td>{order.createdDate}</td>
                <td>{order.totalPrice}</td>
                <td>
                  <button
                    onClick={() => {
                      openOrderDetails(order);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};
export default OrderList;
