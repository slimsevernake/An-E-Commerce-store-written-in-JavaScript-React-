import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? { cart: JSON.parse(localStorage.getItem("cartItems")) }
  : { loading: false, cart: [], error: "" };

const isAuthenticated = localStorage.getItem("user")
  ? {
      isAuthenticated: true,
      token: JSON.parse(localStorage.getItem("user")).token,
      user: JSON.parse(localStorage.getItem("user")),
    }
  : {
      isAuthenticated: false,
      token: "",
      error: "",
      user: {
        name: "",
        email: "",
      },
    };

const DEFAULT_STATE = {
  cartReducers: cartItemsFromLocalStorage,
  authenticationReducers: isAuthenticated,
};
const middleware = [thunk];

export default createStore(
  reducers,
  DEFAULT_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);
