// src/reducers/index.js
import login from './login';
import task from './task';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	login,
	task
});
export default rootReducer;
