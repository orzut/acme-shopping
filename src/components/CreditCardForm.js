import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../Account.css";
import { createCreditCard, getWallet, deleteCreditCard } from "../store";
import TextField from "@mui/material/TextField";

class CreditCardForm extends React.Component {
  constructor() {
    super();
    this.state = {
      nameOnCard: "",
      number: "",
      expirationMonth: "",
      expirationYear: "",
      pin: "",
      displayForm: false,
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  save(ev) {
    ev.preventDefault();

    this.props.addCreditCard(this.state);
    this.setState({
      nameOnCard: "",
      number: "",
      expirationMonth: "",
      expirationYear: "",
      pin: "",
      displayForm: false,
    });
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentDidMount() {
    this.props.loadWallet();
  }

  render() {
    const { creditCards, deleteCreditCard } = this.props;
    const {
      displayForm,
      nameOnCard,
      number,
      expirationMonth,
      expirationYear,
      pin,
    } = this.state;
    const { save, onChange } = this;
    return (
      <div id="account-page">
        <h2>Your Wallet</h2>
        <div className="container">
          <nav>
            <Link to="/account">Profile</Link>
            <Link to="/account/addresses">Addresses</Link>
            <Link to="/account/wallet">Wallet</Link>
            <Link to="/account/orders">Purchases</Link>
          </nav>
          <div className="address-container">
            <div className="add-address">
              <HashLink to="/account/wallet#address-form">
                <i
                  className="fa-solid fa-plus"
                  onClick={() => this.setState({ displayForm: true })}
                ></i>
              </HashLink>
              <p>Add Credit Card</p>
            </div>
            {creditCards.map((creditCard) => {
              return (
                <div key={creditCard.id} className="address">
                  <div>
                    <p id="name">{creditCard.nameOnCard}</p>
                    <p>***{creditCard.number.slice(12)}</p>
                    <p>
                      {creditCard.expirationMonth < 10
                        ? `0${creditCard.expirationMonth}`
                        : creditCard.expirationMonth}
                      /20{creditCard.expirationYear}
                    </p>
                  </div>

                  <i
                    onClick={() => deleteCreditCard(creditCard)}
                    className="fa-regular fa-trash-can"
                  ></i>
                </div>
              );
            })}
          </div>
        </div>

        {displayForm ? (
          <form onSubmit={save} className="address-form">
            <h3 id="address-form">Add a new credit card</h3>
            <TextField
              required
              margin="dense"
              type="text"
              name="nameOnCard"
              label="Name on card"
              size="small"
              onChange={onChange}
              value={nameOnCard}
            />
            <TextField
              required
              margin="dense"
              type="text"
              name="number"
              label="Card number"
              size="small"
              onChange={onChange}
              value={number}
            />

            <TextField
              required
              margin="dense"
              type="number"
              name="expirationMonth"
              label="Expiration month"
              min="1"
              max="12"
              size="small"
              onChange={onChange}
              value={expirationMonth}
            />
            <TextField
              required
              margin="dense"
              type="number"
              name="expirationYear"
              label="Expiration year"
              size="small"
              onChange={onChange}
              value={expirationYear}
            />
            <TextField
              required
              margin="dense"
              type="number"
              name="pin"
              label="Security code"
              size="small"
              onChange={onChange}
              value={pin}
            />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => this.setState({ displayForm: false })}
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
    loadWallet: () => dispatch(getWallet()),
    addCreditCard: (creditCard) => dispatch(createCreditCard(creditCard)),
    deleteCreditCard: (creditCard) => dispatch(deleteCreditCard(creditCard)),
  };
};

export default connect((state) => state, mapDispatch)(CreditCardForm);
