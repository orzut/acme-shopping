import React from "react";
import { connect } from "react-redux";

const Categories = ({ categories }) => {
  return <h1>Categories Page</h1>;
};

export default connect((state) => state)(Categories);
