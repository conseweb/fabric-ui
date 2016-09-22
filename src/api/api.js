import {
  AccountResource,
  SignupResource,
  ChainResource,
  BlockResource,
  TransactionResource,
  PeersResource
} from './resouces.js'

export default {
  loadAccountState: function () {
    return AccountResource.get({id: 'state'})
  },
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
  }
}
