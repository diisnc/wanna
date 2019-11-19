import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/components/pages/Auth'
import Inspire from '@/components/pages/Inspire'
import Wishlist from '@/components/pages/Wishlist'
import Outfit from '@/components/pages/Outfit'
import Profile from '@/components/pages/Profile'
import Manageposts from '@/components/admin/Manageposts'
import Manageusers from '@/components/admin/Manageusers'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Auth',
      component: Auth
      /* meta: { guest: true } */
    },
    {
      path: '/manageposts',
      name: 'Manageposts',
      component: Manageposts
      /* meta: { requiresAuth: true, isAdmin: true } */
    },
   {
      path: '/manageusers',
      name: 'Manageusers',
      component: Manageusers
      /* meta: { requiresAuth: true, isAdmin: true } */
    },
    {
      path: '/inspire',
      name: 'Inspire',
      component: Inspire
      /* meta: { requiresAuth: true } */
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist
      /* meta: { requiresAuth: true } */
    },
    {
      path: '/outfit',
      name: 'Outfit',
      component: Outfit
      /* meta: { requiresAuth: true } */
    },
    {
      path: '/:username',
      name: 'Profile',
      component: Profile
      /* meta: { requiresAuth: true } */
    }
  ]
})



/*  Com parâmetros (signinup, admin, ...) do meu tp de web. Posteriormente alterar

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => {console.log(record.meta); return record.meta.requiresAuth})) {
    console.log(store.state.login.accesstoken)
      if ( !store.state.login.accesstoken) {
          next({
              name: 'signinup'
              // params: { nextUrl: to.fullPath }
          })
      } else if(to.matched.some(record => record.meta.isAdmin)) {
          if(store.state.login.isAdmin === true){
              next()
          }
          else{
              next({ name: 'user'})
          }
      }else {
          next()
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if( store.state.login.accesstoken){
        if (!store.state.login.isAdmin){
          next({ name: 'user'})
        } else {
          next({ name: 'admin'})
        }
      }
      else {
        next()
      }
  } else {
      next() 
  }
})

export default router


*/