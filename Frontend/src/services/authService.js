import { jwtDecode } from "jwt-decode";
import { apiUrl } from './apiEndPoints'
import http from './httpService';
import { setUser } from "@sentry/react";

const tokenKey = 'token'
const LogApiEndpoint = apiUrl + '/Auth/Login';
const RegApiEndpoint = apiUrl + '/Auth/Register';

export async function signUp(data) {
    const { data: jwt } = await http.post(RegApiEndpoint, data);
    localStorage.setItem(tokenKey,jwt)
}

export async function login(email, password,setUser) {
    const { data: jwt } = await http.post(LogApiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
    const user = { ...jwtDecode(jwt), token: jwt }
    setUser(user)
    // user&&localStorage.setItem('role',user.role)
}

export function logout(setUser) {
    localStorage.removeItem(tokenKey)
    setUser(null)
}


export default {
    signUp,
    login,
    logout,
}