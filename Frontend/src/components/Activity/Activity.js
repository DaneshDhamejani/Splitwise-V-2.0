import React, {Component} from 'react'
import axios from 'axios';
import backendServer from "../../webConfig";
import Nav from "react-bootstrap/Nav";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import ReactPaginate from 'react-paginate';
import "../Activity/Activity.css";
import {DropdownButton} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import {Button, Form} from 'react-bootstrap';

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail: localStorage.getItem('useremail'),
            username: "",
            allbillinfo: [],
            error: "",
            offset: 0,
            data: [],
            perPage: 2,
            currentPage: 0,
            sliceddata: [],
            sortedListAsc:[],
            sortedListDesc:[]

        }
        this.handlePageClick = this.handlePageClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAscending = this.handleAscending.bind(this)
        this.handleDescending=this.handleDescending.bind(this)
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    handleAscending= (e) => {
        
        console.log(this.state.allbillinfo)
        let n = this.state.allbillsinfo.length;
        let currentelement=this.state.allbillinfo
        for (let i = 0; i < n-1; i++)
            for (let j = 0; j < n-i-1; j++)
                if (currentelement[j].billdate > currentelement[j+1])
                {
                    // swap arr[j+1] and arr[j]
                    let temp = currentelement[j];
                    currentelement[j] = currentelement[j+1];
                    currentelement[j+1] = temp;
                }

    }
    handleDescending= (e) => {
        
        console.log(this.state.allbillinfo)
    }



    handleChange = async (e, data) => {
        console.log(e.target.value)
        console.log("Current state", this.state.perPage)
        console.log(typeof(e.target.value))
        let myint = parseInt(e.target.value)

        await this.setState({perPage: myint})
        console.log("Latest state:", this.state.perPage)
        const slice = this.state.allbillinfo.slice(this.state.offset, this.state.offset + this.state.perPage)
        console.log(this.state.perPage)
        console.log("Slice", slice)
        this.setState({sliceddata: slice})
        this.setState({
            pageCount: Math.ceil(this.state.allbillinfo.length / this.state.perPage)

        })
    }


    receivedData() {

        const slice = this.state.allbillinfo.slice(this.state.offset, this.state.offset + this.state.perPage)
        console.log(this.state.perPage)
        console.log("Slice", slice)
        this.setState({sliceddata: slice})


        this.setState({
            pageCount: Math.ceil(this.state.allbillinfo.length / this.state.perPage)

        })

    }
    
    // sortAscending() {

    //     console.log(this.state.allbillsinfo)
    //     // let n = this.state.allbillsinfo.length;
    //     // let currentelement=this.state.
    //     // for (let i = 0; i < n-1; i++)
    //     //     for (let j = 0; j < n-i-1; j++)
    //     //         if (currentelement[j].billdate > currentelement[j+1])
    //     //         {
    //     //             // swap arr[j+1] and arr[j]
    //     //             int temp = arr[j];
    //     //             arr[j] = arr[j+1];
    //     //             arr[j+1] = temp;
    //     //         }

        

    // }

    async componentDidMount() {

        

        console.log(this.state.myemail);
        var data = {
            useremail: this.state.useremail
        }

        await axios.post(`${backendServer}/bills/recentactivity`, data).then((response) => {
            if (response.status === 200) {
                console.log(response.data.allbills)
                let allresponse = response.data.allbills

                this.setState({allbillinfo: allresponse});
                console.log(this.state.allbillinfo)
            } else if (response.status === 400) {
                this.setState({error: response.data});

            }
        })

        await this.receivedData()


    }


    render() {
        return (
            <div className="activitycontainer">
                <div className="d-flex flex-column">
                    <div className="d-flex my-3 justify-content-center">
                        <h2>Recent Activities</h2>
                    </div>
                    <div className="d-flex justify-content-center">
                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </div>
                    <div className="d-flex my-3  justify-content-center">
                    <select value="1"
                     value={this.state.selectValue} 
                     onChange={this.handleChange} 
             >
                <option defaultValue>Select number of entries to be displayed</option>
  <option value="2">2</option>
  <option value="5">5</option>
  <option value="10">10</option>
</select>
                    </div>
                    <div className="d-flex my-3 justify-content-center">
                        <Button onClick={this.handleAscending}>Sort Ascending</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.handleDescending}>Sort Descending</Button>
                    </div>
                    {this.state.sliceddata.map((user) => (
                <div className="d-flex my-3 justify-content-center border 1px">      
                <b>{user.billcreatedby}</b>&nbsp;created a bill in&nbsp;<b>&nbsp;{user.groupname}&nbsp;</b> named<b>&nbsp;{user.billdescription}</b>&nbsp;of amount &nbsp;<b>${user.billamount}&nbsp;</b> on &nbsp;<b>{user.billdate}</b>
                </div>))}
                </div>
            </div>
        )
    }
}

