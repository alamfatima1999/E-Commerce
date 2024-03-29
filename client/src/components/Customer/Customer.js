import React, { useState } from "react";
import ProductListCustomer from "../ProductList/ProductListCustomer";
import CustomerOrders from "./CustomerOrders";

const Customer = (props) => {
  const [isProductsActive, setIsProductsActive] = useState(true);

  const changeList = () => {
    setIsProductsActive(!isProductsActive);
  };

  return (
    <>
      <div>
        {isProductsActive ? (
          <>
            <ProductListCustomer />
            <button onClick={changeList}>Get My Past Orders</button>
          </>
        ) : (
          <>
            <CustomerOrders />
            <button onClick={changeList}>Product List</button>
          </>
        )}
      </div>
    </>
  );
};

export default Customer;
