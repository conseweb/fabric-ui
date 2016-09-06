import Vue from 'vue'
import Vuex from 'vuex'

import middlewares from './middlewares'
import account from './account/Account'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

export default new Vuex.Store({
  modules: {
    account
    // apps,
    // articleList,
    // prenextArticle,
    // articleDetail,
    // auth,
    // commentList,
    // globalVal,
    // options,
    // logins,
    // tagList,
    // showmsg
  },
  strict: debug,
  middlewares
})
