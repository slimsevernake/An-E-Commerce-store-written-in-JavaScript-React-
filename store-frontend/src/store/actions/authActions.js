import axios from "axios";
import { AUTHENTICATION_LOADING, AUTHENTICATION_FAILED, AUTHENTICATION_SUCCESS} from "../actionTypes";

const authenticationFailed = (error) => ({
  type: AUTHENTICATION_FAILED,
  error:
    error.response && error.response.data.details
      ? error.response.data.details
      : error.message,
});

export const login = (info) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: AUTHENTICATION_LOADING
      })
      const { data } = await axios.post(`api/users/login`, info);
      localStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.common["Authorization"] = data.token
      dispatch({
        type: AUTHENTICATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch(authenticationFailed(error));
    }
  };
};


export const register = (info) => {
  return async (dispatch) => {
    try{
      dispatch({
        type: AUTHENTICATION_LOADING
      })
      const {data} = await axios.post(`api/users/register`, info) 
      localStorage.setItem("user", JSON.stringify(data))
      axios.defaults.headers.common["Authorization"] = data.token
      dispatch({
        type: AUTHENTICATION_SUCCESS,
        payload: data
      })
    } catch (error){
      dispatch(authenticationFailed(error))
    }
  }
}