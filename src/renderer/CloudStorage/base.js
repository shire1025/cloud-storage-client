import { CSC_TYPE } from '../constants/index'

class baseBucket {
    constructor(name, cos) {
        console.log('baseBucket', CSC_TYPE, name, cos)
        this.inited()
        // name && (this.name = name)
        // this.cos = cos
        //单次请求加载条数
        this.pageSize = 1000
    }
    inited() {
        this.brand = '' //服务商
        this.space = '' //空间容量
        this.count = '' //文件个数
        this.name = ''
        this.location = ''
        //操作权限 0：正常 1：私有
        this.permission = 0

        //当前bucket 的可用域名列表
        this.domains = []
        //当前选择domain
        this.domain = ''
        //缓存请求时返回的marker
        this.marker = ''

        //当前bucket源数据
        this.files = []
        //分页加载,数据加载后先保存在tempFiles,加载完毕后在使用files
        this.tempFiles = []
        //已选的文件列表,批处理时使用
        this.selection = []
        //当前路径
        this.folderPath = ''

        //下载列表
        this.downloads = []
        //上传列表
        this.uploads = []
        //分页加载
        this.paging = false
    }
    /**
     * 0: 正常 1：私有
     * @param permission
     */
    setPermission(permission) {
        this.permission = permission
        if (this.vm) {
            // this.vm[types.app.a_update_buckets_info]({name: this.name, permission: this.permission})
        }
        // this.https = this.vm[types.setup.https]
    }
}
export default baseBucket
