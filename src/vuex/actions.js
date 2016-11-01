import {
  USERINFO_SUCCESS,
  USERINFO_FAILURE,
  INCREMENT,
  DECREMENT,
  GET_CHAIN_SUCC,
  GET_BLOCK_SUCC,
  GET_PEERS_SUCC,
  ADD_CHAINCODE_SUCC,
  UPDATE_CHAINCODE_NAME,
  REQUEST_ERR,
  SET_ACCOUNT,
  UPDATE_DEVICES
} from './types'
import api from '../api/api'

export const increment = ({ dispatch }) => dispatch(INCREMENT)
export const decrement = ({ dispatch }) => dispatch(DECREMENT)

export const incrementIfOdd = ({ dispatch, state }) => {
  if ((state.count + 1) % 2 === 0) {
    dispatch(INCREMENT)
  }
}

export const incrementAsync = ({ dispatch }) => {
  setTimeout(() => {
    dispatch(INCREMENT)
  }, 1000)
}

export const getAccountState = ({ dispatch }) => {
  api.loadAccountState().then(resp => {
    if (!resp.ok) {
      return dispatch(USERINFO_FAILURE)
    }
    console.log('getAccountState: ', resp)
    dispatch(USERINFO_SUCCESS, { state: resp.data })
  }, resp => {
    console.log('getAccountState: ', resp)
    dispatch(USERINFO_FAILURE)
  })
}

export const setAccount = ({ dispatch }, account) => {
  dispatch(SET_ACCOUNT, account)
}

export const getChain = ({ dispatch }) => {
  api.getChain().then(resp => {
    if (!resp.ok) {
      dispatch(REQUEST_ERR, resp.status + resp.statusText)
    } else {
      dispatch(GET_CHAIN_SUCC, resp.body)
    }
  }, resp => {
    dispatch(REQUEST_ERR, resp.status + resp.statusText)
  })
}

export const getBlock = ({ dispatch }, height) => {
  api.getBlock(height).then(resp => {
    if (!resp.ok) {
      dispatch(REQUEST_ERR, resp.status + resp.statusText)
    } else {
      dispatch(GET_BLOCK_SUCC, height, resp.body)
    }
  }, resp => {
    dispatch(REQUEST_ERR, resp.status + resp.statusText)
  })
}

export const getPeers = ({ dispatch }) => {
  api.getPeers().then(resp => {
    if (!resp.ok) {
      dispatch(REQUEST_ERR, resp.status + resp.statusText)
    } else {
      dispatch(GET_PEERS_SUCC, resp.body)
    }
  }, resp => {
    dispatch(REQUEST_ERR, resp.status + resp.statusText)
  })
}

export const addChaincode = ({ dispatch }, cc) => {
  dispatch(ADD_CHAINCODE_SUCC, cc)
}

// Chaincode
export const deployLepuscoinCC = ({ dispatch }) => {
  var body = {
    path: 'github.com/conseweb/common/assets/lepuscoin',
    method: 'deploy',
    function: 'deploy'
  }
  api.callChaincode(body).then(resp => {
    console.log('call deploy', resp)
    if (resp.body.error != null) {
      return resp.body.error
    }
    let ccName = resp.body.result.message
    console.log('call message', ccName)
    api.saveChaincode('lepuscoin', ccName).then(r => {
      dispatch(UPDATE_CHAINCODE_NAME, ccName, body.path)
      console.log('save lepuscoin chaincode successful.')
    }, r => {
      console.log('save lepuscoin chaincode failed.')
    })
    return resp.body.result.message
  }, resp => {
    console.log('call deploy', resp)
    if (resp.body != null) {
      return resp.body.error
    }
    return '404 not found'
  })
}

export const updateBalance = ({ dispatch }, ccName, addrs) => {
  var body = {
    name: ccName,
    path: 'github.com/conseweb/common/assets/lepuscoin',
    method: 'query',
    function: 'query_addrs',
    args: addrs
  }
  api.callChaincode(body).then(resp => {
    console.log('update devices', resp)
    dispatch(UPDATE_DEVICES, resp.body)
  }, resp => {
    console.log('call chaincode error', resp)
  })
}
