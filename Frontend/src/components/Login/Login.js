import React, { Component } from "react";
import logo from "../assets/login_logo.png";
import "../Login/Login.css";
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import backendServer from "../../webConfig";



class Login extends Component {
  constructor(props) {
    super(props);
    // this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      email: null,
      password: null,
      authFlag: false,
      //emailerror:"",
      //passsworderror:"", 
  }
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitOwnerLogin = this.submitOwnerLogin.bind(this);
    
  }

emailChangeHandler = (e) => {
  this.setState({
      email : e.target.value
  })
}
passwordChangeHandler = (e) => {
  this.setState({
      password : e.target.value
  })
}

submitOwnerLogin = (e) => {
  var headers = new Headers();
  console.log("Inside submitowner")
  e.preventDefault();
  const data = {
      email : this.state.email,
      password : this.state.password
  }
  axios.defaults.withCredentials = true;

  axios.post(`${backendServer}/ologin`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Data : ",response.data);
                if(response.status === 200){
                  this.setState({
                    authFlag : true
                    
                })
                    localStorage.setItem('user',this.state.email)
                    window.location.reload();
              }else{
                this.setState({
                  authFlag : false,

                })
              }
          
          });
          
  }


  render() {
    var redirectVar = null;
    
    if(localStorage.getItem('user')){
          console.log("Local storage found")
          redirectVar = <Redirect to= "/dashboard"/>
        }
    return (
     <div className="container">
      {redirectVar}
        <div className="row">
          <img src={logo} class="col-md-3" height="240" alt="Splitwise"></img>
          <div className="col-md-4">
            <h4 data-testid="LoginTest" style={{ color: "gray", fontSize: 19, marginBottom: 22 }}>
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
                 onChange = {this.emailChangeHandler}
                 //errorText={this.state.emailerror}
                />
              </div>
              <div class="form-group inputLogin">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange = {this.passwordChangeHandler}
                 // errorText={this.state.passsworderror}
                />
              </div>
              <button onClick={this.submitOwnerLogin} class="btn">
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
