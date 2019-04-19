import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '../utils/auth'
import store from '../store';

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
})
//添加请求拦截器
service.interceptors.request.use(
    config => {
        if(store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config;
    }, error => {
        console.log(error)
        Promise.reject(error)
    }
)
//添加响应拦截器
service.interceptors.response.use(
    response => response,
    error => {
        console.log(error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5*1000
        })
        return Promise.reject(error)
    }
)
export default service