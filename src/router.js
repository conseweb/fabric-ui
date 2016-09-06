import Vue from 'vue'

import Account from './components/account/Account'
import NotFound from './components/NotFound'
import Hello from './components/Hello'

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
      component: Hello
    },
    '/account': {
      component: Account
    },
    '/bar': {
      component: Bar
    },
    '/a': {
      component: Account
    },
    '*': {
      component: NotFound
    }
  })

  // router.redirect({
  //   '/info': '/account'
  // })

  router.beforeEach((transition) => {
    if (transition.to.path === '/forbidden') {
      router.app.authenticating = true
      setTimeout(() => {
        router.app.authenticating = false
        console.log('this route is forbidden by a global before hook')
        // transition.abort()
        router.go('/a')
      }, 3000)
    } else {
      console.log('this route is not forbidden by a global before hook')
      transition.next()
    }
  })
}
