import axios from 'axios'

const api = axios.create({
  baseURL: 'https://node.dashxdemo.com'
})

api.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem('jwt-token')
  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`;
  }

  return config;
});

export default api
