import React from "react";
import { connect } from "react-redux";
import ProductList from "./ProductList";

const Products = ({ byCategories, byGenres, match }) => {
<<<<<<< HEAD
  console.log(byCategories);
  
  let products = match.path === "/products/genre/:id" ? byGenres : byCategories;
  
  return <ProductList products={products} />;
=======
  return (
    <div>
      {(match.path === "/products/genre/:id" ? byGenres : byCategories).map(
        (product) => {
          return <li key={product.id}>{product.name}</li>;
        }
      )}
    </div>
  );
>>>>>>> origin/main
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
