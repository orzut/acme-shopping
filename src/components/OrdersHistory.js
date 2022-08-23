import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../Account.css";
import { getOrders } from "../store";

class OrdersHistory extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.loadOrders();
  }
  render() {
    return (
      <div id="account-page">
        <h2>Your Purchases</h2>
        <div className="container">
          <nav>
            <Link to="/account">Profile</Link>
            <Link to="/account/addresses">Addresses</Link>
            <Link to="/account/wallet">Wallet</Link>
            <Link to="/account/orders">Purchases</Link>
          </nav>
          <div></div>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadOrders: () => dispatch(getOrders()),
  };
};

export default connect((state) => state, mapDispatch)(OrdersHistory);
