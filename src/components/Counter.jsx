import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  render() {
    return(
      <div>
        <p>Counter Page</p>
        <p>{this.props.counter}</p>
        <button onClick={()=>{this.props.decrease()}}> Azalt </button>
      </div>
    );
  }
}

Counter.propTypes = {
  decrease:PropTypes.func,
  counter:PropTypes.number
}

export default Counter;