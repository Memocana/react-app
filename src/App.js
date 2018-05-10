import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";

class App extends Component { 
	render() {
		return(
			<Switch>
				<Route exact path="/" component={LoginPage}/>
				<Route exact path="/home" component={HomePage}/>
				<Route path="*" component={LoginPage}/>
			</Switch>
		);
	}
}



export default App;