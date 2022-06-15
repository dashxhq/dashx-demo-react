import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dashx-demo-node.onrender.com'
})

export default api
