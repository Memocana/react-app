import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Login from "../../components/Login"
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
		this.setState({validation:true});
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

export default withRouter(LoginPage);
