import {
	USERINFO_SUCCESS,
	USERINFO_FAILURE,
  SET_ACCOUNT
} from '../types'

const state = {
  id: '',
  state: null,
  logined: false
}

const mutations = {
  [USERINFO_SUCCESS] (state, action) {
    state.state = action.state
  },
  [USERINFO_FAILURE] (state, action) {
    state.state = 'failed state'
  },
  [SET_ACCOUNT] (state, account) {
    if (account !== null) {
      account.logined = true
    }
    console.log('set...', account)
    for (var key in account) {
      console.log('key-value: ', key, account[key])
      state[key] = account[key]
    }
  }
}

export default {
  state,
  mutations
}
