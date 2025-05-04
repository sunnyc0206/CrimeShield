import * as actionTypes from './firTypes';

const initialState = {
  firs: [],
  error: '',
};

const firReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_FIR_REQUEST:
    case actionTypes.GET_FIR_BY_ID_REQUEST:
    case actionTypes.UPDATE_FIR_REQUEST:
    case actionTypes.DELETE_FIR_REQUEST:
    case actionTypes.GET_FIRS_REQUEST:
      return {
        ...state,
      };
    case actionTypes.CREATE_FIR_SUCCESS:
    case actionTypes.GET_FIR_BY_ID_SUCCESS:
      return {
        ...state,
        firs: action.payload,
        error: '',
      };
    case actionTypes.UPDATE_FIR_SUCCESS:
      return {
        ...state,
        firs: action.payload,
        error: '',
      };
    case actionTypes.DELETE_FIR_SUCCESS:
      return {
        ...state,
        firs: null,
        error: '',
      };
    case actionTypes.GET_FIRS_SUCCESS:
      return {
        ...state,
        firs: action.payload,
        error: '',
      };
    case actionTypes.CREATE_FIR_FAILURE:
    case actionTypes.GET_FIR_BY_ID_FAILURE:
    case actionTypes.UPDATE_FIR_FAILURE:
    case actionTypes.DELETE_FIR_FAILURE:
    case actionTypes.GET_FIRS_FAILURE:
      return {
        ...state,
        firs: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default firReducer;
