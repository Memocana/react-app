import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as loginStore from '../../store/login';
import { connect } from 'react-redux';
import './LoginPage.css';
import Login from '../../components/Login'
import { getAllHouses } from '../../const/endpoints';
import _ from 'lodash';

class LoginPage extends Component {
	constructor(props) {
        super(props);
        this.state = {
			name:'',
			surName:'',
			selectedHome:{"id":"","name":""}
        }
	}
	componentWillMount() {
		if(!this.props.allHouses || this.props.allHouses.length===0) {
			this.props.getAllHouses(true);
		}
	}
	login=()=>{
		const {name,surName,selectedHome}= this.state;
		this.props.registerAndLogin({firstname:name,lastname:surName,houseId:Number(selectedHome)});
	}
	handleChange=(name,value)=>{
		let newState= {...this.state};
		newState[name]=value;
		this.setState({...newState});
	}
  render() {
	if(_.get(this.props,"user.jwt")) {
		this.props.history.push('./')
	}
    return (
	<Login
		login={this.login}
		homes={this.props.allHouses}
		handleChange={this.handleChange}
		name={this.state.name}
		surName={this.state.surName}
		selectedHome={this.state.selectedHome} />
    );
  }
}
const mapStateToProps = (state) => {
    return {
		bingMapLoadedStatus: state.login.status,
		allHouses: state.login.allHouses,
		user:state.login.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        testStatus: (data) => {
            loginStore.testStatus(dispatch,data);
		},
		getAllHouses: () => {
            loginStore.getAllHouses(dispatch);
		},
		registerAndLogin:(user) =>{
			loginStore.registerAndLogin(dispatch,user);
		}
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);

