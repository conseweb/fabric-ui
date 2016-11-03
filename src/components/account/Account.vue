<template>
  <div id="account">
    <transfer :show.sync="showTransfer" :devices.sync="devices"></transfer>
    <div id="err-msg" class="alert alert-danger" role="alert" v-if="errMsgs.length !== 0">
      <p v-for="err in errMsgs">{{err}}</p>
    </div>

    <div>
      <div>
        Name: <h4>{{account.nicename}}</h4>
      </div>
      <div>
        Email: <h4>{{account.email}}</h4>
      </div>
      <div>
        Phone: <h4>{{account.phone}}</h4>
      </div>
      <div>
        Lepuscoin: <h4>{{lepuscoinCc.name}}</h4>
      </div>
      <div>
        Tx...: <h4>{{lepuscoinCc.tx}}</h4>
      </div>
      <button @click="transfer">Transfer</button>

      <div>
        <h3>Devices</h3>
        <device v-for="dev in devices" track-by="$index" :device.sync=dev></device>
      </div>

      <button @click="sshow">Sshow</button>
      <button @click="coinbase">Coinbase</button>
      <br>
      <button @click="deploy">Deploy</button>
      <button @click="query">Query</button>
      <button @click="getTransfer">GetTransfer</button>
      <button @click="doTransfer">DoTransfer</button>
    </div>  
  </div>
</template>

<script>
import {deployLepuscoinCC, updateTx} from '../../vuex/actions'
import apiActions from '../../api/api'
import Device from './Device'
import Transfer from './Transfer'

export default {
  components: {
    Device,
    Transfer
  },
  data () {
    return {
      showTransfer: false,
      errMsgs: [],
      name: 'hello',
      txOut: [],
      txIn: [],
      txStr: ''
    }
  },
  methods: {
    syncAccount: function () {
      console.log('[data]', '[...]')
    },
    sub: function () {
      console.log(this.$route)
      this.$router.go({path: '/login'})
      console.log('clicked', '[...]')
    },
    deploy: function () {
      console.log('deploy', deployLepuscoinCC(this.$store))
    },
    transfer: function () {
      this.showTransfer = true
    },
    sshow: function () {
      var str = '{"accounts":{"mtCLPxw18uxFMK1tbWLCVxJa4Tby7My7aM":{"addr":"mtCLPxw18uxFMK1tbWLCVxJa4Tby7My7aM","balance":1000000,"txouts":{"67420b7be216f150040ea3d53b8b4be69fc357d544986a630ecd0739e6198039:0":{"value":1000000,"addr":"mtCLPxw18uxFMK1tbWLCVxJa4Tby7My7aM"}}}}}'
      let ret = JSON.parse(str)
      console.log('query ret: ', ret)
      let txIn = []
      let txOut = [{
        addr: outAddr,
        amount: outAmount
      }]
      var outAddr = 'abc'
      var outAmount = 100
      for (let addr in ret.accounts) {
        let d = ret.accounts[addr]
        for (let hi in d.txouts) {
          let hashIndex = hi.split(':')
          txIn.push({
            addr: addr,
            pre_tx_hash: hashIndex[0],
            tx_out_index: hashIndex[1],
            balance: d.txouts[hi].Value
          })
        }
      }
      if (txIn.length > 0) {
        updateTx(this.$store, {in: txIn, out: txOut})
      }
    },
    query: function () {
      console.log('query account blan')
      let cc = this.lepuscoinCc
      if (cc.name === '') {
        console.log('not found lepuscoin chaincode name')
        return
      }
      let addrs = []
      for (let d in this.devices) {
        let dev = this.devices[d]
        if (dev.address !== null && dev.address !== '') {
          addrs.push(this.devices[d].address)
        }
      }
      let b = {
        name: cc.name,
        path: cc.path,
        method: 'query',
        function: 'query_addrs',
        args: addrs
      }
      var outAddr = 'abc'
      var outAmount = 100
      apiActions.callChaincode(b).then(queryResp => {
        let ret = JSON.parse(queryResp.body.result.message)
        console.log('query ret: ', ret)
        this.txIn = []
        this.txOut = [{
          addr: outAddr,
          amount: outAmount
        }]
        for (let addr in ret.accounts) {
          let d = ret.accounts[addr]
          for (let hi in d.txouts) {
            let hashIndex = hi.split(':')
            this.txIn.push({
              addr: addr,
              pre_tx_hash: hashIndex[0],
              tx_out_index: hashIndex[1],
              balance: d.txouts[hi].value
            })
          }
        }
      }, queryResp => {
        console.log('get coinbase tx', queryResp)
      })
    },
    getTransfer: function () {
      if (this.txIn.length !== 0 || this.txOut.length !== 0) {
        updateTx(this.$store, {in: this.txIn, out: this.txOut})
      }
    },
    doTransfer: function () {
      if (this.lepuscoinCc.tx === '') {
        console.log('need tx')
        return
      }
      var body = {
        name: this.lepuscoinCc.name,
        path: 'github.com/conseweb/common/assets/lepuscoin',
        method: 'invoke',
        function: 'invoke_transfer',
        args: [this.lepuscoinCc.tx]
      }
      apiActions.callChaincode(body).then(resp => {
        console.log('call deploy', resp)
        if (resp.body.error != null) {
          console.log(resp.body.error)
        }
        let msg = resp.body.result.message
        console.log('call message', msg)
      }, resp => {
        console.log('call deploy', resp)
        if (resp.body != null) {
          return resp.body.error
        }
        return '404 not found'
      })
    },
    coinbase: function () {
      console.log('[data]', '[...]')
    }
  },
  vuex: {
    getters: {
      lepuscoinCc: state => state.ccLepuscoin,
      account: state => state.account,
      devices: state => state.account.devices
    }
  },
  ready: function () {
    console.log('ready Account')
  }
}
</script>
