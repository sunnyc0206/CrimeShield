import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import criminalReducer from "./criminal/criminalReducer";
import courtReducer from "./court/courtReducer";
import firReducer from "./fir/firRecuder";


const rootReducer = combineReducers({
  user: userReducer,
  criminals: criminalReducer,
  courts:courtReducer,
  firs:firReducer,
  auth: authReducer,
});

export default rootReducer;
