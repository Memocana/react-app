import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import * as TaskReducerActions from '../../reducers/task';
import * as UserReducerActions from '../../reducers/user';
import HeaderMenu from '../../components/HeaderMenu';
// import UserList from '../../components/UserList';
// import TaskList from '../../components/TaskList';
// import GeneralModal from '../../components/GeneralModal';
import _ from 'lodash';

import './HomePage.scss';
import NewTaskButton from '../../components/NewTaskButton';

function Loading(props) {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

const LoadableUserList = Loadable({
  loader: () => import('../../components/UserList'),
  loading: Loading,
	delay: 100, // 0.1 seconds
});

const LoadableTaskList = Loadable({
  loader: () => import('../../components/TaskList'),
  loading: Loading,
	delay: 100, // 0.1 seconds
});

const LoadableGeneralModal = Loadable({
  loader: () => import('../../components/GeneralModal'),
  loading: Loading,
	delay: 100, // 0.1 seconds
});

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
				this.props.userReducerActions.getUsersByHouseId(houseId);
			}
			if (!_.get(this.props, 'inProgressGetTasks')) {
				this.props.taskReducerActions.getTasksByHouseId(houseId);
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (_.get(nextProps, 'tasksUpdateNeeded') && !_.get(nextProps, 'inProgressGetTasks')) {
			let houseId = _.get(nextProps, "user.houseId");
			this.props.taskReducerActions.getTasksByHouseId(houseId);
			this.setState({
				showNewTaskModal: false,
				taskDescription: ''
			});
		}
	}

	/********************************/

	onClickTaskDelete = (taskId) => {
		this.props.taskReducerActions.deleteTaskById(taskId);
	}

	handleChange = (name, value) => {
		let newState = { ...this.state };
		newState[name] = value;
		this.setState({ ...newState });
	}

	addNewTask = () => {
		this.props.taskReducerActions.addNewTask({
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

	render() {
		return (
			<div className="page-container">

				<HeaderMenu
					userName={_.get(this.props, "user.firstname") ? this.props.user.firstname : ""}
					pathName={this.props.location.pathname}
					redirect={(path) => { this.props.history.push(path) }} />

				<div className="page-content">

					<LoadableUserList
						users={this.props.users}
						tasks={this.props.tasks}
						loadingState={this.props.inProgressGetUsers}
					/>

					<LoadableTaskList
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

				<LoadableGeneralModal
					show={_.get(this.props, 'error.status') ? true : false}
					title={"Hata Oluştu !"}
					body={_.get(this.props, 'error.message')}
					handleClose={() => this.props.userReducerActions.closeErrorModal()} />
			</div>
		);
	}
}

/*CONNECTION TO REDUX STORE RELATED FUNCTIONS */
const mapStateToProps = (state) => {
	return {
		user: state.login.user,
		users: state.user.users,
		tasks: state.task.tasks,
		inProgressGetUsers: state.user.inProgressGetUsers,
		inProgressGetTasks: state.task.inProgressGetTasks,
		tasksUpdateNeeded: state.task.tasksUpdateNeeded,
		error: state.user.error ? state.user.error : state.task.error
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		userReducerActions: bindActionCreators(UserReducerActions, dispatch),
		taskReducerActions: bindActionCreators(TaskReducerActions, dispatch)
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
