import axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

const products = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    return action.products;
  }
  return state;
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const products = (await axios.get("/api/products")).data;
      dispatch({ type: SET_PRODUCTS, products });
    } catch (err) {
      console.log(err);
    }
  };
};

export default products;
