import {
	requestData
} from "../services/networServices";
import * as Endpoints from "../const/endpoints";

const GET_ALL_HOUSES = "reducer/GET_ALL_HOUSES";
const REGISTER_AND_LOGIN = "reducer/REGISTER_ACTION";

export default (state = {
	user: (localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : null),
	houses: []
}, action) => {
	switch (action.type) {
		case REGISTER_AND_LOGIN:
			return {
				...state,
				user: action.user,
				inProgressLogin: action.inProgressLogin
			}
		case GET_ALL_HOUSES:
			return {
				...state,
				houses: action.houses
			}
		default:
			return state;
	}
}

export function registerAndLogin(user) {
	return (dispatch) => {
		dispatch({
			type: REGISTER_AND_LOGIN,
			user: {},
			inprogressLogin: true
		});
		return requestData("POST", Endpoints.registerAndLogin, user, false)
			.then((response) => {
				localStorage.setItem('user', JSON.stringify(response.data));
				dispatch({
					type: REGISTER_AND_LOGIN,
					user: response.data,
					inProgressLogin: false
				});
				return response;
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: REGISTER_AND_LOGIN,
					user: {},
					inProgressLogin: false
				});

				throw error;
			});
	}
}

export function getAllHouses() {
	return function (dispatch) {
		return requestData("GET", Endpoints.getAllHouses, "", false)
			.then((response) => {
				console.log("Houses: ", response.data);
				dispatch({
					type: GET_ALL_HOUSES,
					houses: response.data
				});
				return response;
			}).catch(error => {
				throw error;
			})
	}
}
