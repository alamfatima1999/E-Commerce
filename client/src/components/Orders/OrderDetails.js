import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = (props) => {
  const [orderId, setOrderId] = useState(props.orderId);
  const [order, setOrder] = useState({});
  const [productsInOrder, setProductsInOrder] = useState([]);
  const [orderDetails, setOrderDetails] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/order/detail/" + orderId)
      .then((res) => {
        setOrder(res.data[0]);
        // setOrderDetails(true);
        // console.log(order);
      })
      .catch((err) => console.log("error"));

    axios
      .get("http://localhost:3001/getProductsByOrder/" + orderId)
      .then((res) => {
        console.log(res.data);
        setProductsInOrder(res.data);
      })
      .catch((err) => console.log("Error"));
  }, []);

  return (
    <>
      {OrderDetails ? (
        <>
          <div>
            <label>Order Id</label>
            <input type="text" value={orderId} disabled></input>
          </div>
          <div>
            <label>Customer Name</label>
            <input type="text" value={order.fname} disabled></input>
          </div>

          <div>
            <label>Total Cost</label>
            <input type="text" value={order.totalPrice} disabled></input>
          </div>

          <div>
            <label>Order Date</label>
            <input type="text" value={order.createdDate} disabled></input>
          </div>
          <div>
            <label>Address</label>
            <input type="text" value={order.address} disabled></input>
          </div>

          <div>
            Products In the Order
            <table>
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {productsInOrder.map((product) => {
                  return (
                    <tr key={product.productId}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </>
  );
};

export default OrderDetails;
