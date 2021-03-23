import React, {Component} from "react";
import logo from "../assets/login_logo.png";
import "../Signup/Signup.css";
import axios from 'axios';
import {Redirect} from 'react-router';
import backendServer from "../../webConfig";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null,
            error: "",
            userCreated: false
        }


        this.handleuserCreate = this.handleUserCreate.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    componentWillMount() {
        this.setState({userCreated: false})
    }

    handleName = (e) => {
        this.setState({name: e.target.value})
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleUserCreate = (e) => {
        var headers = new Headers();
        e.preventDefault();
        var data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        console.log("Sending data")
        console.log("After Sending data")

        axios.defaults.withCredentials = true;
        axios.post(`${backendServer}/osignup`, data).then(response => {
            console.log("Status Code : ", response.status);
            console.log("Data Sent ", response.data);
            if (response.status === 200) {
                this.setState({userCreated: true})
                localStorage.setItem('user',this.state.email)

                window.location.reload();
            } 
            
            else if (response.status === 202) {
                this.setState({userCreated: false, error: response.data})

            }

        });

    }


    render() {
        var redirectVar = null;

        if (localStorage.getItem('user')) {
            console.log("Local storage found")
            redirectVar = <Redirect to="/dashboard"/>
        }
        return (
            <div className="container">
                <div className="row">
                    <img src={logo}
                        class="col-md-3"
                        height="240"
                        alt="Splitwise"></img>
                    <div className="col-md-4">
                        <h4 data-testid="SignupTest" style={
                            {
                                color: "gray",
                                fontSize: 19,
                                marginBottom: 22
                            }
                        }>
                            INTRODUCE YOURSELF
                        </h4>
                        <form>
                            <div className="form-group inputLogin">
                                <label for="exampleInputName"
                                    style={
                                        {fontSize: 30}
                                }>Hi there! My name is</label>
                                <input type="text" class="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter Full Name"
                                    onChange={
                                        this.handleName
                                    }/>
                            </div>
                            <div className="form-group inputLogin">
                                <label for="exampleInputEmail1">Here's my
                                    <b>email address:</b>
                                </label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                    onChange={
                                        this.handleEmail
                                    }/>
                            </div>
                            <div className="form-group inputLogin">
                                <label for="exampleInputPassword1">
                                    And here's my
                                    <b>password:</b>
                                </label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                    onChange={
                                        this.handlePassword
                                    }/>
                            </div>
                            <button type="submit" class="btn"
                                onClick={
                                    this.handleUserCreate
                            }>
                                Sign me up!
                            </button>
                            <p style={
                                {
                                    marginTop: 10,
                                    fontSize: 12
                                }
                            }>
                                <a href="#">By signing up, you accept the Splitwise Terms of Service.</a>
                            </p>
                        </form>
                    </div>
                </div>
                {redirectVar} </div>
        );
    }
}

export default Signup;
