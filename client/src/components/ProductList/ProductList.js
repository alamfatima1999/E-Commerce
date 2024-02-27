import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProductDetails from "../ProductDetails/ProductDetails";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  // const [showProductDetails, setProductDetails] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setProducts(data);
      })
      .catch((err) => console.log("Couldn't receive list"));
  }, []);

  const openProductDetails = (product) => {
    // setProductDetails(true);
    props.handleProductDetails(product);
  };

  return (
    <>
      {
        <div>
          <div>
            <h1>Product List</h1>
          </div>
          <table>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Created Date</th>
              <th></th>
              <th></th>
            </tr>

            {products.map((product) => {
              return (
                <>
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
                      <button>Delete</button>
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
export default ProductList;
