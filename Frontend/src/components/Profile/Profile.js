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
            pic:"http://localhost:3001/untitled-3.jpg",
            selectedFile:null,
            profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
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
                <div className="myImage">
                <h5 className="heading">Add your Image</h5>
					<div className="img-holder">
						<img src={this.state.profileImg} alt="" id="img" className="img" />
					</div>
					<input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
					<div className="label">
          <label className="image-upload" htmlFor="input">
						
						Upload your Photo
					</label>
                </div> 
                </div>
        </center>
            
        )
    }
    }

