import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../Account.css";
import { createAddress, getAddresses } from "../store";
import TextField from "@mui/material/TextField";

class AddressForm extends React.Component {
  constructor() {
    super();
    this.state = {
      apt: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      displayAddressForm: false,
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  save(ev) {
    ev.preventDefault();
    const address = {
      apt: this.state.apt,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
    };
    this.props.addAddress(address);
    this.setState({
      displayAddressForm: false,
      apt: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
    });
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentDidMount() {
    this.props.loadAddresses();
  }

  render() {
    const { addresses, session } = this.props;
    const { displayAddressForm, apt, street, city, state, zipcode } =
      this.state;
    const { save, onChange } = this;
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
          <div className="address-container">
            <div className="add-address">
              <i
                className="fa-solid fa-plus"
                onClick={() => this.setState({ displayAddressForm: true })}
              ></i>
              <p>Add Address</p>
            </div>
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

        {displayAddressForm ? (
          <form onSubmit={save} className="address-form">
            <h3>Add a new address</h3>
            <TextField
              required
              margin="dense"
              type="street"
              name="street"
              label="Street address"
              size="small"
              onChange={onChange}
              value={street}
            />
            <TextField
              required
              margin="dense"
              type="text"
              name="apt"
              label="Apt, suite, unit"
              size="small"
              onChange={onChange}
              value={apt}
            />

            <TextField
              required
              margin="dense"
              type="text"
              name="city"
              label="City"
              size="small"
              onChange={onChange}
              value={city}
            />
            <TextField
              required
              margin="dense"
              type="text"
              name="state"
              label="State"
              size="small"
              onChange={onChange}
              value={state}
            />
            <TextField
              required
              margin="dense"
              type="text"
              name="zipcode"
              label="Zipcode"
              size="small"
              onChange={onChange}
              value={zipcode}
            />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => this.setState({ displayAddressForm: false })}
            >
              Cancel
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadAddresses: () => dispatch(getAddresses()),
    addAddress: (address) => dispatch(createAddress(address)),
  };
};

export default connect((state) => state, mapDispatch)(AddressForm);
