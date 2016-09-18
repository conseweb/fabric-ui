import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import { sync } from 'vuex-router-sync'
import {toByteArray, fromByteArray} from 'base64-js'

import App from './App'
import { configRouter } from './router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(Vuex)

Vue.filter('base64', {
  read: function (val) {
    return toByteArray(val)
  },
  write: function (val, oldVal) {
    return fromByteArray(val)
  }
})
Vue.filter('bytesToHex', function (val) {
  var str = ''
  for (var i = 0; i < val.length; i++) {
    str += val[i].toString(16)
  }
  return str
})
Vue.filter('unixToDate', function (val) {
  var date = new Date(val)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() + ':'
  let m = date.getMinutes() + ':'
  let s = date.getSeconds()
  return Y + M + D + h + m + s
})
Vue.filter('showHash', function (val) {
  if (val === undefined || val.length === 0) {
    return ''
  }
  val = toByteArray(val)
  var str = ''
  for (var i = 0; i < val.length; i++) {
    str += val[i].toString(16)
  }
  return str
})

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

// configure router
configRouter(router)
sync(store, router)

// boostrap the app
router.start(Vue.extend(App), 'app')
window.router = router
