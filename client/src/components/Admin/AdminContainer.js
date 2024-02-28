import React, { useState } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductList from "../ProductList/ProductList";
import OrderList from "../Orders/OrderList";
import OrderDetails from "../Orders/OrderDetails";

const AdminContainer = (props) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductList, setshowProductList] = useState(true);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };
  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
  };
  return (
    <div>
      {selectedProduct ? (
        <ProductDetails productId={selectedProduct.productId} />
      ) : (
        <>
          <div>
            {showProductList ? (
              <div>
                <button onClick={() => setshowProductList(false)}>
                  Get Order List
                </button>
                <>
                  <ProductList handleProductDetails={handleProductDetails} />
                </>
              </div>
            ) : (
              <div>
                {selectedOrder ? (
                  <OrderDetails orderId={selectedOrder.orderId} />
                ) : (
                  <div>
                    <button onClick={() => setshowProductList(true)}>
                      Get Product List
                    </button>
                    <>
                      <OrderList handleOrderDetails={handleOrderDetails} />
                    </>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContainer;
