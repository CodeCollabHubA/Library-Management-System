import { setUser } from "@sentry/react";
import { jwtDecode } from "jwt-decode";

import { userLocalStorage } from "../utils/constant";
import { apiUrl } from './apiEndPoints'
import http from './httpService';


const LogApiEndpoint = apiUrl + '/Auth/Login';
const RegApiEndpoint = apiUrl + '/Auth/Register';

export async function signUp(data) {
    console.log(data);
    const { data: user } = await http.post(RegApiEndpoint, data);
    console.log(data); setUser(user)
    localStorage.setItem(userLocalStorage, JSON.stringify(user));
}

export async function login(email, password, setUser) {
    const { data: user } = await http.post(LogApiEndpoint, { email, password });
    setUser(user)
    localStorage.setItem(userLocalStorage, JSON.stringify(user));
}

export function logout(setUser) {
    localStorage.removeItem(userLocalStorage)
    setUser(null)
}


export default {
    signUp,
    login,
    logout,
}