import axios from 'axios';

export const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

customAxios.interceptors.response.use(response => {
  return response;
}, error => {
  return error.response;
})
