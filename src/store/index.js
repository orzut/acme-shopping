import { createStore, combineReducers, applyMiddleware } from "redux";
import session from "./session";
import cart from "./cart";
import thunk from "redux-thunk";
import logger from "redux-logger";
import categories from "./categories";
import genres from "./genres";
import products from "./products";
import addresses from "./addresses";

const reducer = combineReducers({
  session,
  cart,
  categories,
  genres,
  products,
  addresses,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export * from "./session";
export * from "./cart";
export * from "./categories";
export * from "./genres";
export * from "./products";
export * from "./addresses";
