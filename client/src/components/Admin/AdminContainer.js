import React, { useState } from "react";
import Admin from "./Admin";
import ProductDetailsPage from "../ProductDetails/ProductDetails";

const AdminContainer = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      {selectedProduct ? (
        <ProductDetailsPage productId={selectedProduct.productId} />
      ) : (
        <Admin handleProductDetails={handleProductDetails} />
      )}
    </div>
  );
};

export default AdminContainer;
