import React, { PureComponent } from "react";
import wildcardImage from "../../assets/img/404.png";
import "./WildCard.scss";

class WildCard extends PureComponent {
	render() {
		return <img className="wildcard-image" alt="" src={wildcardImage} />;
	}
}

export default WildCard;
