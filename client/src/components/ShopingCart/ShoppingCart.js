import React, { useState } from "react";

const ShoppingCart = (props) => {
  const [cartProducts, setCartProducts] = useState(props.cartProducts);

  //   const buyProducts = () => {};

  const removeProduct = () => {
    console.log("Product removed");
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
              <h4>{product.name}</h4>
              <h4>{product.quantity}</h4>
              <h4>{product.price * product.quantity}</h4>
              <button onClick={removeProduct}>Remove</button>
            </>
          );
        })}
      </div>
      <div>
        <input type="text" placeholder="Address:"></input>
        {/* <button onClick={buyProducts}>Buy</button> */}
      </div>
    </>
  );
};
export default ShoppingCart;
