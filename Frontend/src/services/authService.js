import { jwtDecode } from "jwt-decode";
import { apiUrl } from './apiEndPoints'
import http from './httpService';

const tokenKey = 'token'
const LogApiEndpoint = apiUrl + '/Auth/Login';
const RegApiEndpoint = apiUrl + '/Auth/Register';

export async function signUp(data) {
    const { data: jwt } = await http.post(RegApiEndpoint, data);
    localStorage.setItem(tokenKey,jwt)
}

export async function login(email, password) {
    const { data: jwt } = await http.post(LogApiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    // localStorage.removeItem(tokenKey);
    localStorage.clear()
}


export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export default {
    signUp,
    login,
    logout,
    getCurrentUser,
}