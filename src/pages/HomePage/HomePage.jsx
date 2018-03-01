import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as userReducer from '../../reducers/user';
import HeaderMenu from '../../components/HeaderMenu';
import UserList from '../../components/UserList';
import GeneralModal from '../../components/GeneralModal';
import './HomePage.scss';
import _ from 'lodash';

class HomePage extends Component {

	state = {
		users: [],
		tasks: [],
		showNewTaskModal: false,
		taskDescription: ''
	}

	/* REACT LIFECYCLE FUNCTIONS */

	componentWillMount() {
		if(!JSON.parse(localStorage.getItem('user'))) {
			this.props.history.push('/');
		} else {
			let houseId = _.get(this.props, "user.houseId");
			if (!_.get(this.props, 'inProgressGetUsers')) {
				this.props.getUsersByHouseId(houseId);
			}
		}
	}

	/********************************/

	handleChange = (name, value) => {
		let newState = { ...this.state };
		newState[name] = value;
		this.setState({ ...newState });
	}

	closeNewTaskModal = () => {
		this.setState({
			showNewTaskModal: false,
			taskDescription: ''
		});
	}

	render() {
		return (
			<div className="page-container">

				<HeaderMenu
					userName={_.get(this.props, "user.firstname") ? this.props.user.firstname : ""}
					pathName={this.props.location.pathname}
					redirect={(path) => { this.props.history.push(path) }} />

				<div className="page-content">

					<UserList
						users={this.props.users}
						tasks={this.props.tasks}
						loadingState={this.props.inProgressGetUsers}
					/>
				</div>

				<GeneralModal
					show={_.get(this.props, 'error.status') ? true : false}
					title={"Hata Oluştu !"}
					body={_.get(this.props, 'error.message')}
					handleClose={() => this.props.closeErrorModal()} />
			</div>
		);
	}
}

/*CONNECTION TO REDUX STORE RELATED FUNCTIONS */
const mapStateToProps = (state) => {
	return {
		user: state.login.user,
		users: state.user.users,
		inProgressGetUsers: state.user.inProgressGetUsers,
		error: state.user.error
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getUsersByHouseId: (houseId) => {
			userReducer.getUsersByHouseId(dispatch, houseId);
		},
		closeErrorModal: () => {
			userReducer.closeErrorModal(dispatch);
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
