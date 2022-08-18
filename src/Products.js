import React from "react";
import { connect } from "react-redux";

const Products = ({ products, byCategories, byGenres, otherParams }) => {
  return (
    <div>
      <h1>Products</h1>
      {(otherParams.match.path === "/products/genre/:id"
        ? byGenres
        : byCategories
      ).map((product) => {
        return <li key={product.id}>{product.name}</li>;
      })}
    </div>
  );
};

const mapStateToProps = ({ products }, otherParams) => {
  const byCategories = products.filter(
    (product) => product.categoryId === +otherParams.match.params.id
  );
  const byGenres = products.filter(
    (product) => product.genreId === +otherParams.match.params.id
  );
  return { products, byCategories, byGenres, otherParams };
};

export default connect(mapStateToProps)(Products);
