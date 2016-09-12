import Vue from 'vue'

import Account from './components/account/Account'
import NotFound from './components/NotFound'
import MainNav from './components/MainNav'
import Login from './components/Login'
import DashBoard from './components/DashBoard'

var Bar = Vue.extend({
  template:
    '<dev>' +
    '<p>This is bar!</p>' +
    '<router-view></router-view>' +
    '</dev>'
})

// the router needs a root component to render.
// for demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
// var App = Vue.extend({})

export function configRouter (router) {
  router.map({
    '/': {
      component: MainNav,
      subRoutes: {
        '/dashboard': {
          component: DashBoard
        },
        '/chain': {
          component: Account
        },
        '/translate': {
          component: Bar
        },
        '/network': {
          component: Account
        }
      }
    },
    '/login': {
      component: Login
    },
    '*': {
      component: NotFound
    }
  })

  // router.redirect({
  //   '/info': '/account'
  // })

  router.beforeEach((transition) => {
    if (transition.to.path !== '/login' && !router.app.$data.isLogin) {
      // setTimeout(() => {
      //   router.app.authenticating = false
      console.log('this route uuuuuuppppppp global before hook')
      transition.redirect('/login')
      // }, 1000)
    } else {
      console.log('this route is not forbidden by a global before hook')
      transition.next()
    }
  })
}
