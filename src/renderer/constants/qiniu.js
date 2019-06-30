//独立于各COS的配置
export const PROTOCOL = 'http://'

export const methods = {
    buckets: 'https://rs.qbox.me/buckets', //空间列表
    domains: 'https://api.qiniu.com/v6/domain/list', //空间对应的域名列表(授权空间域名返回为空)
    count: 'https://api.qiniu.com/v6/count', //统计文件数量(标准存储)
    count_line: 'https://api.qiniu.com/v6/count_line', //统计文件数量(低频存储)
    space: 'https://api.qiniu.com/v6/space', //统计文件空间(低频存储)
    space_line: 'https://api.qiniu.com/v6/space_line' //统计文件空间(低频存储)
}
