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
