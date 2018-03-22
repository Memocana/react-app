import {combineReducers} from "redux";
import login from "./login";
import user from "./user";
import task from "./task";

const rootReducer= combineReducers({
	login,
	user,
	task
})
export default rootReducer;
