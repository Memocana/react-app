import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
	login = () => {
		this.props.history.push("/home");
	};

	render() {
		return (
			<div>
				<h1>Login</h1>
				<button onClick={e => this.login(e)}>Login</button>
			</div>
		);
	}
}

export default withRouter(LoginPage);
