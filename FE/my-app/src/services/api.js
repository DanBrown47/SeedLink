import axios from 'axios';

const api = axios.create({
    baseURL: "http://10.10.14.207:5000", //your api URL

});

export default api;