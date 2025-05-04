import * as UT from "./userTypes";

const initialState = {
  users: [],
  error: "",
  registrationSuccess: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UT.USER_REQUEST:
      return {
        ...state,
      };
    case UT.USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: "",
      };
    case UT.USER_SAVED_SUCCESS:
      return {
        ...state,
        registrationSuccess: true,
        error: "",
      };
    case UT.USER_DELETED_SUCCESS:
      // Filter out the deleted user from the users array
      const updatedUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        users: updatedUsers,
        error: "",
      };
    case UT.USER_FAILURE:
      return {
        ...state,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
