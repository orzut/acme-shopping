import { createStore, combineReducers, applyMiddleware } from "redux";
import auth from "./auth";
import cart from "./cart";
import categories from "./categories";
import genres from "./genres";

import thunk from "redux-thunk";
import logger from "redux-logger";

const reducer = combineReducers({
  auth,
  cart,
  categories,
  genres,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export * from "./auth";
export * from "./cart";
export * from "./categories";
export * from "./genres";
