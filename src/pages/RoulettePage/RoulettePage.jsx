import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderMenu from '../../components/HeaderMenu';
import _ from 'lodash';

class RoulettePage extends Component {
  render() {
    return (
			<div className="page-container">
				<HeaderMenu
					userName={_.get(this.props,"user.firstname") ? this.props.user.firstname : ""}
					pathName={this.props.location.pathname}
					redirect={(path)=>{this.props.history.push(path)}} />
					<div className="page-content">
						<h3>
							TEST ROULETTE PAGE
						</h3>
				</div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		user: state.login.user,
	};
};

export default withRouter(
	connect(mapStateToProps)(RoulettePage)
);
