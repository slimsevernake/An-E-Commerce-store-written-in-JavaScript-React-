import { combineReducers } from "redux";

import { viewProducts, viewProductDetails } from "./productReducers";
import { cartReducers } from "./cartReducers";
import { authenticationReducers } from "./authReducers";

export default combineReducers({
  viewProducts,
  viewProductDetails,
  cartReducers,
  authenticationReducers
});
