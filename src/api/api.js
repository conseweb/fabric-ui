import {AccountResource} from './resouces.js'

export default {
  loadAccountState: function () {
    return AccountResource.get({id: 'state'})
  }
}
