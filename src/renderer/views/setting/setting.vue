<template>
    <div>
        <div v-if="listData && listData.length">
            <div v-for="(item, index) in listData"
                :key="index">
                {{CSC_TYPE[item.type].label}}
            </div>
        </div>
        <el-card class="box-card">
            <el-form ref="form"
                :model="editData"
                label-position="left"
                label-width="120px">
                <el-form-item label="云存储">
                    <el-radio-group v-model="editData.type">
                        <el-radio v-for="item in CSC_TYPE"
                            :key="item.value"
                            :label="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="ID">
                    <el-input v-model="editData.ID"
                        placeholder="请输入ID"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="KEY">
                    <el-input v-model="editData.KEY"
                        placeholder="请输入KEY"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        @click.native="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {
        CSC_TYPE
    } from '../../constants/index'
    import uuid from '../../utils/uuid'
    import _ from '../../helper/lodash'
    // import * as types from '../../constants/mutation-types'
    export default {
        name: 'setting',
        components: {},
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }],
                CSC_TYPE,
                listData: [],
                editData: {
                    type: 'qiniu',
                    ID: '',
                    KEY: ''
                }
            }
        },
        mounted() {
            this.queryList()
        },
        methods: {
            queryList() {
                this.listData = _.cloneDeep(this.cloudSettingList)
            },
            submitForm() {
                this.editData.uuid = uuid(this.editData)
                let data = [...this.cloudSettingList, _.cloneDeep(this.editData)]
                console.log('data', this.editData.uuid, data)
                this.$store.dispatch('cloudSettingList', data)
                this.editData = {
                    type: 'qiniu',
                    ID: '',
                    KEY: ''
                }
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>

<style lang="scss">

</style>