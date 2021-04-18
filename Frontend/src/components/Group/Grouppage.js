import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { Button, Form, FormControl, ControlLabel } from "react-bootstrap";
import backendServer from "../../webConfig";



class Grouppage extends Component {
    constructor(props){
        super(props);
        this.state = {  
            groupname:this.props.history.location.pathname.substring(8),
            membernames:[],
            show:false,
            expensedescription:null,
            amount:0,
            billadded:false,
            error:"",
            allbillsinfo:[],
            useremail:localStorage.getItem("useremail"),
            memberemails:[],
            moneypendingtopay:0,
            moneytoget:0

        }
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleBillSubmit = this.handleBillSubmit.bind(this);
        

    }
    handleModalOpen = (e) => {
        this.setState({
            show : true
        })
      }
    handleModalClose = (e) => {
        this.setState({
            show : false
        })
      }
    handleDescription = (e) => {
        this.setState({
            expensedescription : e.target.value
        })
      }
    
    handleAmount = (e) => {
        this.setState({
            amount : e.target.value
        })
      }
    
    
    handleBillSubmit = (e) => {
        e.preventDefault();
        var numberofmembers=this.state.membernames.length


        console.log("Number of members:",numberofmembers)
        console.log("Group name:",this.state.groupname)
        console.log("Member names:",this.state.membernames)
        console.log("User email:",this.state.useremail)
        console.log("Member emails:",this.state.memberemails)
        console.log("Bill description:",this.state.expensedescription)
        console.log("Bill amount:",this.state.amount)
        

        var data = {
        billdescription: this.state.expensedescription,
        billamount: this.state.amount,
        groupname:this.state.groupname,
        numberofmembers:numberofmembers,
        membernames:this.state.membernames,
        useremail:this.state.useremail,
        memberemails:this.state.memberemails
        }

        console.log("Amount:",this.state.amount)
        axios.post(`${backendServer}/bills/addbill`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Data Sent ",response.data);
                if(response.status === 200){
                    this.setState({
                        billadded : true,
                    })
                }else if(response.status === 202){
                    this.setState({
                        billadded : false,
                        error : response.data
                    })
                    
                }
            
            });
            console.log("Successfully bill added:",this.state.billadded)
            
            
            axios.post(`${backendServer}/bills/getallbills`,data)
            .then(response => {
                console.log("Got response for get all bills")
                console.log(response.data.allbillsinfo)
                this.setState({
                    allbillsinfo:response.data.allbillsinfo,
                    show : false
                }) 
            });
            console.log("Bills info is here",this.state.allbillsinfo)
            
  }
      
    
    
        componentDidMount() {
            var data = {
                expensedescription: this.state.expensedescription,
                amount: this.state.amount,
                groupname:this.state.groupname,
                useremail:this.state.useremail
                }
            var dataforgroups={
                groupname:this.state.groupname
            }

        console.log("Got group name!",this.state.groupname)
         console.log(this.props.history.location.pathname.substring(8)) //Getting the exact apartment number
         axios.post(`${backendServer}/groups/getgroupmembers`,dataforgroups)
                    .then((response) => {
                        console.log("Inside app.get of frontend")
                        console.log("Got group members:",response.data.groupmembers)
                        this.setState({membernames: response.data.groupmembers});
                        console.log("Checking whether users in groups are there or not", this.state.membernames)

                    })

                    axios.post(`${backendServer}/bills/getallbills`,data)
                    .then(response => {
                        console.log("Got response for get all bills")
                        console.log(response.data.allbillsinfo)
                        this.setState({
                            allbillsinfo:response.data.allbillsinfo,
                            show : false
                    }) 
                    });
            console.log("Bills info is here",this.state.allbillsinfo)
                    

                    axios.post(`${backendServer}/groups/fetchemails`,data)
                    .then((response) => {
                        console.log("Getting user emails at frontend")
                        console.log(response.data.groupmemberemails)
                        this.setState({memberemails: response.data.groupmemberemails});
                        console.log("Checking whether users in groups are there or not", this.state.memberemails)

                    })





                    
                    
          
      }

    render() {
        
        
        return (
            <div>
                <center><h3>{this.state.groupname}</h3></center>
                <center><Button onClick={this.handleModalOpen}>Add an expense</Button></center>
                <div className="row">
                <div className="col-md-3">
                <b>Members of {this.state.groupname}:</b>
                {this.state.membernames.map((user) => (
                <ul><li>{user}</li></ul>
                
            ))}
            </div>
            <div className="col-md-3">
            <Modal show={this.state.show}>
                <Modal.Header>Add a bill</Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    onChange={this.handleDescription}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={this.handleAmount}
                  />
                  </Form.Group>
                 </Form>
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleModalClose}>
                    Close Bill
                </Button>
                <Button onClick={this.handleBillSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
                
                </Modal>
                {this.state.allbillsinfo.map((user) => (
                <ul><li><b>Description:</b>  {user.billdescription}<br></br><b>Amount:</b>  {user.billamount}</li></ul>
                ))}
    
            </div>
            </div>
            </div>
           
            
        )
    }
}

export default withRouter(Grouppage);
