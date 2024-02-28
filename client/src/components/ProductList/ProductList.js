//This page contains Product Creation, Fetch and deletion.
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  const addProduct = () => {
    let name = productName;
    let price = productPrice;
    let description = productDesc;
    if (name !== "" && price > 0 && description !== "") {
      axios
        .post("http://localhost:3001/create", { name, price, description })
        .then((res) => {
          console.log("Product added");
          fetchProducts();
        })
        .catch((err) => console.log("Product added"));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openProductDetails = (product) => {
    props.handleProductDetails(product);
  };

  const deleteProduct = (productId) => {
    axios
      .delete("http://localhost:3001/delete/product/" + productId)
      .then((res) => {
        console.log("Deletion successful");
        fetchProducts();
      })
      .catch((err) => console.log("Error"));
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.log("Couldn't receive list"));
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
        <div>
          <h1>Product List</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Created Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.createdDate}</td>
                  <td>
                    <button
                      onClick={() => {
                        openProductDetails(product);
                      }}
                    >
                      Details
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(product.productId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
