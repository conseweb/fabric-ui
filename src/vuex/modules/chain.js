import {
  GET_CHAIN_SUCC,
  GET_BLOCK_SUCC,
  REQUEST_ERR
} from '../types'

const state = {
  height: 0,
  currentBlockHash: '',
  previousBlockHash: '',
  blocks: []
}

const mutations = {
  [GET_CHAIN_SUCC] (state, chain) {
    if (chain !== null) {
      state.height = chain.height
      state.currentBlockHash = chain.currentBlockHash
      state.previousBlockHash = chain.previousBlockHash
    }
  },
  [GET_BLOCK_SUCC] (state, height, block) {
    if (block !== null) {
      state.blocks.$set(height, block)
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
