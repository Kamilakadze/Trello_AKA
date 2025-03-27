// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // адрес mock API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
