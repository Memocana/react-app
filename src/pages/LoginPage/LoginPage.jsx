import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as LoginReducerActions from '../../reducers/login';
import Login from '../../components/Login'
import GeneralModal from '../../components/GeneralModal'
import _ from 'lodash';

import './LoginPage.scss';


class LoginPage extends Component {

	state = {
		name: '',
		surName: '',
		selectedHome: "",
		validation: false
	}

	/* REACT LIFECYCLE FUNCTIONS */

	componentWillReceiveProps(nextProps) {
		// if (_.get(JSON.parse(localStorage.getItem('user')), "jwt")) {
		// 	this.props.history.push('./home')
		// }
	}

	componentWillMount() {
		localStorage.removeItem('user');
		if (!this.props.allHouses || this.props.allHouses.length === 0) {
			this.setState({ loadingGetHouses: true })
			this.props.loginReducerActions.getAllHouses(true);
		}
	}

	/***********************************/

	login = () => {
		const { name, surName, selectedHome } = this.state;
		this.setState({ loadingLogin: true, validation: true })
		if (name && surName && selectedHome) {
			this.props.loginReducerActions.registerAndLogin({ firstname: name, lastname: surName, houseId: Number(selectedHome) })
				.then(() => {
					this.props.history.push('./home')
				})
				.catch(error => {
					console.log("error");
				});
		}
	}

	handleChange = (name, value) => {
		let newState = { ...this.state };
		newState.validation = false;
		newState[name] = value;
		this.setState({ ...newState });
	}

	render() {
		// TODO: test for error bounndary
		// let variable = null;
		// variable.toString();
		return (
			<div className="page-container">
				<Login
					login={this.login}
					homes={this.props.allHouses}
					handleChange={this.handleChange}
					name={this.state.name}
					surName={this.state.surName}
					selectedHome={this.state.selectedHome}
					loadingState={this.props.inProgressGetHouses || this.props.inProgressLogin}
					validate={this.state.validation} />

				<GeneralModal show={this.props.error.status ? this.props.error.status : false}
					title={"Hata Oluştu !"} body={this.props.error.message}
					handleClose={() => this.props.loginReducerActions.closeErrorModal()} />
			</div>);
	}
}

/*CONNECTION TO REDUX STORE RELATED FUNCTIONS */
const mapStateToProps = (state) => {
	return {
		allHouses: state.login.allHouses,
		user: state.login.user,
		inProgressLogin: state.login.inProgressLogin,
		inProgressGetHouses: state.login.inProgressGetHouses,
		error: state.login.error
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		loginReducerActions: bindActionCreators(LoginReducerActions, dispatch)
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
