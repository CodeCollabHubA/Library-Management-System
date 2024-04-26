import { jwtDecode } from "jwt-decode";
import * as config from '../config.json'
import http from './httpService';

const tokenKey='token'
const apiEndpoint = config.apiUrl + '/Auth/Login';

export async function login(email,password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
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
    login,
    logout,
    getCurrentUser
}