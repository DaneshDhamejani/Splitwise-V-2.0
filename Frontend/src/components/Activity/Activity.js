import React, { Component } from 'react'
import axios from 'axios';
import backendServer from "../../webConfig";


export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail:localStorage.getItem('useremail'),
            username:"",
            allbillinfo:[],
            error:""
        }
        
    }

    componentDidMount(){
        console.log(this.state.myemail);
        var data = {
            useremail: this.state.useremail
        }
       
        axios.post(`${backendServer}/bills/recentactivity`,data)
                    .then((response) => {
                        if (response.status === 200) 
                        {
                            console.log(response.data.allbills)
                            let allresponse=response.data.allbills
                            
                            this.setState({allbillinfo: allresponse});
                            console.log(this.state.allbillinfo)
                        } 
                        else if (response.status === 400) 
                        {
                            this.setState({error:response.data});
            
                        }
                    })
                    
                    

    }


    
    render() {
        return (
            <div>
                {this.state.allbillinfo.map((user) => (
                <ul><li><b>{user.billcreatedby}</b> created a bill in <b>{user.groupname}</b> named <b>{user.billdescription}</b> of amount <b>$ {user.billamount}</b> on <b>{user.billdate}</b></li></ul>
                ))}
            </div>
        )
    }
}
