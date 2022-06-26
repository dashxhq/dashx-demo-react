import axios from 'axios'

const api = axios.create({
  baseURL: 'https://node.dashxdemo.com'
})

export default api
