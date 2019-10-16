import Vue from 'vue'
import Router from 'vue-router'
import Signinup from '@/components/Signinup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signinup',
      component: Signinup
    }
  ]
})
