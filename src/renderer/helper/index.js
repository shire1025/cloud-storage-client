import Vue from 'vue'
import _ from './lodash.js'
import bus from './bus.js'
// import './map.js'
// import api from '../api/index'
import storage from './storage'
import store from '../store'
import moment from 'moment'
// import 'moment/locale/zh-cn.js'// 中文支持;
// import moment from 'moment-timezone'

window.storage = Vue.prototype.storage = storage
window.$store = Vue.prototype.$store = store
window._ = Vue.prototype._ = _
window.$bus = Vue.prototype.$bus = bus
window.moment = Vue.prototype.moment = moment
