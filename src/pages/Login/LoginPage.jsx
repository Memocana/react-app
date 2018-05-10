import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import './LoginPage.scss';
import Login from '../../components/Login.jsx';

const allHouses = [
		{
			id: 0,
			name: "Accenture"
		}, 
		{
			id: 1,
			name: "Kanyon"
		}, 
	]

class LoginPage extends Component {

	state = {
		name: '',
		surname: '',
		selectedHome: '',
		validation: false,
	}

	login = () => {
		this.props.history.push("/home");
	};

	handleChange = (value, name) => {
		let newState = {...this.state};
		newState[name]=value;
		this.setState({newState});
	}

	render() {
		return (
			<div>
				<h1>Login</h1>
				<button onClick={e => this.login(e)}>Login</button>
				<Login name={this.state.name} surname={this.state.surname} selectedHome={this.state.selectedHome} allHouses={allHouses} handleChange={this.handleChange}/>
			</div>
		);
	}
}

export default withRouter(LoginPage);
