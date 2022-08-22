import axios from "axios";

const GET_ADDRESSES = "GET_ADDRESSES";
const ADD_ADDRESS = "ADD_ADDRESS";

const addresses = (state = [], action) => {
  if (action.type === GET_ADDRESSES) {
    return action.addresses;
  }
  if (action.type === ADD_ADDRESS) {
    return [...state, action.address];
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

export const createAddress = (address) => {
  return async (dispatch) => {
    try {
      console.log(address);
      const token = window.localStorage.getItem("token");
      if (token) {
        address = (
          await axios.post("/api/addresses", address, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        console.log(address);

        dispatch({ type: ADD_ADDRESS, address });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default addresses;
