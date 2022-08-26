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
    const { orders } = this.props;

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
          <ul>
            {orders.map((order) => {
              return (
                <li className="orders" key={order.id}>
                  <p>Order number: {order.id}</p>
                  <p>Order date: {order.orderDate}</p>
                  <p>
                    Total price: $
                    {order.lineItems
                      .reduce((sum, lineItem) => {
                        sum = sum + lineItem.quantity * lineItem.product.cost;
                        return sum;
                      }, 0)
                      .toFixed(2)}
                  </p>
                  <ul className="order">
                    {order.lineItems.map((lineItem) => {
                      return (
                        <li className="line-items" key={lineItem.id}>
                          <img src={lineItem.product.image}></img>
                          <p>
                            {" "}
                            {lineItem.product.name} ({lineItem.quantity})
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
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
