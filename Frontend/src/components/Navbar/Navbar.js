import React, {Component} from "react";
import '../Navbar/Navbar_style.css'
import logo from '../assets/splitwise_logo.png';

class NavbarClass extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand" href="/home">
                        <img src={logo}
                            width="130"
                            height="30"
                            class="d-inline-block align-top"
                            alt="Splitwise"></img>
                    </a>
                    <div class="d-flex flex-row-reverse">
                        <div class="ml-5"></div>
                        <div class="ml-5"></div>
                        <div class="p-2">
                            <a class="btn btn-outline signup m-sm-0" href="/signup">Sign up</a>
                        </div>
                        <div class="p-2">
                            <a class="nav-link active login" href="/login">Log in
                                <span class="sr-only"></span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default NavbarClass;
