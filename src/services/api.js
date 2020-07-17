import axios from 'axios'
require("dotenv").config()

// http://localhost:3001/api
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL_ONLINE || REACT_APP_API_URL_LOCALHOST })

export default api