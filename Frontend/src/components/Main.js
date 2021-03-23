import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarClass from "./Navbar/Navbar";
import Landing from "./Landing/Landing";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

class Main extends Component {
    render() {
        return (
            <div> {/*Render Different Component based on Route*/}
                <Route path="/"
                    component={NavbarClass}/>
                <Route path="/home"
                    component={Landing}/>
                <Route path="/login"
                    component={Login}/>
                <Route path="/signup"


                    component={Signup}/>
            </div>
        );
    }
}
// Export The Main Component
export default Main;
