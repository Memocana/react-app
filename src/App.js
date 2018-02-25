import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RoulettePage from "./pages/RoulettePage/RoulettePage";
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {

  render() {
    return (
			<Switch>
				<Route exact path="/" component={LoginPage} />
				<Route path="/home" component={HomePage} />
				<Route path="/roulette" component={LoginPage} />
			</Switch>

    );
  }
}
export default App
