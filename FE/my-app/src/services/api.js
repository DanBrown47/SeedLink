import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.251.4:5000", //your api URL

});

export default api;