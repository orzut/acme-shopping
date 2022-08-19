import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AccountModal from "./AccountModal";
import { logout } from "../store";
import "../Nav.css";

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
      console.log(this.props.match.params.view);
      if (this.props.match.params.view !== "account") {
        this.props.history.push("/account");
      }
    } else {
      this.setState({ accountModalIsOpen: true });
    }
  }

  closeAccountModal() {
    this.setState({ accountModalIsOpen: false });
  }

  onLogout() {
    console.log(this.props.match);
    this.props.logout();
    if (this.props.match.params.view === "account") {
      this.props.history.push("/");
    }
  }

  render() {
    const { session, genres, categories } = this.props;
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
          <Link to="/">HOME</Link>
          <div className="dropdown">
            <Link to="/genres" className="dropbtn">
              GENRES
            </Link>
            <div className="dropdown-items">
              {" "}
              {genres.map((genre) => {
                return (
                  <Link key={genre.id} to={`/products/genre/${genre.id}`}>
                    {genre.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="dropdown">
            <Link to="/categories" className="dropbtn">
              CATEGORIES
            </Link>{" "}
            <div className="dropdown-items">
              {" "}
              {categories.map((category) => {
                return (
                  <Link
                    key={category.id}
                    to={`/products/categories/${category.id}`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
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
