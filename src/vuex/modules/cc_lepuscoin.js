import {
  SET_LEPUSCOIN_NAME,
  SET_LEPUSCOIN_TX
} from '../types'

const state = {
  name: '',
  path: 'github.com/conseweb/common/assets/lepuscoin',
  balance: 0,
  tx: '',
  txIn: [],
  txOut: [],
  methods: {
    deploy: [
      'deploy'
    ],
    invoke: [
      'invoke_coinbase',
      'invoke_transfer'
    ],
    query: [
      'query_addrs',
      'query_tx',
      'query_coin'
    ]
  }
}

const mutations = {
  [SET_LEPUSCOIN_NAME] (state, name) {
    if (name !== null && name !== '') {
      state.name = name
    }
  },
  [SET_LEPUSCOIN_TX] (state, body, tx) {
    if (tx !== null && tx !== '') {
      state.txIn = body.in
      state.txOut = body.out
      state.tx = tx
    }
  }
  // [SET_LEPUSCOIN_TXIN] (state, txIn) {
  //   if (txIn !== null && txIn !== '') {
  //     state.txIn = txIn
  //   }
  // },
  // [SET_LEPUSCOIN_TXOUT] (state, txOut) {
  //   if (txOut !== null && txOut !== '') {
  //     state.txOut = txOut
  //   }
  // }
}

export default {
  state,
  mutations
}
