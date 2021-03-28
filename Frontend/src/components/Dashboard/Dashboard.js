import React, {Component} from "react";
import logo from "../assets/login_logo.png";
import axios from 'axios';
import {Redirect} from 'react-router';
import Nav from "react-bootstrap/Nav";
import "../Dashboard/dashboard.css";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import {Button,Form} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import Select, {components} from 'react-select';
import backendServer from "../../webConfig";

var redirectVar = null

var useremail = localStorage.getItem('user')


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail: useremail,
            totaliowe: 0,
            totaliamowed: 0,
            username: "",
            totalbalance: 0,
            alluserstats:[],
            userlistoptions:[],
            nametosettleup:"",
            emailtosettle:"",
            error:"",
            alloverallstats:[],
            owearray:[],
            owedarray:[],
            userobjectsettle:[],
            useramount:0
        }
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSettleUpEmail = this.handleSettleUpEmail.bind(this);
        this.submitSettleUp = this.submitSettleUp.bind(this);
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
    handleSettleUpEmail = (e) => {
        let user=JSON.parse(e.target.value)
        this.setState({
            emailtosettle : user.email,
            useramount : user.amount
        })
        
        
    }

    submitSettleUp = (e) => {
        e.preventDefault();
        //console.log("Getting name to settle up:",this.state.nametosettleup)
        var data = {
            //nametosettle:this.state.nametosettleup,
            useremail,
            settlemail:this.state.emailtosettle,
            useramount:this.state.useramount

            }
            
        
        // axios.post("http://localhost:3001/emailtosettle",data)
        //     .then((response) => {
        //         console.log("Inside getting settle up email of frontend")
        //         console.log("Got email ID of the settler",response.data[0].email)
        //         this.setState({emailtosettle: response.data[0].email});
        // getFinalAmounts(response.data[0].email);

        //     })
        
        //const getFinalAmounts = async (email) => {
      /*  await */ axios.post(`${backendServer}/settleup`,data)
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
        }
        

    
    


     componentDidMount() {

        var data = {
            useremail: this.state.useremail
        }

        axios.post(`${backendServer}/getnamefordashboard`, data).then((response) => {
            console.log("Got user name on Dashboard")
            console.log("Printing response:", response.data[0].name)
            this.setState({username: response.data[0].name});
            console.log("Name for dashboard", this.state.username)

        })
//         axios.post(`${backendServer}/getalluserstats11`, data).then((response) => {
//             console.log("Got over all stats")
//             this.setState({alloverallstats: response.data});
//             console.log("Printing updated state",this.state.alloverallstats)
//             var owedarray=[]
//             var owearray=[]
//             var temparray=[]
//             temparray=this.state.alloverallstats
//             console.log(temparray)
//             console.log(this.state.alloverallstats[0])
//             for(var i=0;i<temparray.length;i++)
//             {
//                 if(temparray[i].receiver!=null)
//                 {
//                     owedarray.push({ "name" :temparray[i].receiver,"amount" : temparray[i].he_owes_me})
//                 }
//                 else if(temparray[i].sender!=null)
//                 {
//                     owearray.push({ "name" :temparray[i].sender,"amount" : temparray[i].he_has_paid})
//                 }

//             }

    
//       let TransactionMap = new Map();
//       for (let i = 0; i < owearray.length; i++) {
//         TransactionMap.set(owearray[i].name,owearray[i].amount);
//       }
//       console.log(TransactionMap);

//       for(let i=0;i<owedarray.length;i++){
        
//         if(TransactionMap.has(owedarray[i].name)){
          
//           TransactionMap.set(owedarray[i].name,TransactionMap.get(owedarray[i].name)-owedarray[i].amount);
//         }else{
//           TransactionMap.set(owedarray[i].name,0-owedarray[i].amount);
//         }
//         }
        
      
      
//       console.log(TransactionMap);

//       const oweArray=[];
//       const areOwedArray=[];

//       TransactionMap.forEach((value, key) => {
//         console.log(value);
//         console.log(key);
//         if(value>0){
          
//           oweArray.push({name:key,amount:value});
//         }else if(value<0){
//           areOwedArray.push({name: key,amount:(0-value)});
//         }
//     })
//     this.setState({
//         Iowe : oweArray,
//         Iowed: areOwedArray
//     })

//     var totalowe=0;
//     console.log("State of you owe is here",this.state.Iowe)
//     for(var i=0;i<this.state.Iowe.length;i++)
//     {
//         totalowe=totalowe+Math.abs(this.state.Iowe[i].amount)
//     }
//     console.log("Total amount I owe",totalowe)
   
    
//     var totalowed=0;
//     console.log("State of what I am owed is here",this.state.Iowed)
//     for(var i=0;i<this.state.Iowed.length;i++)
//     {
//         totalowed=totalowed+this.state.Iowed[i].amount
//     }
//     console.log("Total amount I am owed",totalowed)

//     var total_balance=totalowed-totalowe
//     this.setState({
//         totaliowe: totalowe,
//         totaliamowed:totalowed,
//         totalbalance:total_balance
//     });


// console.log("Final state Whom I owe Printing I owe:",this.state.Iowe);
// console.log("Final state Who owe me:",this.state.Iowed);



            //  })
             
             axios.post(`${backendServer}/getalluserstats`, data).then((response) => {
                var tempowedarray=[]
                var tempowearray=[]
                console.log("Got over all stats")
                this.setState({alloverallstats: response.data});
                console.log("Printing all stats at the frontend",this.state.alloverallstats)
                for(var i=0;i<this.state.alloverallstats.length;i++)
                {
                    console.log(this.state.alloverallstats[i].overallamount)
                    if(this.state.alloverallstats[i].overallamount>0)
                    {
                        tempowedarray.push({ "email" :this.state.alloverallstats[i].emailee,"amount" : this.state.alloverallstats[i].overallamount})
                    }
                    else if(this.state.alloverallstats[i].overallamount<0)
                    {
                        tempowearray.push({ "email" :this.state.alloverallstats[i].emailee,"amount" : this.state.alloverallstats[i].overallamount})  
               
                    }
                }
                console.log("Tempowearray",tempowearray)
                console.log("Tempowedarray",tempowedarray)

                var totalowe=0
                var totalowed=0
                var total_balance=0
                for(var i=0;i<tempowearray.length;i++)
                {
                    totalowe=totalowe+Math.abs(tempowearray[i].amount)
                }
                for(var i=0;i<tempowedarray.length;i++)
                {
                    totalowed=totalowed+tempowedarray[i].amount
                }

                var total_balance=totalowed-totalowe
                console.log("Total balance",total_balance)
                this.setState({
                            totaliowe: totalowe,
                            totaliamowed:totalowed,
                            owearray: tempowearray,
                            owedarray:tempowedarray,
                            totalbalance:total_balance
                        });
                    

                console.log("Mujhe itna paisa dena hai",tempowearray)
                console.log("Mujhe itna paisa lena hai",tempowedarray)
                console.log("State of owe array",this.state.owearray)
                console.log("State of owed array",this.state.owedarray)
                


       
        
    
})
     }

    render() {
         console.log("User object settle:",this.state.emailtosettle)
         console.log("Email to settle danesh:",this.state.emailtosettle)
         console.log("User amount danesh:",this.state.useramount)
         console.log("Overall user object:",this.state.userobjectsettle)
        
        if (!localStorage.getItem('user')) 
            redirectVar = <Redirect to="/login"/>


        
        return (
            <div>
                <div name="dashboarddisplay">
                    <center>
                        <h3 data-testid="Dashboard">{
                            this.state.username
                        }'s Dashboard</h3>
                    </center>
                    <br></br>
                   <center><Button onClick={this.handleModalOpen}>Settle up</Button></center>
                   <Modal show={this.state.show}>
                <Modal.Header>Settle up</Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                <Form.Label>Select Who You Want to Settle Up With :</Form.Label>
                <Form.Control
                  as="select"
                onChange={this.handleSettleUpEmail}
                >
                  <option selected disabled hidden>
                    Select one person
                  </option>
                  {this.state.owearray.map((user) => (
                    <option value={JSON.stringify(user)}>
                      {user.email}: &nbsp; {user.amount}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
                 </Form>
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleModalClose}>
                    Close Bill
                </Button>
                <Button onClick={this.submitSettleUp}>
                    Save Changes
                </Button>
            </Modal.Footer>
                
                </Modal>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    <div ClassName="myNavBar">
                        <LeftNavBar/>
                        </div>

                    </div>
                    <div className="col-md-3">
                        <b>Total balance</b>
                        <div><b>$ </b>{this.state.totalbalance}</div>
                    </div>
                    <div className="col-md-3">
                        <b>You owe</b>
                        <div><b>$ </b>{Math.abs(this.state.totaliowe)}
                        </div><br></br>
                        <div>
                        {this.state.owearray.map((user) => (
                <ul><li>You owe <b>{user.email}</b> <b>$</b>{Math.abs(user.amount)}</li></ul>
                ))}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <b>You are owed</b>
                        <div><b>$ </b>{this.state.totaliamowed}</div><br></br>
                        <div>
                        {this.state.owedarray.map((user) => (
                <ul><li><b>{user.email}</b> owes you <b>$</b>{user.amount}</li></ul>
                ))}
                        </div>
                    </div>

                </div>
                {redirectVar} </div>
        )
    }

}
export default Dashboard;
