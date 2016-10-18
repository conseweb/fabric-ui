export const isLogin = state => {
  return () => {
    const account = state.account
    // console.log('check is logined.', account)
    if (account.logined) {
      return true
    }
    if (account.id !== '') {
      return true
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log('account not login, but in model', process.env.NODE_ENV)
      return true
    }
    return false
  }
}
