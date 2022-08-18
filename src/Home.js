import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ categories, products }) => {
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <Link
              to={`/products/category/${category.id}`}
              className="category-name"
            >
              <h2>{category.name}</h2>
            </Link>
            <div className="pr">
              {products
                .filter((product) => product.categoryId === category.id)
                .slice(0, 3)
                .map((product) => {
                  return (
                    <Link
                      to={`/products/${product.id}`}
                      key={product.id}
                      className="product"
                    >
                      <img src={product.image}></img>
                      <p>{product.name}</p>
                      <p>${product.cost}</p>
                    </Link>
                  );
                })}
            </div>
            <div className="see-more">
              <Link to={`/products/category/${category.id}`}>See More...</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ categories, products }) => {
  categories = categories.slice(0, 4);
  return { categories, products };
};

export default connect(mapStateToProps)(Home);
