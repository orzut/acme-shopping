import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../Account.css";
import { getAddresses } from "../store";

class AddressForm extends React.Component {
  constructor() {
    super();
    this.state = {
      apt: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
    };
  }

  componentDidMount() {
    this.props.loadAddresses();
  }
  render() {
    const { addresses, session } = this.props;
    return (
      <div id="account-page">
        <h2>Your addresses</h2>
        <div className="container">
          <nav>
            <Link to="/account">Profile</Link>
            <Link to="/account/addresses">Addresses</Link>
            <Link to="/account/wallet">Wallet</Link>
            <Link to="/account/orders">Purchases</Link>
          </nav>
          {addresses.map((address) => {
            return (
              <div key={address.id} className="address">
                <p id="name">
                  {session.auth.firstName} {session.auth.lastName}
                </p>
                <p>
                  {address.street}, {address.apt}
                </p>
                <p>
                  {address.city}, {address.state}, {address.zipcode}
                </p>
                <button>Remove</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadAddresses: () => dispatch(getAddresses()),
  };
};

export default connect((state) => state, mapDispatch)(AddressForm);
