import React, { Component } from "react";
import logo from "../assets/login_logo.png";
import "../Login/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    // this.handleLogout = this.handleLogout.bind(this);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <img src={logo} class="col-md-3" height="240" alt="Splitwise"></img>
          <div className="col-md-4">
            <h4 style={{ color: "gray", fontSize: 19, marginBottom: 22 }}>
              WELCOME TO SPLITWISE
            </h4>
            <form>
              <div class="form-group inputLogin">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group inputLogin">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn">
                Log in
              </button>
              <p style={{marginTop: 10}}>
                Forgot your password? <a href="#">Click here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
