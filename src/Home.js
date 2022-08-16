import React from "react";
import { connect } from "react-redux";

const Home = () => {
  return <h1>Home Page</h1>;
};

export default connect((state) => state)(Home);
