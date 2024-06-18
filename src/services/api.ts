import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-pedido-erp-gateway-prod.saurus.net.br/api/v2',
});

api.interceptors.request.use(config => {
  const credentials = localStorage.getItem('credentials');
  if (credentials) {
    const { username, aplicacaoid } = JSON.parse(credentials);
    config.headers['username'] = username;
    config.headers['aplicacaoid'] = aplicacaoid;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
