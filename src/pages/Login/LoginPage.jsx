import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { withRouter } from "react-router-dom";
import Login from "../../components/Login"
import * as loginActions from "../../reducers/login";
import './LoginPage.scss';

const houses=[
	{
		id:1,
		name:"Accenture"
	},
	{
		id:2,
		name:"Industry x.0"
	},
	{
		id:3,
		name:"COE"
	}
];
class LoginPage extends Component {
  state = {
    name: '',
	lastName: '',
    selectedHome: "",
    validation: false
  }
	handleChange=(name, value) => {
		let newState =  {...this.state};
		newState.validation=false;
		newState[name]=value;
		this.setState({...newState});
	}
	login = () => {
		console.log("Login triggered");
		const {name, lastName,selectedHome} = this.state;
		if(name && lastName && selectedHome) {
			this.props.loginActionCreators.registerAndLogin({firstname:name,lastname:lastName,houseId:Number(selectedHome)}).then(()=>{
				this.props.history.push('/home');
			});
		}

	}

	render() {
		const {name, lastName, validation, selectedHome }=this.state;
		return (
			<div className={"page-container"}>
				<Login
					login={this.login}
					handleChange={this.handleChange}
					name={name}
					lastName={lastName}
					validation={validation}
					houses={houses}
					selectedHome={selectedHome}
				/>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		loginActionCreators: bindActionCreators(loginActions,dispatch),
	}
};
const mapStateToProps = (state)=> {
	return {
		user:state.login.user,
		error:state.login.error,
		inProgressLogin: state.login.inProgressLogin
	}
}


export default withRouter(
	connect(mapStateToProps,mapDispatchToProps)(LoginPage)
);
