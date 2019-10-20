import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/components/pages/Auth'
import Inspire from '@/components/pages/Inspire'
import Wishlist from '@/components/pages/Wishlist'
import Outfit from '@/components/pages/Outfit'
import Profile from '@/components/pages/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist
    },
    {
      path: '/outfit',
      name: 'Outfit',
      component: Outfit
    },
    {
      path: '/:username',
      name: 'Profile',
      component: Profile
    }
  ]
})
