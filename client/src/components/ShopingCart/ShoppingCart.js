import React, { useEffect, useState } from "react";
import axios from "axios";

const ShoppingCart = (props) => {
  const [cartProducts, setCartProducts] = useState(props.cartProducts);
  const customerId = sessionStorage.getItem("customerId");

  //   const buyProducts = () => {};

  useEffect(() => {
    setCartProducts(props.cartProducts);
  }, [props.cartProducts]);

  const removeProduct = (productId, customerId) => {
    axios
      .delete(
        "http://localhost:3001/remove/from/cart/" + productId + "/" + customerId
      )
      .then((res) => {
        console.log("Deleted successfully");
        let updatedCartList = cartProducts.filter((product) => {
          return product.productId != productId;
        });
        setCartProducts(updatedCartList);
      })
      .catch((err) => {
        console.log("Error occurred");
      });
  };

  return (
    <>
      <div>
        <h1>Shopping Cart</h1>
      </div>
      <div>
        {cartProducts.map((product) => {
          return (
            <>
              <div key={product.productId}>
                <h4>{product.name}</h4>
                <h4>{product.quantity}</h4>
                <h4>{product.price * product.quantity}</h4>
                <button
                  onClick={() => removeProduct(product.productId, customerId)}
                >
                  Remove
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <input type="text" placeholder="Address:"></input>
      </div>
    </>
  );
};
export default ShoppingCart;
