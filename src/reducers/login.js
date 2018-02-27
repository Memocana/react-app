import  * as NetworkServices from '../services/networServices';
import * as Endpoints from '../const/endpoints';
// ACTIONS
const TEST = 'reducer/TEST';
const GET_ALL_HOUSES = 'reducer/GET_ALL_HOUSES';
const REGISTER_AND_LOGIN = 'reducer/REGISTER_AND_LOGIN';
const CLOSE_ERROR_MODAL = 'reducer/CLOSE_ERROR_MODAL';


// REDUCERS
export default (state = {state:[],
	allHouses:[],
	inProgressGetHouses:false,
	inProgressLogin:false,
	error:{status:false,message:""},
	user: (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
	}, action) => {
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
				inProgressGetHouses:action.inProgressGetHouses,
			};
			case REGISTER_AND_LOGIN:
      return {
				...state,
				user:action.user,
				inProgressLogin:action.inProgressLogin,
				error:action.error

			};
			case CLOSE_ERROR_MODAL:
      return {
				...state,
				error:action.error
			};

    default: return state;
  }
}

// ACTION CREATERS
export function testStatus(dispatch, status) {
    return dispatch({
        type: TEST,
        status : status
    });
};

export function getAllHouses(dispatch) {
	let allHouses=[];
	NetworkServices.requestData("GET",Endpoints.getAllHouses,"",false).then((response)=>{
			if(response.data && response.data.length>0) {
				allHouses=response.data;
				return dispatch({
					type: GET_ALL_HOUSES,
					allHouses : allHouses,
					inProgressGetHouses:false
			});
			}
		});
		return dispatch({
			type: GET_ALL_HOUSES,
			allHouses : [],
			inProgressGetHouses:true
	});
};
export function registerAndLogin(dispatch,user) {
	NetworkServices.requestData("POST",Endpoints.registerAndLogin,user,false).then((response)=>{
			if(response.data && response.data.success) {
				localStorage.setItem('user', JSON.stringify(response.data));
				return dispatch({
					type: REGISTER_AND_LOGIN,
					user:response.data,
					inProgressLogin:false,
					error:{status:false,message:""}
			});
			} else {
				return dispatch({
					type: REGISTER_AND_LOGIN,
					user:{},
					inProgressLogin:false,
					error:{status:true,message:"Kullanıcı oluşturulamadı !"}
			});
			}
		})
		.catch(error => {
			console.log(error);
			return dispatch({
				type: REGISTER_AND_LOGIN,
				user:{},
				inProgressLogin:false,
				error:{status:true,message:"Kullanıcı oluşturulamadı !" + error.response.data}
		});
		});
		return dispatch({
			type: REGISTER_AND_LOGIN,
			user:{},
			inProgressLogin:true,
			error:{status:false,message:""}
	});
};
export function closeErrorModal(dispatch) {
		return dispatch({
			type: CLOSE_ERROR_MODAL,
			error : {}
	});
};
