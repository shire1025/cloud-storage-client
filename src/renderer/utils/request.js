import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import store from '../store'
// import router from '../router/index'
import { HTTP_STATUS } from '../constants/ecode'
// import storage from '../helper/storage'
import _ from '../helper/lodash'

const request = axios.create({
    baseURL: '',
    timeout: 20000,
    responseType: 'json',
    withCredentials: false, // 是否允许带cookie这些
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    transformRequest: [
        function (params) {
            return qs.stringify(params)
        }
    ],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 这里提前处理返回的数据
        return data
    }],
    paramsSerializer(params) {
        return qs.stringify(params)
    }
})
// 添加请求拦截器
request.interceptors.request.use(config => {
    console.log('http.interceptors.request', config)
    // 完全不存在token 直接驳回请求，并跳转登录
    if (config.method === 'get') {
    }
    if (config.method === 'post') {
        // 判断是否为流
        if (config.headers['Content-Type'] == 'application/json') {
            // config.url = `${config.url}&COMPANYID=${store.state.userInfo.companyId}`
        }
    }
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(response => {
    console.log('http.interceptors.response', response)
    response.data = _.isString(response.data) ? JSON.parse(response.data) : response.data
    const data = response.data
    if (response.request && response.request.status && response.request.status === 200) {
        switch (Number(data.rspCode)) {
            case HTTP_STATUS.SUCCESS:
                // 正常反馈
                return data
            case HTTP_STATUS.ERROR:
                // 参数错误
                Vue.prototype.$notify.warning({ title: data.rspMsg })
                return Promise.reject(response)
            case HTTP_STATUS.AUTHENTICATE:
                //未登录
                Vue.prototype.$notify.closeAll()
                Vue.prototype.$notify.error({ title: data.rspMsg })
                return Promise.reject(data)
            default:
                // 额外参数
                return Promise.reject(data)
        }
    } else {
        return data
    }
    // 对响应数据做点什么
}, function (error) {
    console.log('error', error)
    // 请求超时
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !error.config._retry) {
        Vue.prototype.$notify.closeAll()
        Vue.prototype.$notify.error({ title: '请求超时，请稍候重试' })
    }
    if (error.request && error.request.status === HTTP_STATUS.OK) {
        Vue.prototype.$notify.closeAll()
        return
    }
    //= =============  错误处理  ====================
    if (error.response && error.response.status) {
        switch (error.response.status) {
            case HTTP_STATUS.BAD_REQUEST:
                error.message = '请求错误(400)'
                break
            case HTTP_STATUS.CLIENT_AUTH_ERROR:
                error.message = '未授权，请重新登录(401)'
                break
            case HTTP_STATUS.FORBIDDEN:
                error.message = '拒绝访问(403)'
                break
            case HTTP_STATUS.NOT_FOUND:
                error.message = '网络请求不存在(404)'
                break
            case HTTP_STATUS.REQUEST_TIMEDOUT:
                error.message = '请求超时(408)'
                break
            case HTTP_STATUS.SERVER_ERROR:
                error.message = '服务器错误(500)'
                break
            case HTTP_STATUS.BAD_GATEWAY:
                error.message = '网络错误(502)'
                break
            case HTTP_STATUS.SERVICE_UNAVAILABLE:
                error.message = '服务不可用(503)'
                break
            case HTTP_STATUS.GATEWAY_TIMEOUT:
                error.message = '网络超时(504)'
                break
            default:
                error.message = `连接出错(${error.response.status})!`
        }
        // Vue.prototype.$notify.error({ title: error.message })
    } else {
        error.message = '连接服务器失败!'
    }
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default request
