import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "./constant";

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
      { email, password }
    ); // Adjust API URL as needed
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("token", data.token); // Save token in localStorage
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Register action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    // Sending the complete userData object as the payload
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/users/register`,
      userData
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
