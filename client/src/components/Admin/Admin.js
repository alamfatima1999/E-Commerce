import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.log("Couldn't receive list"));
  });

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
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created Date</th>
            <th></th>
          </tr>

          {products.map((product) => {
            return (
              <div>
                <tr>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.createdDate}</td>
                  <td>
                    <button>Details</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              </div>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Admin;
