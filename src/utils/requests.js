import axios from "axios";
import config from "../config";
import {getSessionStorage,getLocationStorage} from "./function";

const default_timeout = 30000 // 超时30秒
const host = getLocationStorage('host') //host
const token = getLocationStorage('token') //token
const props = {  //axios公共参数
    timeout:default_timeout,
} 
console.log(token);
 

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
