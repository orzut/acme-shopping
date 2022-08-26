import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AccountModal from "./AccountModal";
import CartModal from "./CartModal";
import {
  logout,
  openAccountModal,
  emptyCart,
  // closeAccountModal,
  openCartModal,
} from "../store";
import "../Nav.css";

<<<<<<< HEAD
=======
function SearchIcon() {
  let history = useHistory();

  function onClickSearch() {
    history.push("/search");
  }

  return <i className="fa-solid fa-magnifying-glass" onClick={onClickSearch} />;
}

>>>>>>> ee5269dcdab7f13164b3e60d0df3feb46cc3b2e1
class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      accountModalIsOpen: false,
    };
    this.onClickUser = this.onClickUser.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onClickUser() {
    if (this.props.session.auth.id) {
      if (this.props.session.auth.userType === "admin") {
        this.props.history.push("/account/products-info");
      } else {
        this.props.history.push("/account");
      }
    } else {
      this.props.openAccountModal();
    }
  }

  onLogout() {
    this.props.logout();
    if (this.props.match.params.view === "account") {
      this.props.history.push("/");
    }
  }

  render() {
    const {
      session,
      genres,
      categories,
      openAccountModal,
      openCartModal,
      cart,
    } = this.props;
    const { onClickUser, onLogout } = this;
    return (
      <div className="Nav">
        {session.accountModalIsOpen ? <AccountModal /> : null}
        {cart.cartModalIsOpen ? <CartModal /> : null}
        <div id="header">
          <h1>Grace Shopper</h1>
          <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-user" onClick={onClickUser}></i>
            <i
              className="fa-solid fa-cart-shopping"
              onClick={openCartModal}
            ></i>
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
                    to={`/products/category/${category.id}`}
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
      dispatch(emptyCart());
    },
    openAccountModal: () => {
      dispatch(openAccountModal());
    },
    openCartModal: () => {
      dispatch(openCartModal());
    },
  };
};

export default connect((state) => state, mapDispatch)(Nav);
