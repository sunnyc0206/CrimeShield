import axios from 'axios';
import * as CT from '../criminal/criminalTypes';

// Action Creators
export const createCriminal = (criminal) => {
  return (dispatch) => {
    dispatch({ type: CT.CREATE_CRIMINAL_REQUEST });

    axios
      .post('http://localhost:8081/rest/criminals/registerCriminal', criminal)
      .then((response) => {
        dispatch({
          type: CT.CREATE_CRIMINAL_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CT.CREATE_CRIMINAL_FAILURE,
          payload: error,
        });
      });
  };
};

export const getCriminals = () => {
  return (dispatch) => {
    dispatch({ type: CT.GET_CRIMINALS_REQUEST });

    axios
      .get('http://localhost:8081/rest/criminals')
      .then((response) => {
        dispatch({
          type: CT.GET_CRIMINALS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CT.GET_CRIMINALS_FAILURE,
          payload: error,
        });
      });
  };
};


export const getCriminalById = (id) => {
  return (dispatch) => {
    dispatch({ type: CT.GET_CRIMINAL_BY_ID_REQUEST });

    axios
      .get(`http://localhost:8081/rest/criminals/id/${id}`)
      .then((response) => {
        dispatch({
          type: CT.GET_CRIMINAL_BY_ID_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CT.GET_CRIMINAL_BY_ID_FAILURE,
          payload: error,
        });
      });
  };
};

export const updateCriminal = (criminalId, updatedCriminal) => {
  return (dispatch) => {
    dispatch({ type: CT.UPDATE_CRIMINAL_REQUEST });

    return new Promise((resolve, reject) => {
      axios
        .put(`http://localhost:8081/rest/criminals/updateCriminal/${criminalId}`, updatedCriminal)
        .then((response) => {
          dispatch({
            type: CT.UPDATE_CRIMINAL_SUCCESS,
            payload: response.data,
          });
          dispatch(getCriminals());
          resolve(response.data); // Resolve the promise with the response data
        })
        .catch((error) => {
          dispatch({
            type: CT.UPDATE_CRIMINAL_FAILURE,
            payload: error,
          });
          reject(error); // Reject the promise with the error
        });
    });
  };
};



export const deleteCriminal = (id) => {
  return (dispatch) => {
    dispatch({ type: CT.DELETE_CRIMINAL_REQUEST });

    return new Promise((resolve, reject) => {
      axios
        .delete(`http://localhost:8081/rest/criminals/${id}`)
        .then(() => {
          dispatch({
            type: CT.DELETE_CRIMINAL_SUCCESS,
            payload: id,
          });
          resolve(id); // Resolve the promise on successful deletion
        })
        .catch((error) => {
          dispatch({
            type: CT.DELETE_CRIMINAL_FAILURE,
            payload: error,
          });
          reject(error); // Reject the promise on deletion failure
        });
    });
  };
};

