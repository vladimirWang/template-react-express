import axios from 'axios';

const http = axios.create({
  baseURL: '/api'
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use((resp) => {
  console.log(resp.config.url, '---config')
  // console.log(resp.data, '---------------data')
  // console.log(resp, '---------------resp')
  return resp.data;
}, err => {
  console.log(err.message, '---异常')
});

export default http;
