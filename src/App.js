import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import WildCard from "./pages/WildCard/WildCard.jsx";
import "bootstrap/dist/css/bootstrap.css";

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
