import axios from 'axios';
import * as CO from './courtTypes';

// Action Creators

// Create Court
export const createCourt = (court) => {
  return (dispatch) => {
    dispatch({ type: CO.CREATE_COURT_REQUEST });

    axios
      .post('http://localhost:8081/rest/courts/addCourt', court)
      .then((response) => {
        dispatch({
          type: CO.CREATE_COURT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CO.CREATE_COURT_FAILURE,
          payload: error,
        });
      });
  };
};

// Get Courts
export const getCourts = () => {
  return (dispatch) => {
    dispatch({ type: CO.GET_COURTS_REQUEST });

    axios
      .get('http://localhost:8081/rest/courts')
      .then((response) => {
        dispatch({
          type: CO.GET_COURTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CO.GET_COURTS_FAILURE,
          payload: error,
        });
      });
  };
};

// Get Court by ID
export const getCourtById = (id) => {
  return (dispatch) => {
    dispatch({ type: CO.GET_COURT_BY_ID_REQUEST });

    axios
      .get(`http://localhost:8081/rest/courts/id/${id}`)
      .then((response) => {
        dispatch({
          type: CO.GET_COURT_BY_ID_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CO.GET_COURT_BY_ID_FAILURE,
          payload: error,
        });
      });
  };
};

// Update Court
export const updateCourt = (courtId, updatedCourt) => {
  return (dispatch) => {
    dispatch({ type: CO.UPDATE_COURT_REQUEST });
    return new Promise((resolve, reject) => {
    axios
      .put(`http://localhost:8081/rest/courts/updateCourt/${courtId}`, updatedCourt)
      .then((response) => {
        dispatch({
          type: CO.UPDATE_COURT_SUCCESS,
          payload: response.data,
        });
        resolve(response.data);
      
      })
      .catch((error) => {
        dispatch({
          type: CO.UPDATE_COURT_FAILURE,
          payload: error,
        });
        reject(error);
      });
  });
};
};

// Delete Court
export const deleteCourt = (id) => {
  return (dispatch) => {
    dispatch({ type: CO.DELETE_COURT_REQUEST });
    return new Promise((resolve, reject) => {
    axios
      .delete(`http://localhost:8081/rest/courts/${id}`)
      .then(() => {
        dispatch({
          type: CO.DELETE_COURT_SUCCESS,
          payload: id,
        });
        resolve();
      })
      .catch((error) => {
        dispatch({
          type: CO.DELETE_COURT_FAILURE,
          payload: error,
        });
        reject(error); // Reject the promise on deletion failure
      });
  });
};
};
