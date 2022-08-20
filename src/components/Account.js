import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../Account.css";
import { updateUser } from "../store";

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      displayEditForm: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordVerify: "",
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  async save(ev) {
    ev.preventDefault();
    if (this.state.password !== this.state.passwordVerify) {
      alert("Password does not match");
    }
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
    };
    try {
      this.props.updateUser(user);
      this.setState({ displayEditForm: false });
    } catch (err) {
      alert("Please enter valid data");
    }
  }

  render() {
    const user = this.props.session.auth;
    const {
      displayEditForm,
      firstName,
      lastName,
      email,
      phone,
      password,
      passwordVerify,
    } = this.state;
    const { onChange, save } = this;
    return (
      <div id="account-page">
        <h2>Welcome {user.firstName}</h2>
        <div className="container">
          <nav>
            <Link to="/account">Profile</Link>
            <Link to="/account/addresses">Addresses</Link>
            <Link to="/account/wallet">Wallet</Link>
            <Link to="/account/orders">Purchases</Link>
          </nav>
          <table className="personal-info">
            <tbody>
              <tr>
                <td>First Name:</td>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <td>E-mail:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </table>
          <i
            className="fa-solid fa-pencil"
            onClick={() => this.setState({ displayEditForm: true })}
          ></i>
        </div>
        {displayEditForm ? (
          <form className="edit-form" onSubmit={save}>
            <label>First Name:</label>
            <input name="firstName" value={firstName} onChange={onChange} />
            <label>Last Name:</label>
            <input name="lastName" value={lastName} onChange={onChange} />
            <label>E-mail:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <label>Phone:</label>
            <input type="tel" name="phone" value={phone} onChange={onChange} />
            <label>New password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <label>Repeat password:</label>
            <input
              type="password"
              name="passwordVerify"
              value={passwordVerify}
              onChange={onChange}
            />
            <button
              disabled={!firstName && !lastName && !email && !phone}
              type="submit"
            >
              Save
            </button>
            <button onClick={() => this.setState({ displayEditForm: false })}>
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
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect((state) => state, mapDispatch)(Account);
