import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api', //  backend's base URL
  withCredentials: true,
});

export const fetchPortfolio = (userId) => API.get(`/portfolio/${userId}`);
export const fetchTransactions = (userId) => API.get(`/transactions/${userId}`);
// Add other API calls as needed