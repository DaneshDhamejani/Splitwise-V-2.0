import { SIGNUP_SUCCESS } from '../actions/actions';



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
        default:
            return state;
    }
}