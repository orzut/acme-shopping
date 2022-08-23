import React from "react";
import { connect } from "react-redux";

const Products = ({ byCategories, byGenres, match }) => {
  console.log(byCategories);
  return (
    <div>
      {(match.path === "/products/genre/:id" ? byGenres : byCategories).map(
        (product) => {
          return <li key={product.id}>{product.name}</li>;
        }
      )}
    </div>
  );
};

const mapStateToProps = ({ products, categories, genres }, { match }) => {
  const byCategories = products.filter(
    (product) => product.categoryId === +match.params.id
  );
  const byGenres = products.filter(
    (product) => product.genreId === +match.params.id
  );
  return { byCategories, byGenres, match };
};

export default connect(mapStateToProps)(Products);
