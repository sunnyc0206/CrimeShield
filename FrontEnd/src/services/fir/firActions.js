import axios from 'axios';
import * as FT from './firTypes';

export const createFIR = (firInputModel) => {
  return (dispatch) => {
    dispatch({ type: FT.CREATE_FIR_REQUEST });

    axios
      .post('http://localhost:8081/rest/FIR/registerFIR', firInputModel)
      .then((response) => {
        dispatch({
          type: FT.CREATE_FIR_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FT.CREATE_FIR_FAILURE,
          payload: error,
        });
      });
  };
};

export const getFIRById = (id) => {
  return (dispatch) => {
    dispatch({ type: FT.GET_FIR_BY_ID_REQUEST });

    axios
      .get(`http://localhost:8081/rest/FIR/id/{id}`)
      .then((response) => {
        dispatch({
          type: FT.GET_FIR_BY_ID_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FT.GET_FIR_BY_ID_FAILURE,
          payload: error,
        });
      });
  };
};

export const getFIRs = () => {
  return (dispatch) => {
    dispatch({ type: FT.GET_FIRS_REQUEST });

    axios
      .get('http://localhost:8081/rest/FIR')
      .then((response) => {
        dispatch({
          type: FT.GET_FIRS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FT.GET_FIRS_FAILURE,
          payload: error,
        });
      });
  };
};

export const updateFIR = (id, updatedFIR) => {
  return (dispatch) => {
    dispatch({ type: FT.UPDATE_FIR_REQUEST });

    return new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:8081/rest/FIR/updateCaseStatus/${id}`, updatedFIR)
        .then((response) => {
          dispatch({
            type: FT.UPDATE_FIR_SUCCESS,
            payload: response.data,
          });
          dispatch(getFIRs());
          resolve(response.data); // Resolve the promise with the response data
        })
        .catch((error) => {
          dispatch({
            type: FT.UPDATE_FIR_FAILURE,
            payload: error,
          });
          reject(error); // Reject the promise with the error
        });
    });
  };
};

export const deleteFIR = (id) => {
  return (dispatch) => {
    dispatch({ type: FT.DELETE_FIR_REQUEST });

    return new Promise((resolve, reject) => {
      axios
        .delete(`http://localhost:8081/rest/FIR/${id}`)
        .then(() => {
          dispatch({
            type: FT.DELETE_FIR_SUCCESS,
            payload: id,
          });
          resolve(); // Resolve the promise on successful deletion
        })
        .catch((error) => {
          dispatch({
            type: FT.DELETE_FIR_FAILURE,
            payload: error,
          });
          reject(error); // Reject the promise on deletion failure
        });
    });
  };
};
