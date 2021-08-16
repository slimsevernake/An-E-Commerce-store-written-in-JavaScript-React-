import {
  AUTHENTICATION_FAILED,
  AUTHENTICATION_LOADING,
  AUTHENTICATION_SUCCESS,
  DEAUTHENTICATE
} from "../actionTypes";
const defaultAuthenticatedState = {
  user: {
    name: "",
    email: "",
  },
  loading: false,
  isAuthenticated: false,
  token: "",
  error: "",
};
export const authenticationReducers = (
  state = defaultAuthenticatedState,
  action
) => {
  switch (action.type) {
    case AUTHENTICATION_LOADING:
      return { ...state, loading: true, error: "" };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: { name: action.payload.name, email: action.payload.email },
        isAuthenticated: true,
        token: action.payload.token,
        loading: false,
      };
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        error: action.error,
        loading: false,
      };
    case DEAUTHENTICATE:
      localStorage.removeItem("user");
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        token: "",
        error: "",
        loading: false,
      };
    default:
      return state;
  }
};
