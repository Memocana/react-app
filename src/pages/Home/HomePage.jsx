import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "../../reducers/user";
import * as TaskActions from "../../reducers/task";
import UserList from "../../components/UserList";
import TaskList from "../../components/TaskList";


import './HomePage.scss';

class HomePage extends PureComponent {
	/*REACT LIFECYCLE FUNCTIONS*/
	constructor(props) {
		super(props);
		console.log("constructor called");
		this.state = {
			test: true,
			counter: 1
		};
	}

	componentWillMount() {
		console.log("componentWillMount called");
		if(!this.props.users.length) {
			let houseId = this.props.user.houseId;
			this.props.userActionCreators.getUsers(houseId)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				alert("Error: ", error)
			})
		}

		if(!this.props.tasks.length) {
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

			})
			.catch(error => {

			});
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
