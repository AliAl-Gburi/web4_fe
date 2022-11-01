import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: { 'Content-type': 'application/json' },
    withCredentials: true
});

export default instance;