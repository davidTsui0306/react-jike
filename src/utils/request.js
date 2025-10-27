// axois封裝
import axios from "axios";
import { getToken } from "./token";

// 1.根域名配置
// 2.超時時間
// 3.請求/響應攔截器

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

// 請求攔截器
// 請求發送前攔截，插入自定義配置
request.interceptors.request.use((config)=> {
  // 操作config 注入token(按照後端格式要求)
  const token = getToken()
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 響應攔截器
// 響應返回客戶端之前攔截，處理返回數據
request.interceptors.response.use((response)=> {

    return response.data
  }, (error)=> {

    return Promise.reject(error)
})

export { request }