import axios from 'axios'
// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://backend-api-01.newbee.ltd/api/v1' : 'http://backend-api-01.newbee.ltd/api/v1'
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3333' : 'http://127.0.0.1:3333'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios