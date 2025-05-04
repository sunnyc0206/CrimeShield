import * as actionTypes from './courtTypes';

const initialState = {
  courts: [],
  error: '',
};

const courtReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_COURT_REQUEST:
      return {
        ...state,
      };
    case actionTypes.CREATE_COURT_SUCCESS:
      return {
        ...state,
        courts: [...state.courts, action.payload],
        error: '',
      };
    case actionTypes.CREATE_COURT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_COURT_BY_ID_REQUEST:
      return {
        ...state,
      };
    case actionTypes.GET_COURT_BY_ID_SUCCESS:
      return {
        ...state,
        courts: action.payload,
        error: '',
      };
    case actionTypes.GET_COURT_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_COURTS_REQUEST:
      return {
        ...state,
      };
    case actionTypes.GET_COURTS_SUCCESS:
      return {
        ...state,
        courts: action.payload,
        error: '',
      };
    case actionTypes.GET_COURTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.UPDATE_COURT_REQUEST:
      return {
        ...state,
      };
    case actionTypes.UPDATE_COURT_SUCCESS:
      return {
        ...state,
        courts: action.payload,
        error: '',
      };
    case actionTypes.UPDATE_COURT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.DELETE_COURT_REQUEST:
      return {
        ...state,
      };
    case actionTypes.DELETE_COURT_SUCCESS:
      return {
        ...state,
        courts: state.courts.filter(court => court.id !== action.payload),
        error: '',
      };
    case actionTypes.DELETE_COURT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default courtReducer;
