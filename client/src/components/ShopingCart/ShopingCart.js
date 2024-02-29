import React, { useState } from "react";

const ShopingCart = (props) => {
  const [cartProducts, setCartProducts] = useState(props.cartProducts);

  //   const buyProducts = () => {};

  const removeProduct = () => {
    console.log("Product removed");
  };

  return (
    <>
      <div>
        <h1>Shoping Cart</h1>
      </div>
      <div>
        {cartProducts.map((product) => {
          <div>
            <input type="text" value={product.name}></input>
            <input type="text" value={product.quantity}></input>
            <input type="text" value={product.price * product.quantity}></input>
            <button onClick={removeProduct}>Remove</button>
          </div>;
        })}
      </div>
      <div>
        <input type="text" placeholder="Address:"></input>
        {/* <button onClick={buyProducts}>Buy</button> */}
      </div>
    </>
  );
};
export default ShopingCart;
