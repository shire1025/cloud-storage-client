/**
 * Created by Shire on 2019-06-29 16:04:44.
 */

import * as types from '../constants/mutation-types'
import storage from '../helper/storage'

export default {
    [types.CLOUD_SETTING_LIST](state, change) {
        console.log(types.CLOUD_SETTING_LIST, change)
        state[types.CLOUD_SETTING_LIST] = change
        if (change && change.length) {
            storage.set(types.CLOUD_SETTING_LIST, change ? JSON.stringify(change) : [])
        } else {
            storage.remove(types.CLOUD_SETTING_LIST)
        }
    }
}
