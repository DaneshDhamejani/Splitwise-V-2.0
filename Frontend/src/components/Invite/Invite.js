import React, { Component } from 'react'
import axios from 'axios';
import backendServer from "../../webConfig";
import {
    Button,Grid,Row,
    Col,
    ListGroup,
    Form,
    Card,
    Modal,
  } from "react-bootstrap";
  import Nav from "react-bootstrap/Nav";


  var useremail = localStorage.getItem('user')


export default class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allusergroups:[],
            currentgroupname:""
        }
        this.handleGroupSelect = this.handleGroupSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalSubmit=this.handleModalSubmit.bind(this);
        }
        
          handleModalClose = (e) => {
            this.setState({
                show : false
            })
          }

          handleGroupSelect= (e)=>
          {
            this.setState({
                currentgroupname : e.currentTarget.value,
                show:true
            })
            console.log("Printing current group",this.state.currentgroupname)
          }
          
        handleModalSubmit= (e)=>
          {
            var selectedgroupname="";
            var data = {
                useremail:useremail,
                selectedgroupname:this.state.currentgroupname
            }
            console.log("State:",this.state.currentgroupname)
            console.log("Selected group name:",data.selectedgroupname)
            console.log("Printing user email:",useremail)
             axios.post(`${backendServer}/acceptinvite`,data)
            .then((response) => {
                console.log("Status Code : ",response.status);
                console.log("Data Sent ",response.data);
                if(response.status === 200){
                    
                    this.setState({
                        show : false,
                    })
                    window.location.reload()
                }else if(response.status === 202){
                    this.setState({
                        error : response.data
                    })
                    
                }
                
                
            })
            this.setState({
                show : false
            })
          }

        componentDidMount() {

            var data = {
                useremail:useremail
            }
            
            axios.post(`${backendServer}/getallusergroups`, data).then((response) => {
                console.log("Got all groups in which user is a part of on frontend",response.data)
                var grouplist=[]
                for(var i=0;i<response.data.length;i++)
                {
                    grouplist.push(response.data[i].group_name)
                }
                console.log(grouplist)
                this.setState({
                    allusergroups : grouplist
                })
                console.log("Printing latest state:",this.state.allusergroups)
    
            })
        }
    
    render() {
        console.log("Current group selected",this.state.currentgroupname)
        return (
            <div>
              <center><h2>Click on the following groups to accept invite</h2></center>
              <br></br>
              <br></br>
              <br></br>
              {this.state.allusergroups.map((user) => (
                <center>
                <Button className="user" variant="warning" /*href={`/groups/${user}`}*/ value={user} onClick={this.handleGroupSelect}>
                {user}
                </Button>
                </center>
                ))}
                <Modal show={this.state.show} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>INVITATION</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Accept the invite to this group
                      {/* {localStorage.getItem("selectedGroupName")} */}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        // variant="primary"
                        // value={item}
                        // type="submit"
                         onClick={this.handleModalSubmit}>
                        ACCEPT
                      </Button>
                    </Modal.Footer>
                  </Modal>
            </div>
        )
    }

}