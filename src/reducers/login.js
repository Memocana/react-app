import {requestData} from "../services/networServices";
import * as Endpoints from "../const/endpoints";
const REGISTER_AND_LOGIN = "reducer/REGISTER_ACTION";

export default (state={
	user:(localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")):null)
},action)=>{
	switch(action.type) {
		case REGISTER_AND_LOGIN:
		return {
			...state
		}
		default:
		return state;
	}
}

export function registerAndLogin(user) {
	return (dispatch) => {
		dispatch({
			type:REGISTER_AND_LOGIN,
			user:{},
			inprogressLogin:true,
			error:{
				status:false,
				message:""
			}
		});
		return requestData("POST",Endpoints.registerAndLogin,user, false).then((response) => {
			if (response.data && response.data.success) {
			  localStorage.setItem('user', JSON.stringify(response.data));
			  dispatch({
				type: REGISTER_AND_LOGIN,
				user: response.data,
				inProgressLogin: false,
				error: {
				  status: false,
				  message: ""
				}
			  });

			  return response;
			} else {
			  let error = {
				status: true,
				message: "Kullanıcı oluşturulamadı !"
			  }
			  dispatch({
				type: REGISTER_AND_LOGIN,
				user: {},
				inProgressLogin: false,
				error: {
				  status: true,
				  message: "Kullanıcı oluşturulamadı !"
				}
			  });
			  throw error;
			}
		  })
		  .catch(error => {
			console.log(error);
			dispatch({
			  type: REGISTER_AND_LOGIN,
			  user: {},
			  inProgressLogin: false,
			  error: {
				status: true,
				message: "Kullanıcı oluşturulamadı !" + error.response.data
			  }
			});

			throw error;
		  });
	}
}
