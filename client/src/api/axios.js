import axios from 'axios';

const instance = axios.create({
    baseURL:"https://task4-backend-1e6535aaaba6.herokuapp.com",
    withCredentials:true,
    headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    },
});

export default instance;