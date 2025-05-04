import * as actionTypes from './criminalTypes';

const initialState = {
  criminals: [], // Initialize the criminals array
  error: '',
};

const criminalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CRIMINAL_REQUEST:
    case actionTypes.GET_CRIMINAL_BY_ID_REQUEST:
    case actionTypes.UPDATE_CRIMINAL_REQUEST:
    case actionTypes.DELETE_CRIMINAL_REQUEST:
    case actionTypes.GET_CRIMINALS_REQUEST:
      return {
        ...state,
      };
    case actionTypes.CREATE_CRIMINAL_SUCCESS:
    case actionTypes.GET_CRIMINAL_BY_ID_SUCCESS:
      return {
        ...state,
        criminals: action.payload, // Update the criminals array
        error: '',
      };
    case actionTypes.UPDATE_CRIMINAL_SUCCESS:
      return {
        ...state,
        criminals: action.payload, // Update the criminals array
        error: '',
      };
    case actionTypes.DELETE_CRIMINAL_SUCCESS:
      return {
        ...state,
        criminals: null, // Set the criminals array to null
        error: '',
      };
    case actionTypes.GET_CRIMINALS_SUCCESS:
      return {
        ...state,
        criminals: action.payload, // Update the criminals array
        error: '',
      };
    case actionTypes.CREATE_CRIMINAL_FAILURE:
    case actionTypes.GET_CRIMINAL_BY_ID_FAILURE:
    case actionTypes.UPDATE_CRIMINAL_FAILURE:
    case actionTypes.DELETE_CRIMINAL_FAILURE:
    case actionTypes.GET_CRIMINALS_FAILURE:
      return {
        ...state,
        criminals: null, // Set the criminals array to null
        error: action.payload,
      };
    default:
      return state;
  }
};

export default criminalReducer;
