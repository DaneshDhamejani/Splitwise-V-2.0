import React, { Component } from 'react'
import "../Profile/Profile.css";
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";
import backendServer from "../../webConfig";




var useremail = localStorage.getItem('user')

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail:useremail,
            username:"",
            profileImg: ''
        }
        
    }
    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            this.setState({profileImg: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
    
  
    componentDidMount() {
        var data = {
            useremail: this.state.useremail
        }
        
        axios.post(`${backendServer}/profile`,data)
                    .then((response) => {
                        console.log("profile page of frontend")
                        console.log(response.data)
                         this.setState({username: response.data[0].name});
                         console.log("Checking whether username are there or not", this.state.username)

                    })
        // axios.post("http://localhost:3001/profilepic"+useremail,data)
        //             .then((response) => {
        //                 console.log("profile page of frontend")
        //                 console.log(response.data)
        //                 // this.setState({username: response.data[0].name});
        //                 // console.log("Checking whether username are there or not", this.state.username)

        //             })

    }
    fileSelectedHandler=(e)=>{
        console.log(e.target.files[0])
    }
    fileUploadHandler=(e)=>
    {

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

