import Vue from 'vue'

import NotFound from './components/NotFound'
import MainNav from './components/MainNav'

import Login from './components/account/Login'
import SignUp from './components/account/SignUp'

import DashBoard from './components/DashBoard'
import Account from './components/account/Account'
import Chain from './components/blockchain/Chain'
import Chaincode from './components/blockchain/Chaincode'
import Network from './components/network/Network'
import SysSetting from './components/system/Setting'

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
        '/account': {
          component: Account
        },
        '/chaincode': {
          component: Chaincode
        },
        '/block': {
          component: Chain
        },
        '/network': {
          component: Network
        },
        '/setting': {
          component: SysSetting
        },
        '/translate': {
          component: Bar
        }
      }
    },
    '/login': {
      component: Login
    },
    '/signup': {
      component: SignUp
    },
    '*': {
      component: NotFound
    }
  })

  router.redirect({
    '/': '/dashboard'
  })

  router.beforeEach((transition) => {
    // if (transition.to.path !== '/login' && !router.app.$data.isLogin) {
    //   // setTimeout(() => {
    //   //   router.app.authenticating = false
    //   console.log('this route uuuuuuppppppp global before hook')
    //   transition.redirect('/login')
    //   // }, 1000)
    // } else {
    //   console.log('this route is not forbidden by a global before hook')
    transition.next()
    // }
  })
}
