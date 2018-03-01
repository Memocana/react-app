import React  from 'react';
import PropTypes from 'prop-types';

 const  HeaderMenu = (props) => {
	return(
		<div>
			<div className="mobile-header">
				<a className="title" href="/home">
					<div className="bold">öğrenci</div>
					<div>evi</div>
				</a>
				<div className="welcome-text">
					Hoşgeldiniz&nbsp;<span className="bold">{props.userName}</span>!
				</div>
			</div>
			<div className="navigation-links">
				<div className="title-and-welcome-text">
					<a className="title" href="/home">
						<div className="bold">öğrenci</div>
						<div>evi</div>
					</a>
					<div className="welcome-text">
						Hoşgeldiniz&nbsp;<span className="bold">{props.userName}</span>!
					</div>
				</div>
				<div className="navigation-links-inner">
					<a className={"navigation-link home-link" + (props.pathName === "/home" ? " active" : "")} onClick={()=>props.redirect("/home")}>
						<div className="icon"></div>
						<div className="header-label">Ana Sayfa</div>
					</a>
					<a className={"navigation-link roulette-link" + (props.pathName === "/roulette" ? " active" : "")} onClick={()=>props.redirect("/roulette")}>
						<div className="icon"></div>
						<div className="header-label">İş Ruleti</div>
					</a>
					<a className="navigation-link logout-link" href="/">
						<div className="icon"></div>
						<div className="header-label">Çıkış</div>
					</a>
				</div>
			</div>
		</div>
	);
}
HeaderMenu.propTypes={
	userName:PropTypes.string,
	pathName:PropTypes.string,
	redirect: PropTypes.func
}
export default HeaderMenu;
