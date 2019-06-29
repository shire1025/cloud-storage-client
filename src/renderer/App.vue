<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    // import * as types from './constants/mutation-types'
    export default {
        name: 'csc-app',
        mounted() {
            this.$store.dispatch('cloudSettingList')
        }
    }
</script>

<style>
    /* CSS */
</style>