// src/reducers/index.js
import login from './login';
import task from './task';
import user from './user';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	login,
	task,
	user
});
export default rootReducer;
