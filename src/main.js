import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'
import { sync } from 'vuex-router-sync'

import App from './App'
import { configRouter } from './router'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(Vuex)

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
