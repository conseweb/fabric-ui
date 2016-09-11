import {
  USERINFO_SUCCESS,
  USERINFO_FAILURE,
  INCREMENT,
  DECREMENT
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
