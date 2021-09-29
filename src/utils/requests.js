import axios from "axios";
import config from "../config";
import {getSessionStorage,getLocationStorage} from "./function";

import { T } from 'react-toast-mobile';

/*
 axios拦截器
*/
axios.interceptors.request.use(config=> {  // axios请求拦截器
    // 在发送请求之前做些什么 
    T.loading()
    return config; 
},error=> { 
    // 对请求错误做些什么 
    T.loaded()
    return Promise.reject(error); 
}); 

axios.interceptors.response.use(response=> { // axios响应拦截器 
    // 对响应数据做点什么
    T.loaded()
    return response; 
},error=> { // 对响应错误做点什么
    T.loaded()
    return Promise.reject(error); 
});

/*
 axios通用化配置参数
*/
 const default_timeout = 30000 // 超时30秒
const host = getLocationStorage('host') //host
const token = getLocationStorage('token') //token
const props = {  //axios公共参数
    timeout:default_timeout,
} 
console.log(token);

/**
 * get,post,put方法封装
 * @param {*} url 
 * @param {*} data 
 * @param {*} headers 
 * @returns 
 */

export function postAction(url, data, headers){
    return axios({
        ...props,
        url:host + url,
        method:'post',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
            ...headers
        },
        data:data,
    })
}

export function putAction(url, data, headers){
    return axios({
        ...props,
        url:host + url,
        method:'put',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
            ...headers
        },
        data:data,
    })
}

export function getAction(url, params, headers){
    return axios({
        ...props,
        url:host + url,
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'Authorization':` Bearer ${token}`,
            ...headers
        },
        params: params
    })
}
