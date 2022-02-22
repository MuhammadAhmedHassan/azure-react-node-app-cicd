import axios from 'axios';

export const appAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : '',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
