import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderMenu from '../../components/HeaderMenu';
import TaskList from '../../components/TaskList';

import _ from 'lodash';

class RoulettePage extends Component {

	state = {
		selectedTask: null
	}

	selectTask = (task) => {
		this.setState({ selectedTask: task });
	}

	render() {
		return (
			<div className="page-container">
				<HeaderMenu
					userName={_.get(this.props, "user.firstname") ? this.props.user.firstname : ""}
					pathName={this.props.location.pathname}
					redirect={(path) => { this.props.history.push(path) }} />
				<div className="page-content">
					<TaskList
						tasks={this.props.tasks}
						selectedTask={this.state.selectedTask}
						onTaskClick={this.selectTask}
						filter={true}
						loadingState={this.props.inProgressGetTasks}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.login.user,
		tasks: state.home.tasks,
		inProgressGetTasks: state.home.inProgressGetTasks
	};
};

export default withRouter(
	connect(mapStateToProps)(RoulettePage)
);
