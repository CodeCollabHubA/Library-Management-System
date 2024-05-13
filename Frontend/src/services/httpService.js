import { toast } from "react-hot-toast";
import axios from "axios";

import logger from './logService';
import { userLocalStorage } from "../utils/constant";


axios.defaults.headers.common['Content-Type'] = 'application/json';


axios.interceptors.request.use(config => {
    const localstorage = localStorage.getItem(userLocalStorage)
    const token = localstorage ? JSON.parse(localstorage).accessToken : ""
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        logger.log(error)
        toast.error(error.message)
    }
    // if(expectedError)
    //     toast.error('Expected error occured.')

    return Promise.reject(error);
});


const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}

export default http