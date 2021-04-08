import { SIGNUP_ERROR } from '../actions/actions';
import { SIGNUP_SUCCESS } from '../actions/actions';
import { SIGNUP_EMAIL } from '../actions/actions';
import { reducer as formReducer } from "redux-form";


const initialState = {
    signupstatus: '',
}



export default function (state = initialState, action) {
    console.log("In SIGNUP Reducer")
    switch (action.type) {
            case SIGNUP_SUCCESS:
            return {
                ...state,
                signupstatus: action.payload
            };
            case SIGNUP_ERROR:
            return {
                ...state,
                signupstatus: action.payload
            };
            case SIGNUP_EMAIL:
            return {
                ...state,
                signupstatus: action.payload
            };
        default:
            return state;
    }
}