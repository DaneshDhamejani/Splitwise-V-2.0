import React, { Component } from 'react'
import axios from 'axios';
import backendServer from "../../webConfig";

var useremail = localStorage.getItem('user')

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myemail:useremail,
            username:"",
            allbillinfo:[],
            error:""
        }
        
    }

    componentDidMount(){
        console.log(this.state.myemail);
        var data = {
            email: this.state.myemail
        }
       
        axios.post(`${backendServer}/activity`,data)
                    .then((response) => {
                        if (response.status === 200) 
                        {
                            console.log(response.data)
                            this.setState({allbillinfo: response.data});
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
                <ul><li>You added a transaction named <b>{user.description}</b> in group <b>{user.group_name}</b> which amounts to <b>$</b><b>{user.total_amount}</b> on <b>{Date(user.bill_timestamp)}</b></li></ul>
                ))}
            </div>
        )
    }
}
