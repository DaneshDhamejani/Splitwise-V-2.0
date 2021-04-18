import React, {Component} from "react";
import logo from "../assets/login_logo.png";
import axios from 'axios';
import {Redirect} from 'react-router';
import Nav from "react-bootstrap/Nav";
import "../Dashboard/dashboard.css";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import {Button, Form} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import Select, {components} from 'react-select';
import backendServer from "../../webConfig";
import bg_image from "../assets/splitwise_home.png";
import bg_image1 from "../assets/splitwise_home_2.png";
import bg_image2 from "../assets/splitwise_home_3.png";

var redirectVar = null




class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail: localStorage.getItem('useremail'),
            username: "",
            totaliowe: 0,
            totaliamowed: 0,

            totalbalance: 0,
            alluserstats: [],
            userlistoptions: [],
            nametosettleup: "",
            emailtosettle: "",
            error: "",
            alloverallstats: [],
            owearray: [],
            owedarray: [],
            userobjectsettle: [],
            useramount: 0
        }
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSettleUpEmail = this.handleSettleUpEmail.bind(this);
        this.submitSettleUp = this.submitSettleUp.bind(this);
    }
    handleModalOpen = (e) => {
        this.setState({show: true})
    }
    handleModalClose = (e) => {
        this.setState({show: false})
    }
    handleSettleUpEmail = (e) => {
        let user = JSON.parse(e.target.value)
        this.setState({emailtosettle: user.email, useramount: user.amount})


    }

    submitSettleUp = (e) => {
        e.preventDefault();
        // console.log("Getting name to settle up:",this.state.nametosettleup)
        var data = { // nametosettle:this.state.nametosettleup,
            useremail:this.state.useremail,
            settlemail: this.state.emailtosettle,
            useramount: this.state.useramount

        }


        // axios.post("http://localhost:3001/emailtosettle",data)
        //     .then((response) => {
        //         console.log("Inside getting settle up email of frontend")
        //         console.log("Got email ID of the settler",response.data[0].email)
        //         this.setState({emailtosettle: response.data[0].email});
        // getFinalAmounts(response.data[0].email);

        //     })

        // const getFinalAmounts = async (email) => {
        /*  await */
        
        axios.post(`${backendServer}/settleup`, data).then((response) => {
            console.log("Status Code : ", response.status);
            console.log("Data Sent ", response.data);
            if (response.status === 200) {

                this.setState({show: false})
                window.location.reload()
            } else if (response.status === 202) {
                this.setState({error: response.data})

            }


        })
    }


      componentDidMount() {

        var data = {
            useremail: this.state.useremail
        }
        console.log("Email at frontend:", this.state.useremail)
         axios.post(`${backendServer}/users/getnamefordashboard`, data).then((response) => {
            console.log("Got response from backend", response)
            console.log("Got user name on Dashboard:", response.data.username[0].name)
            this.setState({username: response.data.username[0].name});
            console.log("Name found here:", response.data.username[0].name)
            localStorage.setItem("username", response.data.username[0].name)
            
            
            
            

        })
            
        }
        
        
    


    render() {
       
        return (
            <div>
                <center>
                    <h3>{
                        this.state.username
                    }'s Dashboard</h3>
                </center>
                <div className="row">
                    <div className="col-md-3">
                        <div ClassName="myNavBar">
                            <LeftNavBar/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;
