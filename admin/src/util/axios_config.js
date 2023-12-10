// 添加请求拦截器,在请求之前拦截
import axios from "axios";
// const request = axios.create({
//     baseUrl: "http://127.0.0.1",
//     timeout: 10000
// })
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 在这里设置一个请求头,设置带着token给后端

    const token = localStorage.getItem('token')


    config.headers.Authorization = `Bearer ${token}`

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器,在响应之前拦截
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    //拿到token放到localstorage
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    //后端返回给前端的数据都会放到response.data中
    let res = response.data
    return res;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});



// export default request