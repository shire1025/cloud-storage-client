import Vue from 'vue'
import qs from 'qs'
import request from '../utils/request'
import { HttpAuthorization } from '../CloudStorage/qiniu'

class Request {
    // vm 指向 Vue
    constructor(vm) {
        this.vm = vm
    }
    get(url, params, config = {}) {
        if (params) { url = url + '?' + qs.stringify(params) }
        if (/(qiniu.com|qbox.me)/g.test(url)) { // 七牛api
            console.log('HttpAuthorization', HttpAuthorization(url))
            config = {
                ...config,
                headers: {
                    'Authorization': HttpAuthorization(url)
                }
            }
        }
        console.log('config', config)
        return request.get(url, config)
    }
    post(url, params = {}, config = {}) {
        return request.post(url, params, config)
    }
    /**
     * 封装后的axios 上传方法
     *
     * @param {string} url 请求路径
     * @param {object} formData blob
     * @param {object} [config] 特殊配置项（选填）
     * @returns
     */
    upload(url, formData, config = {}) {
        return request.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: [function (data) {
                return data
            }],
            ...config
        })
    }
}
export default new Request(Vue)
