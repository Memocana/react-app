import React, { PureComponent } from "react";
import Child from "../../components/Child.jsx";

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

	increaseCounter = e => {
		this.setState({
			counter: this.state.counter + 1
		});
	};

	reduceCounter = () => {
		this.setState({
			counter: this.state.counter - 1
		});
	};

	render() {
		console.log("current state: ", this.state);
		return (
			<div>
				<h1>Öğrenci Evi</h1>
				<button onClick={e => this.increaseCounter(e)}>
					Öğrenci Sayısını Arttır
				</button>
				<Child
					counter={this.state.counter}
					reduceCounter={this.reduceCounter}
				/>
			</div>
		);
	}
}
export default HomePage;
