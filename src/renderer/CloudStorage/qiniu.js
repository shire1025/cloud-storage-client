import qiniu from 'qiniu'
import http from '../helper/http'
import { methods } from '../constants/qiniu'
import * as utils from '../utils'
var accessKey = '8KQQ1l2oC2gyWUKajAD6IuoxUxVZeYXjWBdHMH_B'
var secretKey = 'gWbvE-LXuemc1SomUcortbZu0XYTRcw6sFHBUTeJ'
// var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
function getToken() {
    return new qiniu.auth.digest.Mac(accessKey, secretKey)
}

/**
 * http请求鉴权
 * @param url
 * @returns {*}
 */
export function HttpAuthorization(url) {
    return qiniu.util.generateAccessToken(getToken(), url, null)
}
/**
 * 获取Buckets名
 */
export function getBuckets() {
    return http.get(methods.buckets)
}
/**
 * 返回当前bucket文件列表
 */
export function getListByBucket(params) {
    return new Promise(function (resolve, reject) {
        let config = new qiniu.conf.Config()
        let bucketManager = new qiniu.rs.BucketManager(getToken(), config)
        bucketManager.listPrefix(params.bucket, params, (respErr, respBody, respInfo) => {
            console.log('getListByBucket reject', respErr, respBody, respInfo)
            if (respBody.error) {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({ 'error': respBody.error, 'status': respBody.status })
                console.log('getListByBucket reject', respErr, respBody, respInfo)
            }
            respBody.items.forEach((item, index) => {
                item = utils.convertMeta(item, 'qiniu')
                respBody.items[index] = item
            })
            respBody.items = utils.FlatConvertTree(respBody.items)
            resolve(respBody)
        })
    })
}
