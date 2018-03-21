import React, { Component } from "react";

class Login extends Component {
	componentWillReceiveProps(nextProps) {

	}

	render() {
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
					<input type="text" placeholder="Ad" name='name' />
					<input type="text" placeholder="Soyad" name='surName' />
					<select>
						<option selected disabled>Ev Seçiniz</option>
					</select>
					<div className="login-button-container">
						<button className="login-button">GİRİŞ</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
