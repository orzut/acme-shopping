import React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import AccountModal from "./AccountModal";
import { logout } from "./store";
import "./Nav.css";

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      accountModalIsOpen: false,
    };
    this.onClickUser = this.onClickUser.bind(this);
    this.closeAccountModal = this.closeAccountModal.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onClickUser() {
    if (this.props.session.auth.id) {
      this.props.history.push("/account");
    } else {
      this.setState({ accountModalIsOpen: true });
    }
  }

  closeAccountModal() {
    this.setState({ accountModalIsOpen: false });
  }

  onLogout() {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    const { session, logout } = this.props;
    const { accountModalIsOpen } = this.state;
    const { onClickUser, closeAccountModal, onLogout } = this;
    return (
      <div className="Nav">
        {accountModalIsOpen ? (
          <AccountModal closeAccountModal={closeAccountModal} />
        ) : null}
        <div id="header">
          <h1>Grace Shopper</h1>
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-user" onClick={onClickUser}></i>
            <i className="fa-solid fa-cart-shopping"></i>
            {session.auth.id && <button onClick={onLogout}>Logout</button>}
          </div>
        </div>
        <div id="navTabs">
          <Link to="/">
            <h2>HOME</h2>
          </Link>
          <Link to="/genres">
            <h2>GENRES</h2>
          </Link>
          <Link to="/categories">
            <h2>CATEGORIES</h2>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect((state) => state, mapDispatch)(Nav);
