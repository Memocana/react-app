import React, { Component } from "react";
import PropTypes from 'prop-types';


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
					<input type="text" placeholder="Ad" name='name' value={this.props.name} onChange={e => this.props.handleChange(e.target.value, 'name')}/>
					<input type="text" placeholder="Soyad" name='surname' value={this.props.surname} onChange={e => this.props.handleChange(e.target.value, 'surname')}/>
					<select onChange={e => this.props.handleChange(e.target.value, 'home')}>
					{ this.props.selectedHome ? null : 
						<option selected disabled>Ev Seçiniz</option>
					}
					{
						this.props.allHouses.map((house, i) => {
							return (<option key={i} selected={this.props.selectedHome.id === house.id} value={house.id}>{house.name}</option>)
						})
					}
					</select>
					<div className="login-button-container">
						<button className="login-button">GİRİŞ</button>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
  name: PropTypes.String,
  surname: PropTypes.String,
  selectedHome: PropTypes.String

}

export default Login;
