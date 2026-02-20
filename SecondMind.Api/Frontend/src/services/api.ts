import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://localhost:5201/api', // Backend URL
});
