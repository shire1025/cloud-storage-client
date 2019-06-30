<template>
    <div>
        <div @click="selectTab(bucket.files,'home')">
            home>
        </div>
        <div v-for="(item, index) in selectIndex"
            :key="index"
            @click="selectTab(item,index)">
            {{item.path}}>
        </div>
        <hr>
        <div v-for="(item, index) in selectFiles"
            :key="index"
            @click="nextFolder(item,index)">
            {{item.path}}
        </div>
    </div>
</template>

<script>
    import CloudStorage from '../../CloudStorage'
    export default {
        name: 'list',
        components: {},
        data() {
            return {
                bucket: {
                    files: []
                },
                selectFiles: [],
                selectIndex: [],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        async mounted() {
            console.log('CloudStorage', CloudStorage.init())
            // CloudStorage.getBuckets()
            CloudStorage.getBuckets().then(res => {
                console.log('res', res)
                let param = {
                    bucket: res[0]
                }
                CloudStorage.cloud.getListByBucket(param).then(res => {
                    console.log('res', res)
                    this.bucket.files = res.items
                    this.selectFiles = _.cloneDeep(res.items)
                    this.selectIndex = []
                    // res.items.forEach((item, index) => {
                    //     res.items[index] = utils.convertMeta(item, 0)
                    // })
                })
            })
        },
        methods: {
            nextFolder(item, index) {
                console.log(item, index)
                if (item.putTime) {
                    this.$alert('这是文件', 'tips')
                    return
                }
                this.selectFiles = _.cloneDeep(item.children)
                this.selectIndex = [...this.selectIndex, item]
            },
            selectTab(item, index) {
                if (index == 'home') {
                    this.selectFiles = _.cloneDeep(item)
                    this.selectIndex = []
                } else {
                    this.selectFiles = _.cloneDeep(item.children)
                    this.selectIndex = this.selectIndex.slice(0, index + 1)
                }
            }
        }
    }
</script>

<style lang="scss">
</style>