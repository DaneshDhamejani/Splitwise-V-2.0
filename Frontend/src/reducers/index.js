import { combineReducers } from "redux";
import signupreducer from  "./signupreducer";
import loginreducer from "./loginreducer";


const rootReducer = combineReducers({
    
    login : loginreducer,
    usersignup : signupreducer,
  });
  
export default rootReducer;