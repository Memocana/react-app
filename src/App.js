import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home.jsx";
import LoginPage from "./pages/Login/Login.jsx";
import WildCard from "./pages/WildCard/WildCard.jsx";

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={LoginPage} />
				<Route exact path="/home" component={HomePage} />
				<Route path="*" component={WildCard} />
			</Switch>
		);
	}
}
export default App;
