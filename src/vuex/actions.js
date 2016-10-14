import {
  USERINFO_SUCCESS,
  USERINFO_FAILURE,
  INCREMENT,
  DECREMENT,
  GET_CHAIN_SUCC,
  GET_BLOCK_SUCC,
  GET_PEERS_SUCC,
  ADD_CHAINCODE_SUCC,
  REQUEST_ERR,
  SET_ACCOUNT
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
  api.loadAccountState().then(response => {
    if (!response.ok) {
      return dispatch(USERINFO_FAILURE)
    }
    console.log('getAccountState: ', response)
    dispatch(USERINFO_SUCCESS, { state: response.data })
  }, response => {
    console.log('getAccountState: ', response)
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
