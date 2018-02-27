// src/reducers/index.js
import login from './login';
import home from './home';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
	login,
	home
	//roulette
});
export default rootReducer;
