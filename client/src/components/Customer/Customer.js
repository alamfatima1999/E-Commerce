import React, { useEffect, useState } from "react";
import ProductListCustomer from "../ProductList/ProductListCustomer";
import CustomerOrders from "./CustomerOrders";
import ShopingCart from "../ShopingCart/ShopingCart";

const Customer = (props) => {
  const [isProductsActive, setIsProductsActive] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = (product) => {
    setCartProducts((prev) => {
      [...prev, product];
    });
  };

  const changeList = () => {
    setIsProductsActive(!isProductsActive);
  };

  return (
    <>
      <div>
        {isProductsActive ? (
          <>
            <ProductListCustomer addProductToCart={addProductToCart} />{" "}
            <button onClick={changeList}>Get My Past Orders</button>
            <ShopingCart cartProducts={cartProducts} />
          </>
        ) : (
          <>
            <CustomerOrders customerId={props.customerId} />
            <button onClick={changeList}>Product List</button>
          </>
        )}
      </div>
    </>
  );
};

export default Customer;
