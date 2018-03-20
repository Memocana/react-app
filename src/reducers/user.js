import * as NetworkServices from '../services/networServices';
import * as Endpoints from '../const/endpoints';

import _ from 'lodash';

// Actions
const GET_USERS = 'reducer/GET_USERS';
const CLOSE_ERROR_MODAL = 'reducer/CLOSE_ERROR_MODAL';


// Reducer
export default (state = {
	state: [],
	users: [],
	inProgressGetUsers: false,
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
		case CLOSE_ERROR_MODAL:
			return {
				...state,
				error: action.error
			};

		default:
			return state;
	}
}

export function getUsersByHouseId(houseID) {
	return function (dispatch) {
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
	}
};

export function closeErrorModal() {
	return function (dispatch) {
		return dispatch({
			type: CLOSE_ERROR_MODAL,
			error: {}
		});
	}
};
