// src/reducers/index.js
import login from './login';
import user from './user';
import task from './task';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	login,
	user,
	task
});
export default rootReducer;
