import  * as NetworkServices from '../services/networServices';
import * as Endpoints from '../const/endpoints';
// Actions
const TEST = 'reducer/TEST';
const GET_ALL_HOUSES = 'reducer/GET_ALL_HOUSES';
const REGISTER_AND_LOGIN = 'reducer/REGISTER_AND_LOGIN';

// Reducer
export default (state = {state:[], allHouses:[]}, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        status: action.status,
			};
			case GET_ALL_HOUSES:
      return {
        ...state,
        allHouses: action.allHouses,
			};
			case REGISTER_AND_LOGIN:
      return {
				...state,
				user:action.user
      };
    default: return state;
  }
}

// Action Creators
export function testStatus(dispatch, status) {
    return dispatch({
        type: TEST,
        status : status
    });
};

export function getAllHouses(dispatch) {
	let allHouses=[];
	NetworkServices.requestData("GET",Endpoints.getAllHouses,"","").then((data)=>{
			if(data && data.length>0) {
				allHouses=data;
				return dispatch({
					type: GET_ALL_HOUSES,
					allHouses : allHouses
			});
			}
		});
};
export function registerAndLogin(dispatch,user) {
	NetworkServices.requestData("POST",Endpoints.registerAndLogin,user,"").then((data)=>{
			if(data && data.success) {
				return dispatch({
					type: REGISTER_AND_LOGIN,
					user:data
			});

			}
		});
}
