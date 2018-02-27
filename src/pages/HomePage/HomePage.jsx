import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as taskReducer from '../../reducers/task';
import HeaderMenu from '../../components/HeaderMenu';
import UserList from '../../components/UserList';
import TaskList from '../../components/TaskList';
import GeneralModal from '../../components/GeneralModal';
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

				<GeneralModal
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
		users: state.task.users,
		tasks: state.task.tasks,
		inProgressGetUsers: state.task.inProgressGetUsers,
		inProgressGetTasks: state.task.inProgressGetTasks,
		tasksUpdateNeeded: state.task.tasksUpdateNeeded,
		error: state.task.error
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getUsersByHouseId: (houseId) => {
			taskReducer.getUsersByHouseId(dispatch, houseId);
		},
		getTasksByHouseId: (houseId) => {
			taskReducer.getTasksByHouseId(dispatch, houseId);
		},
		addNewTask: (data) => {
			taskReducer.addNewTask(dispatch, data);
		},
		deleteTaskById: (taskId) => {
			taskReducer.deleteTaskById(dispatch, taskId);
		},
		closeErrorModal: () => {
			taskReducer.closeErrorModal(dispatch);
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
