import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as homeStore from '../../store/home';
import HeaderMenu from '../../components/HeaderMenu';
import UserList from '../../components/UserList';
import TaskList from '../../components/TaskList';
import GeneralErrorModal from '../../components/GeneralErrorModal';
import _ from 'lodash';

import './HomePage.scss';
import NewTaskButton from '../../components/NewTaskButton';

class HomePage extends Component {

	state = {
		users: [],
		tasks: [],
		showNewTaskModal: false,
		taskDescription: ''
	}

	onClickTaskDelete = (taskId) => {
		this.props.deleteTaskById(taskId);
	}

	handleChange = (name, value) => {
		let newState = { ...this.state };
		newState[name] = value;
		this.setState({ ...newState });
	}

	addNewTask = () => {
		this.props.addNewTask({
			houseId: _.get(this.props, "user.houseId"),
			description: this.state.taskDescription
		})
	}

	closeNewTaskModal = () => {
		this.setState({
			showNewTaskModal: false,
			taskDescription: ''
		});
	}

	componentWillReceiveProps(nextProps) {
		if (_.get(nextProps, 'tasksUpdateNeeded') && !_.get(nextProps, 'inProgressGetTasks')) {
			let houseId = _.get(nextProps, "user.houseId");
			this.props.getTasksByHouseId(houseId);
			this.setState({
				showNewTaskModal: false,
				taskDescription: ''
			});
		}
	}

	componentDidMount() {
		let houseId = _.get(this.props, "user.houseId");
		if (!_.get(this.props, 'inProgressGetUsers')) {
			this.props.getUsersByHouseId(houseId);
		}
		if (!_.get(this.props, 'inProgressGetTasks')) {
			this.props.getTasksByHouseId(houseId);
		}
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

					<TaskList
						users={this.props.users}
						tasks={this.props.tasks}
						onTaskClick={() => _.noop}
						onClickTaskDelete={this.onClickTaskDelete}
						loadingState={this.props.inProgressGetTasks}
					/>

					<NewTaskButton
						showNewTaskModal={this.state.showNewTaskModal}
						taskDescription={this.state.taskDescription}
						handleChange={this.handleChange}
						addNewTask={this.addNewTask}
						handleClose={this.closeNewTaskModal}
					/>

				</div>

				<GeneralErrorModal
					show={_.get(this.props, 'error.status') ? true : false}
					title={"Hata Oluştu !"}
					body={_.get(this.props, 'error.message')}
					handleClose={() => this.props.closeErrorModal()} />
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		user: state.login.user,
		users: state.home.users,
		tasks: state.home.tasks,
		inProgressGetUsers: state.home.inProgressGetUsers,
		inProgressGetTasks: state.home.inProgressGetTasks,
		tasksUpdateNeeded: state.home.tasksUpdateNeeded,
		error: state.home.error
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getUsersByHouseId: (houseId) => {
			homeStore.getUsersByHouseId(dispatch, houseId);
		},
		getTasksByHouseId: (houseId) => {
			homeStore.getTasksByHouseId(dispatch, houseId);
		},
		addNewTask: (data) => {
			homeStore.addNewTask(dispatch, data);
		},
		deleteTaskById: (taskId) => {
			homeStore.deleteTaskById(dispatch, taskId);
		},
		closeErrorModal: () => {
			homeStore.closeErrorModal(dispatch);
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
