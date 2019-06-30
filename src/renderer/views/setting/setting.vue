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
                <el-form-item label="ACCESS_KEY">
                    <el-input v-model="editData.ACCESS_KEY"
                        placeholder="请输入ACCESS_KEY"
                        clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="SECRET_KEY">
                    <el-input v-model="editData.SECRET_KEY"
                        placeholder="请输入SECRET_KEY"
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
    // import mac from '../../utils/test'
    // import * as types from '../../constants/mutation-types'
    export default {
        name: 'setting',
        components: {},
        data() {
            return {
                CSC_TYPE,
                listData: [],
                editData: {
                    type: 'qiniu',
                    ACCESS_KEY: '',
                    SECRET_KEY: ''
                }
            }
        },
        mounted() {
            // console.log('object', mac)
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
                    ACCESS_KEY: '',
                    SECRET_KEY: ''
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