import {
	requestData
} from "../services/networServices";
import * as Endpoints from "../const/endpoints";
import _ from 'lodash';

const GET_USERS = "reducer/GET_USERS";

export default (state = {
	users: []
}, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.users
			}
		default:
			return state;
	}
}

export function getUsers(houseID) {
	return (dispatch) => {
		let endpoint = _.replace(Endpoints.getUsersByHouseId, '%houseID%', houseID);
		return requestData("GET", endpoint, "", true)
			.then((response) => {
				dispatch({
					type: GET_USERS,
					users: response.data
				});
				return response;
			}).catch(error => {
				throw error;
			});
	}
}
