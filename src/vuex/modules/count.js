import { INCREMENT, DECREMENT } from '../types'

const state = {
  count: 10,
  history: []
}

const mutations = {
  [INCREMENT] (state) {
    state.count++
    state.history.push('increment')
  },
  [DECREMENT] (state) {
    state.count--
    state.history.push('decrement')
  }
}

export default {
  state,
  mutations
}
