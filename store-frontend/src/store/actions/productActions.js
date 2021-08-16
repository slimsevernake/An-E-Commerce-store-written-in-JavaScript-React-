import axios from "axios";
import {
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
} from "../actionTypes";

const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  products,
});

export const getLatestProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCTS_REQUEST,
      });
      const { data } = await axios.get("/api/products");
      dispatch(getProductsSuccess(data));
    } catch (err) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        error:
          err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message,
      });
    }
  };
};

export const getProductDetails = (product_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCT_DETAILS_REQUEST,
      });
      const {data} = await axios.get(`/api/product/${product_id}`)
      dispatch({
        type: GET_PRODUCT_DETAILS_SUCCESS,
        product: data,
      });
    } catch (err) {
      console.log(err.message)
      dispatch({
        type: GET_PRODUCT_DETAILS_FAIL,
        error:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};
