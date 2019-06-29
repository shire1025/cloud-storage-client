import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: require('@/views/welcome').default
    },
    {
      path: '/csc-main',
      name: 'csc-main',
      component: require('@/views/csc-main').default,
      children: [
        {
          path: '/setting',
          name: 'setting',
          component: require('@/views/setting/setting').default
        },
        {
          path: '/list',
          name: 'list',
          component: require('@/views/main/list').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
