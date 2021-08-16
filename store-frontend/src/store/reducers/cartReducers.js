import {
  ADD_TO_CART,
  GET_CART_DETAILS_REQUEST,
  GET_CART_DETAILS_SUCCESS,
  GET_CART_DETAILS_FAIL,
  REMOVE_FROM_CART,
} from "../actionTypes";

export const cartReducers = (
  state = { loading: false, cart: [], error: "", warning: "", info: ""},
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existingItems = state.cart.find((x) => x._id === item._id);
      if (existingItems) {
        return {
          ...state,
          cart: state.cart.map((x) => {
            if (x._id === existingItems._id) {
              return item;
            } else {
              return x;
            }
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    case REMOVE_FROM_CART:
      const product_id = action.payload
      const existingItem = state.cart.find((x) => x._id === product_id);
      if(existingItem){
        return {
          ...state,
          cart: state.cart.filter((item) => {
            if(item._id !== product_id){
              return item
            }
            return null
          })
        }
      } else {
        return {
          ...state, warning: "Item not Found in Cart"
        }
      }
    case GET_CART_DETAILS_REQUEST:
      return { ...state, loading: true, error: "" };
    case GET_CART_DETAILS_SUCCESS:
      return { loading: false, cart: action.payload, error: "" };
    case GET_CART_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
