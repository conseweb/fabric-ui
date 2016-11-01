export const isLogin = state => {
  return () => {
    const account = state.account
    if (account.logined) {
      return true
    }
    if (account.id) {
      return true
    }
    return false
  }
}

export const lepuscoinCc = state => {
  return () => {
    console.log('get cc', state)
    for (var i = 0; i < state.chaincode.length; i++) {
      if (state.chaincode[i].alias === 'lepuscoin') {
        return state.chaincode[i]
      }
    }
  }
}
