import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import { sync } from 'vuex-router-sync'

import App from './App'
import { configRouter } from './router'
import { base64, bytesToHex, unixToDate, showHash, reverse } from './filter'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(Vuex)

Vue.filter('base64', base64)
Vue.filter('bytesToHex', bytesToHex)
Vue.filter('unixToDate', unixToDate)
Vue.filter('showHash', showHash)
Vue.filter('reverse', reverse)

// CSS
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-strap/dist/vue-strap'

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
