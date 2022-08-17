import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import "./Nav.css";

const Nav = ({ auth, categories, genres }) => {
  return (
    <div className="Nav">
      <div id="header">
        <h1>Grace Shopper</h1>
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-solid fa-user"></i>
          <i className="fa-solid fa-cart-shopping"></i>
          {auth.id && <button>Logout</button>}
        </div>
      </div>
      <div id="navTabs">
        <Link to="/">HOME</Link>
        <div className="dropdown">
          <Link to="/genres" className="dropbtn">
            GENRES
          </Link>
          <div className="dropdown-items">
            {" "}
            {genres.map((genre) => {
              return (
                <Link key={genre.id} to={`/products/genre/${genre.id}`}>
                  {genre.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="dropdown">
          <Link to="/categories" className="dropbtn">
            CATEGORIES
          </Link>{" "}
          <div className="dropdown-items">
            {" "}
            {categories.map((category) => {
              return (
                <Link
                  key={category.id}
                  to={`/products/categories/${category.id}`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Nav);
