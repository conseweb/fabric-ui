import {
	USERINFO_SUCCESS,
	USERINFO_FAILURE
} from '../types'
import api from '../../api/api'

const state = {
  user: null
}

const mutations = {
  [USERINFO_SUCCESS] (state, action) {
    state.user = action.user
  },
  [USERINFO_FAILURE] (state, action) {
    state.user = null
  }
}

export const getUserInfo = ({ dispatch }) => {
  api.getMe().then(response => {
    if (!response.ok) {
      return dispatch(USERINFO_FAILURE)
    }
    dispatch(USERINFO_SUCCESS, { user: response.data })
  }, response => {
    dispatch(USERINFO_FAILURE)
  })
}

export default {
  state,
  mutations
}
