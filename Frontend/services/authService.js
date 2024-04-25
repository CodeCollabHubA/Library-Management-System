import axios from 'axios'
import * as config from '../config.json'

const apiEndpoint = config.apiUrl + '/Auth/Login';

export async function login(email,password) {
    const { data: jwt } = await axios.post(apiEndpoint, { email, password });
    localStorage.setItem('token', jwt);
}

export function logout() {
    localStorage.removeItem('token');
}

export default {
    login,
    logout
}