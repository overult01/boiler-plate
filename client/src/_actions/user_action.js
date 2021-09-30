import axios from "axios";
/* eslint-disable no-unused-vars */
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';


export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data )
/* eslint-disable no-unused-vars */
    return {
        type: LOGIN_USER,
        payload: request
    }
}


export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data )
/* eslint-disable no-unused-vars */
    return {
        type: REGISTER_USER,
        payload: request
    }
}