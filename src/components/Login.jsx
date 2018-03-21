import React, { Component } from "react";
import  PropTypes  from  'prop-types';

class Login extends Component {
	componentWillReceiveProps(nextProps) {

	}

	render() {
		const { name, lastName, validation, selectedHome, houses } = this.props;
		return (
			<div className="login-page">
				<div className="title">
					<div className="bold">öğrenci</div>
					<div>evi</div>
				</div>
				<div className="sub-title">
					ev idaresi uygulaması
				</div>
				<div className="login-form">
					<div className="loader-container">
					</div>
					<input className={validation && !name ? "common-input-error" : "common-input"} type="text" placeholder="Ad" name='name' value={name} onChange={(e) => this.props.handleChange("name", e.target.value)} />
					{
						validation  && !name  &&
						<div  className="help-block">İsim girmelisiniz !</div>
					}
					<input className={validation && !lastName ? "common-input-error" : "common-input"} type="text" placeholder="Soyad" name='lastName' value={lastName} onChange={(e) => this.props.handleChange("lastName", e.target.value)} />
					{
						validation  && !lastName  &&
						<div  className="help-block">Soyadı Girmelisiniz !</div>
					}
					<select onChange={(e) => this.props.handleChange("selectedHome", e.target.value)}  className= {validation && !selectedHome ? "common-input-error" : "common-input"} >
						{!selectedHome  ?
							<option  selected  disabled>Ev Seçiniz</option>
							:  null}
						{houses.map((house,  i) => {
							return  <option  key={i}  selected={selectedHome.id  === house.id}  value={house.id}>{house.name}</option>
						})}
					</select>
					{
						validation  && !selectedHome  &&
						<div  className="help-block">Ev seçmelisiniz !</div>
					}
					<div className="login-button-container">
						<button onClick={this.props.login} className="login-button">GİRİŞ</button>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	handleChange: PropTypes.func,
	name: PropTypes.string,
	lastName: PropTypes.string,
	validation: PropTypes.bool,
	houses: PropTypes.array,
	selectedHome: PropTypes.string,
	login:PropTypes.func
}

export default Login;
