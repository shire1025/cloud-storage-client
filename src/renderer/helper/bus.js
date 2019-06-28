import Vue from 'vue'

export default new Vue()
// 用法
/**
    this.$bus.$emit('todoSth', params);  //params是传递的参数
    this.$bus.$on('todoSth', (params) => {  //获取传递的参数并进行操作
        //todo something
    })
    // 最好在组件销毁前
    // 清除事件监听
    beforeDestroy () {
        this.$bus.$off('todoSth');
    },
 */
