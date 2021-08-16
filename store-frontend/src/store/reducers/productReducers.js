import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
} from "../actionTypes";

export const viewProducts = (
  state = { loading: false, products: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.products };
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const viewProductDetails = (
  state = { loading: false, product: {}, error: "" },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {loading: true };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return { product: action.product, loading: false};
    case GET_PRODUCT_DETAILS_FAIL:
      return { error: action.error };
    default:
      return state;
  }
};
