//import axios from 'axios';
import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function register_user (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            // eslint-disable-next-line 
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload}
            // eslint-disable-next-line 
            break;

        case AUTH_USER:
            return { ...state, userData: action.payload}
            // eslint-disable-next-line 
            break;
    
            
        default:
            return state;
    }
}