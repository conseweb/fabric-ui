import Vue from 'vue'
import Vuex from 'vuex'

import middlewares from './middlewares'
import account from './modules/account'
import count from './modules/count'
import chain from './modules/chain'
import chaincode from './modules/chaincode'
import network from './modules/network'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

export default new Vuex.Store({
  modules: {
    account,
    count,
    chain,
    chaincode,
    network
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
  strict: false,
  debug: true,
  middlewares
})
