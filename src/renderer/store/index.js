import Vue from 'vue'
import Vuex from 'vuex'

import {
    createPersistedState
    // createSharedMutations
} from 'vuex-electron'

import * as types from '../constants/mutation-types'
import actions from './actions'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)
// 全局state
let state = {
    [types.CLOUD_SETTING_LIST]: []
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules,
    plugins: [
        createPersistedState()
        // createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'production'
})
