import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCart from "../ShopingCart/ShoppingCart";
import { getBaseUrl } from "../../configuration";

const ProductListCustomer = (props) => {
  const [productList, setProductList] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const customerId = sessionStorage.getItem("customerId");
  const [address, setAddress] = useState("");

  useEffect(() => {
    let URL = `${getBaseUrl()}api/products/`;
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        res.data.forEach((product) => {
          product.quantity = 0;
        });
        setProductList(res.data);
      })
      .catch((err) => console.log("Error"));
  }, []);

  const addToCart = (product) => {
    if (product.quantity > 0) {
      let flag = false;
      let updatedCartList = cartProducts.map((productInCart) => {
        if (productInCart.productId == product.productId) {
          productInCart.quantity = product.quantity;
          // product.quantity = 0;
          flag = true;
        }
        return productInCart;
      });
      let productId = product.productId;
      let quantity = product.quantity;
      // let customerId = props.customerId;
      let updatedProduct = { customerId, productId, quantity, flag };
      console.log("Updated Product", updatedProduct);
      let URL = `${getBaseUrl()}api/shoppingCart/addProduct`;
      axios
        .post(URL, { ...updatedProduct })
        .then((res) => {
          if (flag === false) {
            updatedCartList = [...cartProducts, { ...product }];
          }
          setCartProducts(updatedCartList);
          // product.quantity = 0;
          const updatedProductList = productList.map((product) => ({
            ...product,
            quantity: 0,
          }));
          setProductList(updatedProductList);
        })
        .catch((res) => console.log("Error"));
    }
  };

  const removeProduct = (productId) => {
    let URL = `${getBaseUrl()}api/shoppingCart/removeFromCart/${productId}/${customerId}`;
    axios
      .delete(URL)
      .then((res) => {
        console.log("Deleted successfully");
        let updatedCartList = cartProducts.filter((product) => {
          return product.productId != productId;
        });
        setCartProducts(updatedCartList);
      })
      .catch((err) => {
        console.log("Error occurred");
      });
  };

  const updateProductQuantity = (e, productId) => {
    const updatedList = productList.map((product) => {
      if (product.productId == productId) {
        product.quantity = parseInt(e.target.value);
      }
      return product;
    });
    setProductList(updatedList);
  };

  const buyProducts = () => {
    if (address != null) {
      let customerPayload = { customerId, address };
      let URL = `${getBaseUrl()}api/shoppingCart/buy`;
      axios.post(URL, { ...customerPayload }).then((res) => {
        setCartProducts([]);
        alert("order placed successfully");
      });
    } else {
      alert("Please enter your address");
    }
  };

  const updateAddress = (updatedAddress) => {
    setAddress(updatedAddress);
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
      <ShoppingCart
        cartProducts={cartProducts}
        removeProduct={removeProduct}
        buyProducts={buyProducts}
        updateAddress={updateAddress}
      />
    </>
  );
};

export default ProductListCustomer;
