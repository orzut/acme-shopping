import axios from "axios";

const GET_ADDRESSES = "GET_ADDRESSES";

const addresses = (state = [], action) => {
  if (action.type === GET_ADDRESSES) {
    return action.addresses;
  }
  return state;
};

export const getAddresses = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/addresses", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: GET_ADDRESSES, addresses: response.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default addresses;
