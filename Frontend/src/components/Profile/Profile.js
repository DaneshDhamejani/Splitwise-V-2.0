import React, { Component } from 'react'
import "../Profile/Profile.css";
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";
import backendServer from "../../webConfig";
import defaultpic from "../assets/default.jpg";




var useremail = localStorage.getItem('useremail')
var username=localStorage.getItem('username')

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail:useremail,
            username:username,
            // selectedFile: '',
            selectedFile: defaultpic
        }
        // this.onFileChange=this.onFileChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.imageHandler=this.imageHandler.bind(this)
    }
    // onFileChange=(e)=> {
    //     e.preventDefault()
    //     const file=e.target.files[0]
    //     console.log("Printing file",file)
    //     this.setState({ file: file}, () => 
    //     console.log("View state",this.state.file));
        
        

    // }
    imageHandler = (e) => {
        console.log(e.target.files[0])
        this.setState({selectedFile:e.target.files[0]})
        
    }

    onSubmit=(e, file)=> {
        
        const formData = new FormData()
        console.log("Inside submit data!")
        console.log("Got state of file:",file)
        formData.append('file',file)
        axios.post(`${backendServer}/upload/imageupload`,formData).then((res) => {
            if(res.status === 200)
            {
                console.log("Image uploaded on S3!")
            }
            else
            {
                console.log("There was some error!")
            }
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
                <div className="myImage">
                <h5 className="heading">Add your Image</h5>
                        <div className="form-group">
                            <input type="file" id="file" accept=".png, .jpg, .jpeg"  onChange={this.imageHandler} />
                        </div>
                        <div className="img-holder">
                        {console.log(this.state.selectedFile)}
						<img src={this.state.selectedFile} alt="" id="img" className="img" />
					</div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="button" onClick={(e) => { this.onSubmit(e, this.state.selectedFile)  }}>Upload</button>
                        </div>
                    
                </div>
                </div>
                
                </center>
        )
    }
    }

