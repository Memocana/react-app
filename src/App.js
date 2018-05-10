import React, { PureComponent } from "react";
import Counter from "../src/components/Counter"

class App extends PureComponent {
	/*REACT LIFECYCLE FUNCTIONS*/
	constructor(props) {
		super(props);
		console.log("constructor called");
		this.state = {
			test: true,
			counter: 0
		};
	}

	componentWillMount() {
		console.log("componentWillMount called");
	}
	componentDidMount() {
		console.log("componentDidMount called");
	}

	increase = () => {
		this.setState({counter:this.state.counter+1});
	}

	decrease = () => {
		this.setState({counter:this.state.counter-1});
	}


	render() {
		console.log("current state: ", this.state);
		return (
			<div>
				<h1>Öğrenci Evi</h1>
				<p>{this.state.counter}</p>
				<button onClick={()=>{this.increase()}}> Arttır </button>
				<Counter decrease={this.decrease} counter={this.state.counter}/>
			</div>
		);
	}
}
export default App;
