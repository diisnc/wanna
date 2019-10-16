import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/pages/Auth'
import Inspire from '@/components/pages/Inspire'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/inspire',
      name: 'Inspire',
      component: Inspire
    }
  ]
})
