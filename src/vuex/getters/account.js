export const isLogin = state => {
  return () => {
    const account = state.account
    console.log('check is logined.', account)
    if (account.logined) {
      console.log('account is already logined')
      return true
    }
    if (account.id) {
      console.log('account.id', account.id)
      return true
    }
    return false
  }
}
