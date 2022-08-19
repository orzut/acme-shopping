import React from "react";
import { connect } from "react-redux";

const Account = () => {
  return <h1>Account Details Page</h1>;
};

export default connect((state) => state)(Account);
