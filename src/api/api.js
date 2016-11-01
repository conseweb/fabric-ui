import {
  // RootResource,
  AccountResource,
  DeviceResource,
  SignupResource,
  ChainResource,
  BlockResource,
  TransactionResource,
  PeersResource,
  ChaincodeResource
} from './resouces.js'

// get: {method: 'GET'},
// save: {method: 'POST'},
// query: {method: 'GET'},
// update: {method: 'PUT'},
// remove: {method: 'DELETE'},
// delete: {method: 'DELETE'}
export default {
  loadAccountState: function () {
    return AccountResource.get({action: ''})
  },

  login: function (body) {
    return AccountResource.save({action: 'login'}, body)
  },
  logout: function () {
    return AccountResource.remove({action: 'logout'})
  },

  // registry Account
  setVerificationEmail: function (body) {
    return SignupResource.save({action: 'email'}, body)
  },
  setVerificationPhone: function (body) {
    return SignupResource.save({action: 'phone'}, body)
  },
  verifyCaptcha: function (body) {
    return SignupResource.update({action: 'captcha'}, body)
  },
  registryUser: function (body) {
    return SignupResource.save({}, body)
  },

  getChain: function () {
    return ChainResource.get()
  },
  getBlock: function (height) {
    return BlockResource.get({height: height})
  },
  getTransaction: function (uuid) {
    return TransactionResource.get({UUID: uuid})
  },
  getPeers: function () {
    return PeersResource.get()
  },
  callChaincode: function (body) {
    return ChaincodeResource.save({}, body)
  },
  saveChaincode: function (alisa, name, path) {
    return ChaincodeResource.save({action: alisa}, {name: name, path: path})
  },
  listChaincodes: function () {
    return ChaincodeResource.get({})
  },
  getLepuscoinCC: function () {
    return ChaincodeResource.get({action: 'lepuscoin'})
  },
  getCoinbaseTx: function (addr) {
    return DeviceResource.get({action: addr + '/coinbase_tx'})
  },
  getTxSeque: function (body) {
    return DeviceResource.save({action: '_/tx'}, body)
  }
}
