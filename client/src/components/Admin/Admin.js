import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../ProductList/ProductList";
import OrderList from "../OrderList/OrderList";

const Admin = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [showProductList, setshowProductList] = useState(true);

  const addProduct = () => {
    let name = productName;
    let price = productPrice;
    let description = productDesc;
    if (name != "" && price > 0 && description != "") {
      axios
        .post("http://localhost:3001/create", { name, price, description })
        .then((res) => {
          console.log("Product added");
        })
        .catch((err) => console.log("Product added"));
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          placeholder="Product Name"
        ></input>
        <input
          type="text"
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
          placeholder="Price"
        ></input>
        <input
          type="text"
          value={productDesc}
          onChange={(e) => {
            setProductDesc(e.target.value);
          }}
          placeholder="Description"
        ></input>
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div>
        {showProductList ? (
          <button onClick={() => setshowProductList(false)}>
            Get Order List
          </button>
        ) : (
          <button onClick={() => setshowProductList(true)}>
            Get Product List
          </button>
        )}
      </div>
      <div>{showProductList ? <ProductList /> : <OrderList />}</div>
    </>
  );
};

export default Admin;
