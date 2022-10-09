import { combineReducers } from "redux";
import registerReducers , { RegisterState } from "./register.reducers";
import loginReducer, { LoginState } from "./login.reducer";

export default combineReducers({ registerReducers,loginReducer});

export interface RootReducers {
    registerReducer: RegisterState;
    loginReducer: LoginState;
}