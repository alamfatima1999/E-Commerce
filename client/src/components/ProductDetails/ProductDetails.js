import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = (props) => {
  const { productId, name, price, description } = props.product;
  const [id, setId] = useState(productId);
  const [product, setProduct] = useState(props.product);
  const [productName, setProductName] = useState(name);
  const [productPrice, setProductPrice] = useState(price);
  const [productDesc, setProductDesc] = useState(description);

  useEffect(() => {
    axios
      .get("http://localhost:3001/product/detail/" + id)
      .then((res) => {
        let data = res.data;
        setProduct(data);
        setProductName(data.name);
        setProductPrice(data.price);
        setProductDesc(data.description);
      })
      .catch((err) => console.log("Sorry couldn't fetch details"));
  });

  const saveProduct = () => {
    const productData = {
      id: id,
      name: productName,
      price: productPrice,
      description: productDesc,
    };
    axios
      .post("http://localhost:3001/product/update", { ...productData })
      .then((res) => {
        console.log("Successful");
      });
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={productId}
          disabled
          placeholder="Product Id"
        ></input>
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
        <button onClick={(e) => saveProduct()}>Save</button>
      </div>
    </>
  );
};

export default ProductDetails;
