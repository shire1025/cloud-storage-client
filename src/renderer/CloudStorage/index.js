import { CSC_TYPE } from '../constants/index'
import * as qiniu from './qiniu'
class CloudStorage {
    constructor() {
        this.key = 'qiniu'
        this.cloud = qiniu
    }

    init(key) {
        this.key = key
        switch (key) {
            case CSC_TYPE.qiniu.value:
                this.cloud = qiniu
                break
            // case CSC_TYPE.cos.value:
            //     this.cos = cos
            //     break
        }
        console.log('this.cloud', this.cloud)
    }

    getBuckets() {
        return this.cloud.getBuckets()
    }
}
export default new CloudStorage()
