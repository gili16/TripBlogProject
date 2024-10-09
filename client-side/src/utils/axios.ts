import axios from 'axios'
import { authRequestMiddleware, authResponseMiddleware } from './authMiddleware'
import { ENDPOINTS, baseUrl } from '../api/endpoints';
var corsOptions = {
    origin: "*"
  };
const url = baseUrl.url

const axiosInstance = axios.create({ baseURL: url })

axiosInstance.interceptors.request.use(authRequestMiddleware)

axiosInstance.interceptors.response.use(authResponseMiddleware)

export default axiosInstance