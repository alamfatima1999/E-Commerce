import React from "react";

const addToCart = (product) => {
  console.log("Added to cart");
};

const ProductListCustomer = () => {
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
              <th>Quantity</th>
              <th></th>
            </tr>

            {products.map((product) => {
              return (
                <>
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <input
                        type="number"
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
