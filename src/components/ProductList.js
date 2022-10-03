import React from "react";
import Product from "./Product";
import "../ProductList.css";

const ProductList = ({ products, match }) => {
  const path = match.path;
  console.log(match);
  return (
    <div>
      {path === "/products/genre/:id"}
      <div className="product-list">
        {products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
