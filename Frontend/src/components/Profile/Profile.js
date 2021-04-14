import React, { Component } from 'react'
import "../Profile/Profile.css";
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";
import backendServer from "../../webConfig";




var useremail = localStorage.getItem('useremail')
var username=localStorage.getItem('username')

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail:useremail,
            username:username,
            profileImg: ''
        }
        
    }
    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }
    

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg)
        axios.post("http://localhost:4000/api/user-profile", formData, {
        }).then(res => {
            console.log(res)
        })
    }

    
    render() {
        return (
           <center>
                <div><h2>YOUR ACCOUNT</h2></div>
                <br></br>
                <div><h5>Your name:</h5></div>
                {this.state.username}
                <br></br>
                <br></br>
                <div><h5>Your email id:</h5>
                {this.state.useremail}</div>
                <br></br>
            <div className="ImgUpload">
            <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
            </div>
        </center>
            
        )
    }
    }

