import React  from 'react';
import PropTypes from 'prop-types';

 const  Login = (props) => {
	const test=()=>{
		console.log(this.refs.name);
	}
	return(
	<div className="login-page">
		<div className="title">
			<div className="bold">öğrenci</div>
			<div>evi</div>
		</div>
		<div className="sub-title">
			ev idaresi uygulaması
		</div>
		<div className="login-form">
			<input className="common-input" type="text" value={props.name} placeholder="Ad" name='name' onChange={(e)=>{props.handleChange("name",e.target.value)}} />
			<input className="common-input" type="text" value={props.surname} placeholder="Soyad" name='surname' onChange={(e)=>{props.handleChange("surname",e.target.value)}} />
			<select onChange={(e)=>{props.handleChange("selectedHome",e.target.value)}} className="common-input">{!props.selectedHome.id ?
			<option selected disabled>Ev Seçiniz</option>
			: null}
				{props.homes.map((home)=>{
					return <option selected={props.selectedHome.id===home.id} value={home.id}>{home.name}</option>
				})}
			</select>
			<div className="login-button-container">
				<button onClick={test} className="login-button">GİRİŞ</button>
			</div>
		</div>
	</div>);
}
Login.propTypes={
	onClick:PropTypes.func,
	homes:PropTypes.array
}
export default Login;
