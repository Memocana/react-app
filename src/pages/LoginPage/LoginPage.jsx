import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { testStatus } from '../../store/login';
import { connect } from 'react-redux';
import './LoginPage.css';
import Login from '../../components/Login'

class LoginPage extends Component {
	constructor(props) {
        super(props);
        this.state = {
			name:'',
			surname:'',
			selectedHome:{"id":"","name":""}
        }
    }
	login=()=>{
		this.props.testStatus(true);
	}
	handleChange=(name,value)=>{
		let newState= {...this.state};
		newState[name]=value;
		this.setState({...newState});
	}
  render() {
    return (
	<Login
		onClick={this.login}
		homes={[{
			"id": 1,
			"name": "houseA"
		}]} handleChange={this.handleChange}
		name={this.state.name}
		surname={this.state.surname}
		selectedHome={this.state.selectedHome} />
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

