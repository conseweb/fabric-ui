<template>
  <div id="account">
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
        <h3>Devices</h3>
        <device v-for="dev in devices" track-by="$index" :device.sync=dev></device>
      </div>

      <button @click="deploy">Deploy</button>
      <button @click="sshow">Sshow</button>
      <button @click="query">Query</button>
    </div>  
  </div>
</template>

<script>
import Device from './Device'
import {deployLepuscoinCC} from '../../vuex/actions'
import apiActions from '../../api/api'
import {lepuscoinCc} from '../../vuex/getters/getters'

export default {
  components: {
    Device
  },
  data () {
    return {
      name: 'hello'
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
    sshow: function () {
      console.log('lepuscoin chaincode ', this.lepuscoinCc())
    },
    query: function () {
      console.log('query account blan')
      apiActions.getCoinbaseTx(this.device.address).then(resp => {
        console.log('get coinbase tx', resp.body.message)
      }, resp => {
        console.log('get coinbase tx', resp)
      })
    }
  },
  vuex: {
    getters: {
      lepuscoinCc,
      account: state => state.account,
      devices: state => state.account.devices
    }
  },
  ready: function () {
    console.log('ready Account', this.account)
  }
}
</script>
