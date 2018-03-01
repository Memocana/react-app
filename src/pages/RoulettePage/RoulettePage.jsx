import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as taskReducer from '../../reducers/task';
import * as userReducer from '../../reducers/user';
import HeaderMenu from '../../components/HeaderMenu';
import TaskList from '../../components/TaskList';
import Roulette from '../../components/Roulette';
import GeneralModal from '../../components/GeneralModal'
import './RoulettePage.scss';
import _ from 'lodash';

class RoulettePage extends Component {

	state = {
		selectedTask: null,
		ITERATION: 10,
	}

	/* REACT LIFECYCLE FUNCTIONS */

	componentWillMount() {
		if(!JSON.parse(localStorage.getItem('user'))) {
			this.props.history.push('/');
		}else {
			let houseId = _.get(this.props, "user.houseId");
			if (_.isEmpty(this.props.users)) {
				this.props.getUsersByHouseId(houseId);
			}
			if (_.isEmpty(this.props.tasks)) {
				this.props.getTasksByHouseId(houseId);
			}
		}
	}

	/***********************************/

	selectTask = (task) => {
		this.setState({ selectedTask: task });
	}

	closeModal = () => {
		this.setState({showModal:false});
	};

	startRoulette = () => {
		if(!this.state.selectedTask){
			this.setState({
				showModal: true,
				modalTitle: 'Hata',
				modalBody: 'Lütfen işi seçiniz.'
			});
			return;
		}
		let decisions = {
			iteration : this.getRandomNumberByRange(1, this.state.ITERATION),
			user : this.getRandomNumberByRange(0, this.props.users.length)
		};

		let selected = {
			item : (decisions.iteration * this.props.users.length) + decisions.user,
			user : this.props.users[decisions.user]
		};

		this.props.updateTask({"done": false, "userId": selected.user.id}, this.state.selectedTask.id);

		document.getElementById("roulette").classList.remove("reset");
		document.getElementById("roulette").classList.add("active");
		document.getElementById("roulette").style.marginTop = -1 * 60 * selected.item + 120 + "px";

		setTimeout(function(){
			this.setState({
				showModal: true,
				modalTitle: 'Tebrikler',
				modalBody: "İhale " + selected.user.firstname + " " + selected.user.lastname + " adlı kişiye kalmıştır.",
				selectedTask:null
			});
			this.props.getTasksByHouseId(this.props.user.houseId);
			document.getElementById("roulette").classList.remove("active");
			document.getElementById("roulette").classList.add("reset");
			document.getElementById("roulette").removeAttribute("style");
		}.bind(this),6500);
  }

  getRandomNumberByRange = (min, max) => {
  	return parseInt(Math.random() * (max - min) + min);
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
					<Roulette users={this.props.userList} startRoulette={()=>this.startRoulette()}/>
					<GeneralModal show={this.state.showModal}
						title={this.state.modalTitle} body={this.state.modalBody}
						handleClose={() => this.closeModal()} />
				</div>
			</div>
		);
	}
}

/*CONNECTION TO REDUX STORE RELATED FUNCTIONS */
const mapStateToProps = (state) => {
	let userList = [];
	const ITERATION = 10;
	for(let i = 0; i < ITERATION; i++) {
		userList = _.concat(userList, state.user.users);
	}
	return {
		user: state.login.user,
		users: state.user.users,
		userList: userList,
		tasks: state.task.tasks,
		inProgressGetTasks: state.task.inProgressGetTasks
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUsersByHouseId: (houseId) => {
			userReducer.getUsersByHouseId(dispatch, houseId);
		},
		getTasksByHouseId: (houseId) => {
			taskReducer.getTasksByHouseId(dispatch, houseId);
		},
		updateTask: (data, taskID) => {
			taskReducer.updateTask(dispatch, data, taskID);
		}
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(RoulettePage)
);
