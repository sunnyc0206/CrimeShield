import * as UT from "./userTypes";
import axios from "axios";

const REGISTER_URL = "http://localhost:8081/rest/user/addOperator";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(userRequest());
    axios
      .get(
        "http://localhost:8081/rest/user"
      )
      .then((response) => {
        dispatch(userSuccess(response.data));
      })
      .catch((error) => {
        dispatch(userFailure(error.message));
      });
  };
};

export const registerUser = (userObject) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.post(REGISTER_URL, userObject);
    dispatch(userSavedSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(userFailure(error.message));
    return Promise.reject(error);
  }
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    dispatch(userRequest());
    axios
      .delete(`http://localhost:8081/rest/user/${userId}`)
      .then((response) => {
        dispatch(userDeletedSuccess(userId));
      })
      .catch((error) => {
        dispatch(userFailure(error.message));
      });
  };
};

const userDeletedSuccess = (userId) => {
  return {
    type: UT.USER_DELETED_SUCCESS,
    payload: userId,
  };
};

const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
  };
};

const userSavedSuccess = (user) => {
  return {
    type: UT.USER_SAVED_SUCCESS,
    payload: user,
  };
};

const userSuccess = (users) => {
  return {
    type: UT.USER_SUCCESS,
    payload: users,
  };
};

const userFailure = (error) => {
  return {
    type: UT.USER_FAILURE,
    payload: error,
  };
};
