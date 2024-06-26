import axios from 'axios'

const INTERNAL_SERVER_ERROR = 'Something went wrong, please try again later.'
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://node.dashxdemo.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem('jwt-token')
  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`
  }

  return config
})

export default api
export { INTERNAL_SERVER_ERROR }
