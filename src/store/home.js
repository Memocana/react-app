import * as NetworkServices from '../services/networServices';
import * as Endpoints from '../const/endpoints';

import _ from 'lodash';

// Actions
const GET_USERS = 'reducer/GET_USERS';
const GET_TASKS = 'reducer/GET_TASKS';
const ADD_TASK = 'reducer/ADD_TASK';
const DELETE_TASK = 'reducer/DELETE_TASK';
const CLOSE_ERROR_MODAL = 'reducer/CLOSE_ERROR_MODAL';


// Reducer
export default (state = {
	state: [],
	users: [],
	tasks: [],
	inProgressGetUsers: false,
	inProgressGetTasks: false,
	tasksUpdateNeeded: false,
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
				tasksUpdateNeeded: action.tasksUpdateNeeded,
				inProgressGetTasks: action.inProgressGetTasks,
				error: action.error
			};
		case ADD_TASK:
			return {
				...state,
				tasksUpdateNeeded: action.tasksUpdateNeeded,
				inProgressAddTask: action.inProgressDeleteTask,
				error: action.error
			};
		case DELETE_TASK:
			return {
				...state,
				tasksUpdateNeeded: action.tasksUpdateNeeded,
				inProgressDeleteTask: action.inProgressDeleteTask,
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

export function getUsersByHouseId(dispatch, houseID) {
	let users = [];
	let endpoint = _.replace(Endpoints.getUsersByHouseId, '%houseID%', houseID);
	NetworkServices.requestData("GET", endpoint, "", true).then((response) => {
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

export function getTasksByHouseId(dispatch,houseID) {
	let tasks = [];
	let endpoint = _.replace(Endpoints.getTasksByHouseId, '%houseID%', houseID);
	NetworkServices.requestData("GET", endpoint, "", true).then((response) => {
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
		tasksUpdateNeeded: false,
		inProgressGetTasks: true
	});
};

export function addNewTask(dispatch, token, data) {
	NetworkServices.requestData("POST", Endpoints.addNewTask, data, token).then((response) => {
		return dispatch({
			type: ADD_TASK,
			tasksUpdateNeeded: true,
			inProgressAddTask: false
		});
	}).catch(error => {
		return dispatch({
			type: ADD_TASK,
			inProgressAddTask: false,
			error: {
				status: true,
				message: "" + error
			}
		});
	});
	return dispatch({
		type: ADD_TASK,
		inProgressAddTask: true
	});
};

export function deleteTaskById(dispatch, token, taskID) {
	let endpoint = _.replace(Endpoints.deleteTaskById, '%taskID%', taskID);
	NetworkServices.requestData("DELETE", endpoint, "", token).then((response) => {
		return dispatch({
			type: DELETE_TASK,
			tasksUpdateNeeded: true,
			inProgressDeleteTask: false
		});
	}).catch(error => {
		return dispatch({
			type: DELETE_TASK,
			inProgressDeleteTask: false,
			error: {
				status: true,
				message: "" + error
			}
		});
	});
	return dispatch({
		type: DELETE_TASK,
		inProgressDeleteTask: true
	});
};

export function closeErrorModal(dispatch) {
	return dispatch({
		type: CLOSE_ERROR_MODAL,
		error: {}
	});
};
