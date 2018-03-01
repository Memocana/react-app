// src/reducers/index.js
import login from './login';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	login
});
export default rootReducer;
