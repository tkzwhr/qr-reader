import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import History from '@/components/History'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/history',
      name: 'History',
      component: History
    }
  ]
})
