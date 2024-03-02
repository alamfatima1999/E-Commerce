import React, { useEffect, useState } from "react";
import axios from "axios";

const ShoppingCart = (props) => {
  const [cartProducts, setCartProducts] = useState(props.cartProducts);
  const customerId = sessionStorage.getItem("customerId");
  const [address, setAddress] = useState(null);

  //   const buyProducts = () => {};

  // useEffect(() => {
  //   setCartProducts(props.cartProducts);
  // }, [props.cartProducts]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/shopping/cart/" + customerId)
      .then((res) => {
        console.log(res.data);
        let productsInCart = res.data;
        setCartProducts(productsInCart);
      })
      .catch((err) => console.log("Error occurred"));
  }, [props.cartProducts]);

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
                <button onClick={() => props.removeProduct(product.productId)}>
                  Remove
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Address:"
          onChange={() => {
            props.updateAddress(address);
          }}
        ></input>
      </div>
      <div>
        <button onClick={props.buyProducts}>Buy</button>
      </div>
    </>
  );
};
export default ShoppingCart;
