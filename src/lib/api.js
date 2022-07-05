import axios from 'axios'

const api = axios.create({
  baseURL: 'https://node.dashxdemo.com'
})

api.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem('jwt-token')
  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

export default api
