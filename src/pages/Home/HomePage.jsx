import React, { PureComponent } from "react";
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
	}

	componentDidMount() {
		console.log("componentDidMount called");
	}

	render() {
		console.log("current state: ", this.state);
		return (
			<div className="page-container">
				<h1>Öğrenci Evi -- Home Page</h1>
				<div className="page-content">
					<UserList />
					<TaskList />
				</div>
			</div>
		);
	}
}
export default HomePage;
