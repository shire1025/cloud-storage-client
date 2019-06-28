<template>
    <el-container class="csc-main">
        <el-header>
            <CSCHeader></CSCHeader>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <CSCAside></CSCAside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import CSCAside from './layout/aside'
    // import CSCMain from './layout/main'
    import CSCHeader from './layout/header'
    export default {
        name: 'csc-main',
        components: {
            CSCHeader,
            // CSCMain,
            CSCAside
        },
        methods: {}
    }
</script>

<style>
    .csc-main {
        background: #ffffff;
    }
</style>