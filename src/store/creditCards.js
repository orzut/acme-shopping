import axios from "axios";

const GET_WALLET = "GET_WALLET";
const ADD_CREDIT_CARD = "ADD_CREDIT_CARD";
const DELETE_CREDIT_CARD = "DELETE_CREDIT_CARD";

const creditCards = (state = [], action) => {
  if (action.type === GET_WALLET) {
    return action.creditCards;
  }
  if (action.type === ADD_CREDIT_CARD) {
    return [...state, action.creditCard];
  }
  if (action.type === DELETE_CREDIT_CARD) {
    return state.filter((creditCard) => creditCard !== action.creditCard);
  }
  return state;
};

export const getWallet = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/creditCards", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: GET_WALLET, creditCards: response.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createCreditCard = (creditCard) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        creditCard = (
          await axios.post("/api/creditCards", creditCard, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch({ type: ADD_CREDIT_CARD, creditCard });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCreditCard = (creditCard) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/creditCards/${creditCard.id}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: DELETE_CREDIT_CARD, creditCard });
    } catch (err) {
      console.log(err);
    }
  };
};

export default creditCards;
