import {AccountResource} from './resouces.js'

export default {
  getAccountState: function (data) {
    return AccountResource.save({method: 'state'}, data)
  }
}
