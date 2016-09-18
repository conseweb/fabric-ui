import {
  AccountResource,
  ChainResource,
  BlockResource,
  TransactionResource,
  PeersResource
} from './resouces.js'

export default {
  loadAccountState: function () {
    return AccountResource.get({id: 'state'})
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
