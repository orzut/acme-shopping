import React from "react";
import { connect } from "react-redux";

const Genres = ({ genres }) => {
  return <h1>Genres Page</h1>;
};

export default connect((state) => state)(Genres);
