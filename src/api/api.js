import {
  // RootResource,
  AccountResource,
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
  }
}
