import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
	redirectHome=()=>{
		this.props.history.push('./login');
	}
  render() {
    return (
		<div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		<button onClick={this.redirectHome} >Redirect</button>
      </div>
    );
  }
}

export default withRouter(HomePage);
