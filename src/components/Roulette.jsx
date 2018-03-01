import React  from 'react';
import PropTypes from 'prop-types';

 const  Roulette = (props) => {
	return(
    <div>
      <div className="title-with-lines">
				<div className="line"></div>
				<div className="title bold">Ruleti Başlat</div>
				<div className="line"></div>
			</div>
			<div className="roulette-container">
				<div id="roulette">
          {props.users.map((user,i)=>(
            <div key={i} className="user">
            {user.firstname +" "+ user.lastname}
            </div>
          ))}
        </div>
				<div className="pointer"></div>
			</div>
			<button className="start-roulette" onClick={props.startRoulette}>Başlat</button>
    </div>
	);
}
Roulette.propTypes={
	startRoulette:PropTypes.func,
	homes:PropTypes.array
}
export default Roulette;
