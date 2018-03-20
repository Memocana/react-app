import React, { PureComponent } from "react";

class App extends PureComponent {
	/*REACT LIFECYCLE FUNCTIONS*/
	constructor(props) {
		super(props);
		console.log("constructor called");
		this.state = {
			test: true
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
			<div>
				<h1>Öğrenci Evi</h1>
			</div>
		);
	}
}
export default App;
