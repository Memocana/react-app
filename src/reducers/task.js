import {
	requestData
} from "../services/networServices";
import * as Endpoints from "../const/endpoints";
import _ from 'lodash';

const GET_TASKS = "reducer/GET_TASKS";

export default (state = {
	tasks: []
}, action) => {
	switch (action.type) {
		case GET_TASKS:
			return {
				...state,
				tasks: action.tasks
			}
		default:
			return state;
	}
}

export function getTasks(houseID) {
	return (dispatch) => {
		let endpoint = _.replace(Endpoints.getTasksByHouseId, '%houseID%', houseID);
		return requestData("GET", endpoint, "", true)
			.then((response) => {
				dispatch({
					type: GET_TASKS,
					tasks: response.data
				});
				return response;
			}).catch(error => {
				throw error;
			});
	}
}
