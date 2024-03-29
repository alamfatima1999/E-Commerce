import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersByProductId from "../Orders/OrdersByProductId";
import { getBaseUrl } from "../../configuration";

const ProductDetails = (props) => {
  const [id, setId] = useState(props.productId);
  const [productDetails, setProductDetails] = useState(true);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  useEffect(() => {
    let URL = `${getBaseUrl()}api/products/${id}`;
    axios
      .get(URL)
      .then((res) => {
        console.log(res);
        let data = res.data;
        setProductName(data[0].name);
        setProductPrice(data[0].price);
        setProductDesc(data[0].description);
        setProductDetails(true);
      })
      .catch((err) => {
        console.log("Sorry couldn't fetch details");
        setProductDetails(false);
      });
  }, []);

  const saveProduct = () => {
    const productData = {
      id: id,
      name: productName,
      price: productPrice,
      description: productDesc,
    };
    let URL = `${getBaseUrl()}api/products/update`;
    axios.post(URL, { ...productData }).then((res) => {
      console.log("Successful");
    });
  };

  return (
    <>
      {productDetails ? (
        <div>
          <input
            type="text"
            value={id}
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
      ) : null}

      <OrdersByProductId productId={id} />
    </>
  );
};

export default ProductDetails;
