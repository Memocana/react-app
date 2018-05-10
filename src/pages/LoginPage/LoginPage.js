import React, { PureComponent } from "react";
import Child from "../../components/Child.jsx";

class LoginPage extends PureComponent {
  /*REACT LIFECYCLE FUNCTIONS*/
  render() {
    console.log("current state: ", this.state);
    return (
      <div>
        <h1>Login Page</h1>
        <button onClick={()=>{this.props.history.push('./home')}}> Go To Home </button>
      </div>
    );
  }
}
export default LoginPage;
