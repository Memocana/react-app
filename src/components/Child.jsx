import React, { Component } from "react";

class Child extends Component {
	componentWillReceiveProps(nextProps) {
		console.log("previous counter: ", this.props.counter);
		console.log("next counter: ", nextProps.counter);
	}

	render() {
		return (
			<div>
				<p>{this.props.counter}</p>
				<button onClick={e => this.props.reduceCounter(e)}>
					Öğrenci Sayısını Azalt
				</button>
			</div>
		);
	}
}

export default Child;
