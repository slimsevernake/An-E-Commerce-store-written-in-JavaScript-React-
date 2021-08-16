import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  // GET_CART_DETAILS_REQUEST,
  // GET_CART_DETAILS_SUCCESS,
  GET_CART_DETAILS_FAIL,
} from "../actionTypes";

const carDetailsFail = (error) => ({
  type: GET_CART_DETAILS_FAIL,
  error:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
});

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/product/${id}`);
      dispatch({
        type: ADD_TO_CART,
        payload: { ...data, qty },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducers.cart)
      );
    } catch (error) {
      dispatch(carDetailsFail(error));
    }
  };
};

export const removeFromCart = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducers.cart)
      );
    } catch (error) {
      dispatch(carDetailsFail(error));
    }
  };
};

export const viewCartDetails = () => {
  return async (dispatch) => {
    try {
    } catch (error) {
      dispatch(carDetailsFail(error));
    }
  };
};
