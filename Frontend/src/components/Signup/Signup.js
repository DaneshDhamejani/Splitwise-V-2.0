import React, { Component } from "react";
import logo from "../assets/login_logo.png";
import "../Signup/Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <img src={logo} class="col-md-3" height="240" alt="Splitwise"></img>
          <div className="col-md-4">
            <h4 style={{ color: "gray", fontSize: 19, marginBottom: 22 }}>
              INTRODUCE YOURSELF
            </h4>
            <form>
              <div class="form-group inputLogin">
                <label for="exampleInputName" style={{fontSize: 30}}>Hi there! My name is</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                  placeholder="Enter Full Name"
                />
              </div>
              <div class="form-group inputLogin">
                <label for="exampleInputEmail1">Here's my <b>email address:</b></label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group inputLogin">
                <label for="exampleInputPassword1">
                  And here's my <b>password:</b>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn">
                Sign me up!
              </button>
              <p style={{ marginTop: 10, fontSize: 12 }}>
                 <a href="#">By signing up, you accept the Splitwise Terms of Service.</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
