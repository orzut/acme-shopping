import { createStore, combineReducers, applyMiddleware } from "redux";
import session from "./session";
import cart from "./cart";
import thunk from "redux-thunk";
import logger from "redux-logger";

const reducer = combineReducers({
  session,
  cart,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export * from "./session";
export * from "./cart";
