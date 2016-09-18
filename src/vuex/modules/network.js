import {
  GET_PEERS_SUCC
} from '../types'

const state = {
  peers: []
}

const mutations = {
  [GET_PEERS_SUCC] (state, network) {
    if (network !== null) {
      state.peers = network.peers
    }
  }
}

export default {
  state,
  mutations
}
