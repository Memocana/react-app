import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { testStatus } from '../store/login';
import { connect } from 'react-redux';

class LoginPage extends Component {
	test=()=>{
		this.props.testStatus(true);
	}
  render() {
    return (
		<div className="login">
	   {"loginnnnnnnn"}
	   <button onClick={this.test} >Redux</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        bingMapLoadedStatus: state.login.status,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        testStatus: (data) => {
            return testStatus(dispatch, data);
        },
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);

