import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "../../reducers/user";
import * as TaskActions from "../../reducers/task";
import UserList from "../../components/UserList";
import TaskList from "../../components/TaskList";
import _ from "lodash";

import './HomePage.scss';
import NewTaskModal from "../../components/NewTaskModal";

class HomePage extends PureComponent {
	/*REACT LIFECYCLE FUNCTIONS*/
	constructor(props) {
		super(props);
		console.log("constructor called");
		this.state = {
			test: true,
			counter: 1,
			show: false,
			taskDescription: ""
		};
	}

	componentWillMount() {
		console.log("componentWillMount called");
		if (!this.props.users.length) {
			let houseId = this.props.user.houseId;
			this.props.userActionCreators.getUsers(houseId)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					alert("Error: ", error)
				})
		}

		if (!this.props.tasks.length) {
			let houseId = this.props.user.houseId;
			this.props.taskActionCreators.getTasks(houseId)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					alert("Error: ", error)
				})
		}
	}

	componentDidMount() {
		console.log("componentDidMount called");
	}

	onClickTaskDelete = (id) => {
		this.props.taskActionCreators.deleteTaskById(id)
			.then(response => {
				let houseId = this.props.user.houseId;
				this.props.taskActionCreators.getTasks(houseId);
			})
			.catch(error => {

			});
	}

	handleChange = (name, value) => {
		let newState = { ...this.state };
		newState[name] = value;
		this.setState({ ...newState });
	}

	addNewTask = () => {
		this.props.taskActionCreators.addNewTask({
			houseId: _.get(this.props, "user.houseId"),
			description: this.state.taskDescription
		})
			.then(() => {
				let houseId = this.props.user.houseId;
				this.props.taskActionCreators.getTasks(houseId);
				this.setState({ show: false, taskDescription: "" });
			})
			.catch(error => {
				alert("Error: ", error)
			})
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	render() {
		console.log("current state: ", this.state);
		const { users, tasks } = this.props;
		return (
			<div className="page-container">
				<h1>Öğrenci Evi -- Home Page</h1>
				<div className="page-content">
					<UserList
						users={users}
						tasks={tasks}
					/>
					<TaskList
						users={users}
						tasks={tasks}
						onClickTaskDelete={this.onClickTaskDelete}
					/>
					<div className="add-new-button-container">
						<button
							className="add-new-button"
							onClick={() => this.handleChange("show", true)}>+ Yeni İş</button>
						<NewTaskModal
							show={this.state.show}
							title={'Yeni İş'}
							taskDescription={this.state.taskDescription}
							handleChange={this.handleChange}
							addNewTask={this.addNewTask}
							handleClose={this.handleClose}
						/>
					</div>

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.login.user,
		users: state.user.users,
		tasks: state.task.tasks
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		userActionCreators: bindActionCreators(UserActions, dispatch),
		taskActionCreators: bindActionCreators(TaskActions, dispatch)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
