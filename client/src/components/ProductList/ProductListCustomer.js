import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCart from "../ShopingCart/ShoppingCart";

const ProductListCustomer = (props) => {
  const [productList, setProductList] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const customerId = sessionStorage.getItem("customerId");

  const addToCart = (product) => {
    if (product.quantity > 0) {
      let flag = false;
      let updatedCartList = cartProducts.map((productInCart) => {
        if (productInCart.productId == product.productId) {
          productInCart.quantity = product.quantity;
          flag = true;
        }
        return productInCart;
      });
      let productId = product.productId;
      let quantity = product.quantity;
      // let customerId = props.customerId;
      let updatedProduct = { customerId, productId, quantity, flag };

      axios
        .post("http://localhost:3001/add/to/cart", { ...updatedProduct })
        .then((res) => {
          if (flag === false) {
            updatedCartList = [...cartProducts, { ...product }];
          }
          setCartProducts(updatedCartList);
        })
        .catch((res) => console.log("Error"));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        console.log(res.data);
        res.data.forEach((product) => {
          product.quantity = 0;
        });
        setProductList(res.data);
      })
      .catch((err) => console.log("Error"));
  }, []);

  const updateProductQuantity = (e, productId) => {
    const updatedList = productList.map((product) => {
      if (product.productId == productId) {
        product.quantity = parseInt(e.target.value);
      }
      return product;
    });
    setProductList(updatedList);
  };

  return (
    <>
      {
        <div>
          <div>
            <h1>Products</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>No. of Items</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
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
                          value={product.quantity}
                          min="0"
                          placeholder="Quantity"
                          onChange={(e) =>
                            updateProductQuantity(e, product.productId)
                          }
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
            </tbody>
          </table>
        </div>
      }
      <ShoppingCart cartProducts={cartProducts} customerId={customerId} />
    </>
  );
};

export default ProductListCustomer;
