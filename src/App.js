import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";


class App extends Component {

  render() {
    return (
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/terminal" component={LoginPage} />
			</Switch>

    );
  }
}
export default App
