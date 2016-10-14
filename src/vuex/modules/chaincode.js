import {
  ADD_CHAINCODE_SUCC,
  REQUEST_ERR
} from '../types'

const state = []

const mutations = {
  [ADD_CHAINCODE_SUCC] (state, cc) {
    if (cc !== null) {
      for (var i = 0; i < state.length; i++) {
        if (cc.path === state[i].path || cc.name === state[i].name) {
          state.$set(i, cc)
          return
        }
      }
      state.push(cc)
    }
  },
  [REQUEST_ERR] (state, msg) {
    console.error(msg)
  }
}

export default {
  state,
  mutations
}
