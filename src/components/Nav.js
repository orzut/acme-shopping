import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AccountModal from "./AccountModal";
import { logout, openAccountModal, closeAccountModal } from "../store";
import "../Nav.css";

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      accountModalIsOpen: false,
    };
    this.onClickUser = this.onClickUser.bind(this);
    //this.closeAccountModal = this.closeAccountModal.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onClickUser() {
    if (this.props.session.auth.id) {
      if (this.props.match.params.view !== "account") {
        this.props.history.push("/account");
      }
    } else {
      console.log("this ran");
      this.props.openAccountModal();
      //this.setState({ accountModalIsOpen: true });
    }
  }

  // closeAccountModal() {
  //   this.setState({ accountModalIsOpen: false });
  // }

  onLogout() {
    this.props.logout();
    if (this.props.match.params.view === "account") {
      this.props.history.push("/");
    }
  }

  render() {
    const { session, genres, categories, openAccountModal } = this.props;
    //const { accountModalIsOpen } = this.state;
    const { onClickUser, onLogout } = this;
    return (
      <div className="Nav">
        {session.accountModalIsOpen ? <AccountModal /> : null}
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
    openAccountModal: () => {
      dispatch(openAccountModal());
    },
    closeAccountModal: () => {
      dispatch(closeAccountModal());
    },
  };
};

export default connect((state) => state, mapDispatch)(Nav);
