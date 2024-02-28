import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductListCustomer = () => {
  const [productList, setProductList] = useState([]);

  const addToCart = (product) => {
    console.log("Added to cart");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        console.log(res.data);
        setProductList(res.data);
      })
      .catch((err) => console.log("Error"));
  }, []);

  return (
    <>
      {
        <div>
          <div>
            <h1>Products</h1>
          </div>
          <table>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>No. of Items</th>
              <th></th>
            </tr>

            {productList.map((product) => {
              return (
                <>
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        placeholder="Quantity"
                        onChange={(e) => e.target.value}
                      ></input>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      }
    </>
  );
};

export default ProductListCustomer;
