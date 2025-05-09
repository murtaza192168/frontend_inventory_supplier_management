// src/api/axiosInstance.js

import axios from 'axios';

// Create an Axios instance with your backend base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Change this if your backend runs on a different port or domain
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
