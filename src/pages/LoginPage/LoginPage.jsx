import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as loginStore from '../../store/login';
import Login from '../../components/Login'
import GeneralErrorModal from '../../components/GeneralErrorModal'
import _ from 'lodash';

import './LoginPage.scss';


class LoginPage extends Component {

	state = {
		name: '',
		surName: '',
		selectedHome: "",
		validation: false
	}

	componentWillReceiveProps(nextProps) {
		if (_.get(JSON.parse(localStorage.getItem('user')), "jwt")) {
			this.props.history.push('./home')
		}
	}

	componentWillMount() {
		localStorage.removeItem('user');
		if (!this.props.allHouses || this.props.allHouses.length === 0) {
			this.setState({ loadingGetHouses: true })
			this.props.getAllHouses(true);
		}
	}

	login = () => {
		const { name, surName, selectedHome } = this.state;
		this.setState({ loadingLogin: true, validation: true })
		if (name && surName && selectedHome) {
			this.props.registerAndLogin({ firstname: name, lastname: surName, houseId: Number(selectedHome) });
		}
	}

	handleChange = (name, value) => {
		let newState = { ...this.state };
		newState.validation = false;
		newState[name] = value;
		this.setState({ ...newState });
	}

	render() {
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

				<GeneralErrorModal show={this.props.error.status ? this.props.error.status : false}
					title={"Hata Oluştu !"} body={this.props.error.message}
					handleClose={() => this.props.closeErrorModal()} />
			</div>);
	}
}
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
		testStatus: (data) => {
			loginStore.testStatus(dispatch, data);
		},
		getAllHouses: () => {
			loginStore.getAllHouses(dispatch);
		},
		registerAndLogin: (user) => {
			loginStore.registerAndLogin(dispatch, user);
		},
		closeErrorModal: () => {
			loginStore.closeErrorModal(dispatch);
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);

