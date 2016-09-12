import {
	USERINFO_SUCCESS,
	USERINFO_FAILURE
} from '../types'

const state = {
  state: null,
  islogin: true
}

const mutations = {
  [USERINFO_SUCCESS] (state, action) {
    state.state = action.state
  },
  [USERINFO_FAILURE] (state, action) {
    state.state = 'failed state'
  }
}

export default {
  state,
  mutations
}
