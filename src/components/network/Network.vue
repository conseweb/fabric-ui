<template>
  <div id="chain">
    <h1>Peers</h1>
    <div>
      <ul>
        <peer v-for="peer in peers" :peer=peer></peer>
      </ul>
    </div >
  </div>
</template>

<script>
import Peer from './Peer'
import {getPeers} from '../../vuex/actions'

export default {
  components: {
    Peer
  },
  computed: {
  },
  vuex: {
    getters: {
      peers: state => state.network.peers
    },
    actions: {
      getPeers
    }
  },
  ready: function () {
    getPeers(this.$store)
  }
}
</script>
<style scoped>
.refresh {
  color: #555;
  cursor:pointer;
}

.refresh:hover {
  color: #000;
}
</style>
