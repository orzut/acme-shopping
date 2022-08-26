import React from "react";
import { connect } from "react-redux";
import { HashLink } from "react-router-hash-link";
import "../Account.css";
import { createAddress, getAddresses, deleteAddress } from "../store";
import { TextField, Alert, AlertTitle } from "@mui/material";
import NavAccount from "./NavAccount";

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
    this.props.addAddress(this.state);
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
    const { addresses, session, deleteAddress } = this.props;
    const { displayAddressForm, apt, street, city, state, zipcode } =
      this.state;
    const { save, onChange } = this;
    return (
      <div id="account-page">
        <h2>Your addresses</h2>
        <div className="container">
          <NavAccount />
          <div className="address-container">
            <div className="add-address">
              <HashLink to="/account/addresses#address-form">
                <i
                  className="fa-solid fa-plus"
                  onClick={() => this.setState({ displayAddressForm: true })}
                ></i>
              </HashLink>
              <p>Add Address</p>
            </div>
            {addresses.map((address) => {
              return (
                <div key={address.id} className="address">
                  <div>
                    <p id="name">
                      {session.auth.firstName} {session.auth.lastName}
                    </p>
                    <p>
                      {address.street}, {address.apt}
                    </p>
                    <p>
                      {address.city}, {address.state}, {address.zipcode}
                    </p>
                  </div>
                  <i
                    onClick={() => deleteAddress(address)}
                    className="fa-regular fa-trash-can"
                  ></i>
                </div>
              );
            })}
          </div>
        </div>

        {displayAddressForm ? (
          <form onSubmit={save} className="address-form">
            <h3 id="address-form">Add a new address</h3>
            <TextField
              required
              margin="dense"
              type="text"
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
              maxLength="2"
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
    deleteAddress: (address) => dispatch(deleteAddress(address)),
  };
};

export default connect((state) => state, mapDispatch)(AddressForm);
