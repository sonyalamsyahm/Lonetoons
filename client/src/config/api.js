import axios from 'axios';

export const URL = axios.create({
  // baseURL: 'https://lonetoon.herokuapp.com/api/v1',
  baseURL: 'http://192.168.1.28:3000/api/v1',
});

export const setHeaderAuth = token => {
  URL.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  // console.log(URL.defaults.headers.common['Authorization']);
};
