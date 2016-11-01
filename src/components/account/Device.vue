<template>
<div class="device">
    <div>Mac: <span>{{device.mac}}</span></div>
    <div>OS: <span>{{device.os}}</span></div>
    <div>Wallet Address: <span>{{device.address}}</span></div>
</div>
</template>

<script>
import apiActions from '../../api/api'

export default {
  props: {
    device: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data () {
    return {
      seconds: 90
    }
  },
  computed: {
  },
  created: function () {
    if (true) { return }
    apiActions.getCoinbaseTx(this.device.address).then(resp => {
      console.log('get coinbase tx', resp.body.message)
    }, resp => {
      console.log('get coinbase tx', resp)
    })
  },
  ready: function () {
    // console.log('[data]', this.device)
  }
}
</script>
