/**
 * Created by Shire on 2019-06-29 16:04:44.
 */

import * as types from '../constants/mutation-types'
import storage from '../helper/storage'

// export const GET_CLOUD_SETTING_LIST = ({ commit }) => {
//     const list = storage.get(types.CLOUD_SETTING_LIST)
//     console.log(types.CLOUD_SETTING_LIST, list)
//     if (!list) {
//         commit(types.CLOUD_SETTING_LIST, JSON.parse(list))
//     }
// }
// export const SET_CLOUD_SETTING_LIST = ({ commit }, change) => {
//     console.log(types.CLOUD_SETTING_LIST, change)
//     commit(types.CLOUD_SETTING_LIST, change)
// }
export default {
    cloudSettingList ({ commit }, change) {
        console.log(types.CLOUD_SETTING_LIST, change)
        if (change) {
            commit(types.CLOUD_SETTING_LIST, change)
        } else {
            const list = storage.get(types.CLOUD_SETTING_LIST)
            console.log(types.CLOUD_SETTING_LIST, 1, list)
            let listParse = []
            try {
                listParse = JSON.parse(list)
            } catch (error) {
                listParse = []
            }
            commit(types.CLOUD_SETTING_LIST, listParse || [])
        }
    }
}
