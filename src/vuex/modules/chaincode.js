import {
  ADD_CHAINCODE_SUCC,
  UPDATE_CHAINCODE_NAME,
  REQUEST_ERR
} from '../types'

const state = [
  {
    alias: 'lepuscoin',
    name: '',
    path: 'github.com/conseweb/common/assets/lepuscoin',
    // map method--function--argsLength(-1 means any)
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
  },
  {
    alias: 'example02',
    name: '',
    path: 'github.com/hyperledger/fabric/examples/chaincode/go/chaincode_example02',
    methods: {
      deploy: [
        'init'
      ],
      invoke: [
        'delete',
        'invoke'
      ],
      query: [
        'query'
      ]
    }
  }
]

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
  [UPDATE_CHAINCODE_NAME] (state, name, path) {
    for (var i = 0; i < state.length; i++) {
      let cc = state[i]
      if (cc.path === path) {
        cc.name = name
        state.$set(i, cc)
        console.log('set chaincode path', path)
      }
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
