import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import "./Nav.css";

const Nav = ({ auth }) => {
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
        <Link to="/">
          <h2>HOME</h2>
        </Link>
        <Link to="/genres">
          <h2>GENRES</h2>
        </Link>
        <Link to="/categories">
          <h2>CATEGORIES</h2>
        </Link>
      </div>
    </div>
  );
};

export default connect((state) => state)(Nav);
