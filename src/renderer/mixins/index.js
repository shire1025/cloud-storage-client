/**
 * 点击路由跳转基础配置
 */
// import _ from 'lodash'
// import authRoteIot from '../libs/authRouterIot';
// import $store from '../store'
const Mixins = {
    install(Vue) {
        Vue.mixin({
            computed: {
            },
            methods: {
                PUSH(data, time) {
                    // console.log('PUSH', data);
                    // if (time) {
                    //     data.query.time
                    // }
                    this.$router.push(data)
                },
                REPLACE(data) {
                    // 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
                    this.$router.replace(data)
                },
                GO(data) {
                    this.$router.go(data)
                }
            }
        })
    }
}

export default Mixins
