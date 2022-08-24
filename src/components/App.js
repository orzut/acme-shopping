import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  exchangeToken,
  logout,
  fetchCategories,
  fetchGenres,
  fetchProducts,
  loadLocalCart,
} from "../store";
import { Link, Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Cart from "./Cart";
import Nav from "./Nav";
import Home from "./Home";
import Genres from "./Genres";
import Categories from "./Categories";
import Products from "./Products";
import Account from "./Account";
import AddressForm from "./AddressForm";
import CreditCardForm from "./CreditCardForm";
import CartModal from "./CartModal";
import OrdersHistory from "./OrdersHistory";
<<<<<<< HEAD
import Search from "./Search";
=======
import ProductsInfo from "./ProductsInfo";
>>>>>>> origin/main

class App extends React.Component {
  componentDidMount() {
    this.props.exchangeToken();
    this.props.loadCategories();
    this.props.loadGenres();
    this.props.loadProducts();
    this.props.loadLocalCart();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.session.auth.id && this.props.session.auth.id) {
      this.props.fetchCart();
    }
  }
  render() {
    const { session, logout, cart } = this.props;
    return (
      <main>
        <Route path="/:view?" component={Nav} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/genres" exact>
            <Genres />
          </Route>
          <Route path="/categories" exact>
            <Categories />
          </Route>
          
          <Route path="/search" exact>
            <Search />
          </Route>

          <Route path="/account" exact component={Account} />
          <Route path="/account/addresses" component={AddressForm} />
          <Route path="/account/wallet" component={CreditCardForm} />
          <Route path="/account/orders" component={OrdersHistory} />
          <Route path="/account/products-info" component={ProductsInfo} />
          {/* <Route path='/account/users-info' component={UsersInfo} /> */}
        </Switch>
        <Route
          path={["/products/category/:id", "/products/genre/:id"]}
          component={Products}
        ></Route>
        {session.auth.id ? (
          <Fragment>
            <Route path="/cart" component={CartModal} />
          </Fragment>
        ) : null}
      </main>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    loadCategories: () => dispatch(fetchCategories()),
    loadGenres: () => dispatch(fetchGenres()),
    loadProducts: () => dispatch(fetchProducts()),
    loadLocalCart: () => dispatch(loadLocalCart()),
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);

// {session.auth.id ? (
//   <Link to="/cart">Cart ({cart.cartData.lineItems.length})</Link>
// ) : null}

// <Route path="/cart" component={Cart} />
