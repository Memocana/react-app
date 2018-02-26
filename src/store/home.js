import * as NetworkServices from '../services/networServices';
import * as Endpoints from '../const/endpoints';

import _ from 'lodash';

// Actions
const GET_USERS = 'reducer/GET_USERS';
const GET_TASKS = 'reducer/GET_TASKS';
const CLOSE_ERROR_MODAL = 'reducer/CLOSE_ERROR_MODAL';


// Reducer
export default (state = {
	state: [],
	users: [],
	tasks: [],
	inProgressGetUsers: false,
	inProgressGetTasks: false,
	error: {
		status: false,
		message: ""
	}
}, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.users,
				inProgressGetUsers: action.inProgressGetUsers,
				error: action.error
			};
		case GET_TASKS:
			return {
				...state,
				tasks: action.tasks,
				inProgressGetTasks: action.inProgressGetTasks,
				error: action.error
			};
		case CLOSE_ERROR_MODAL:
			return {
				...state,
				error: action.error
			};

		default:
			return state;
	}
}

export function getUsersByHouseId(dispatch, token, houseID) {
	let users = [];
	let endpoint = _.replace(Endpoints.getUsersByHouseId, '%houseID%', houseID);
	NetworkServices.requestData("GET", endpoint, "", token).then((response) => {
		if (response.data) {
			users = response.data;
			return dispatch({
				type: GET_USERS,
				users: users,
				inProgressGetUsers: false
			});
		}
	}).catch(error => {
		return dispatch({
			type: GET_USERS,
			users: [],
			inProgressGetUsers: false,
			error: {
				status: true,
				message: "" + error
			}
		});
	});
	return dispatch({
		type: GET_USERS,
		users: [],
		inProgressGetUsers: true
	});
};

export function getTasksByHouseId(dispatch, token, houseID) {
	let tasks = [];
	let endpoint = _.replace(Endpoints.getTasksByHouseId, '%houseID%', houseID);
	NetworkServices.requestData("GET", endpoint, "", token).then((response) => {
		if (response.data) {
			tasks = response.data;
			return dispatch({
				type: GET_TASKS,
				tasks: tasks,
				inProgressGetTasks: false
			});
		}
	}).catch(error => {
		return dispatch({
			type: GET_TASKS,
			tasks: [],
			inProgressGetTasks: false,
			error: {
				status: true,
				message: "" + error
			}
		});
	});
	return dispatch({
		type: GET_TASKS,
		tasks: [],
		inProgressGetTasks: true
	});
};

export function closeErrorModal(dispatch) {
	return dispatch({
		type: CLOSE_ERROR_MODAL,
		error: {}
	});
};
