import axios from 'axios';
import backendServer from "../webConfig";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const SIGNUP_ERROR = "SIGNUP_ERROR"
export const SIGNUP_EMAIL = "SIGNUP_EMAIL"



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
        else if(res.status === 202) {
            dispatch({
            type: SIGNUP_EMAIL,
            payload: "Email used"
            })
        }
            else {
                console.log("res " + res)
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: false
                })
            }
        })
    }
