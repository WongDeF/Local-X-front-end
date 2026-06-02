import axios from "axios"


// 创建一个 Axios 实例
const service = axios.create({
    baseURL: '/api',      // 你的 API 基础路径
    timeout: 15000,        // 请求超时时间，单位毫秒
    headers: {
        'Content-Type': 'application/json', // 默认请求头
    },
});
// 在 request.js 文件中，实例创建之后添加
// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 从本地存储获取 token，并添加到请求头
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`;
        // }
        // 可选：展示全局 loading
        // showLoading();
        return config;
    },
    (error) => {
        // 请求发送失败的处理
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);
service.interceptors.response.use((response) => response.data);
export default service;