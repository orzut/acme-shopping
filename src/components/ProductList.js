import React from "react";

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map(
        (product) => {
          return <li key={product.id}>{product.name}</li>;
        }
      )}
    </div>
  );
};

export default ProductList;