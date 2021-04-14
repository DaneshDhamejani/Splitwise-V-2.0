import React, { Component } from 'react'
import Nav from "react-bootstrap/Nav";
import axios from 'axios';
import {Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import history from 'history';
import backendServer from "../../webConfig";

var useremail = localStorage.getItem('user')

class LeftNavBar extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            usergroups: []
        }
    }

    // componentDidMount() {
        
        
    //     axios.get(`${backendServer}/odashboard/` + useremail).then((response) => {
            
    //         this.setState({usergroups: response.data});
            
    //     });
    // }
    render() {
        
        return (
            <div>
                 <div className="sidenavbar">
               <Nav defaultActiveKey="/home" className="flex-column">
               <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/addgroup">Add a new group</Nav.Link>
                <Nav.Link href="/profile">Your Profile</Nav.Link>
                <Nav.Link href={`/activity/${useremail}`} >Recent Activity</Nav.Link>
                <Nav.Link href={`/invitation/${useremail}`} >View Invitations</Nav.Link>
                {this.state.usergroups.map((user) => (
                <Nav.Link className="user" href={`/groups/${user.group_name}`}>
                {user.group_name}
                </Nav.Link>
                ))}
                
                </Nav>
                </div>
            </div>
        )
    }
}

export default withRouter(LeftNavBar);