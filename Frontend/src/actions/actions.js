import axios from 'axios';
import backendServer from "../webConfig";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"


export const FETCH_LOGIN = "FETCH_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const EMAIL = "EMAIL"


export const signup = (values) => dispatch => {
    console.log("Actions SIGNUP :", values)
    console.log("In action",backendServer)
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${backendServer}/users/signup`, values)
        .then((res) => {
            console.log("Response actions signup:",res)
            if (res.status === 200 ) {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: true
                })
            }
        })
    }


    export const login = (values) => dispatch => {
        console.log("Login Actions :", values)
        console.log("In action",backendServer)
        axios.defaults.withCredentials = true;
        const request = axios
            .post(`${backendServer}/users/login`, values)
            .then((res) => {
                console.log("Response actions signup:",res)
                if (res.status === 200 ) {
                    console.log("My token is:",res.data.token)
                    console.log("Inside Login Success")
                    localStorage.setItem('myjwttoken', res.data.token);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: true
                    })
                }
                else {
                    console.log("res " + res)
                    dispatch({
                        type: LOGIN_ERROR,
                        payload: false
                    })
    
                }
            })
        }

    // export function login(values){
    //     console.log("Actions LOGIN :", values)
    //     return async function(dispatch){
    //     axios.defaults.withCredentials = true;
    //     const request = axios
    //         .post(`${backendServer}/users/login`, values)
    //         .then((res) => {
    //             console.log("Response actions login:",res)
    //             console.log("Inside Login Email")
    //             if (res.status === 200 ) {
    //                 console.log("My token is:",res.data.token)
    //                 console.log("Inside Login Success")
    //                 localStorage.setItem('myjwttoken', res.data.token);
    //                 dispatch({
    //                     type: LOGIN_SUCCESS,
    //                     payload: true
    //                 })
    //             }
    //             else {
    //                 console.log("res " + res)
    //                 dispatch({
    //                     type: LOGIN_ERROR,
    //                     payload: false
    //                 })
    
    //             }
    //         })
    //     }
    // }
