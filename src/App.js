import React, { Component } from 'react';

class App extends Component {
	/*REACT LIFECYCLE FUNCTIONS*/
	constructor(props) {
		super(props);
		console.log("CONSTRUCTER !!");
		this.state = {
			test:""
		};
	}
	componentWillMount() {
		console.log("componentWillMount !!");
	}
	componentDidMount() {
		console.log("componentDidMount !!");
	}
  render() {
    return (
			<div>----------ÖĞRENCİ EVİ----------</div>
    );
  }
}
export default App
