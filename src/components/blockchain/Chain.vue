<template>
  <div id="chain">
    <h1>Chain {{msg}}</h1>
    <a class="refresh" @click="refreshChain">
      <i class="fa fa-refresh fa-2x fa-fw"
        :class="{'fa-spin': isSyncd}"></i>
    </a>
    <p>深度: {{height}} </p>
    <p>当前区块HASH: {{currentBlockHash | showHash}} </p>
    <p>上一个区块HASH: {{previousBlockHash | showHash}} </p>

    <div>
      <h2>Block Number: {{blockCount}}</h2>
      <a class="refresh" @click="updateHand">
        <i class="fa fa-refresh fa-2x fa-fw"
          :class="{'fa-spin': isSyncd}"></i>
      </a>
      <div>
        <block  v-for="blk in blocks" track-by="$index" :height=$index :block=blk></block>
      </div>
    </div>
  </div>
</template>

<script>
import Block from './Block'
import {getChain, getBlock} from '../../vuex/actions'

export default {
  components: {
    Block
  },
  data () {
    return {
      msg: 'Hello',
      isSyncd: false,
      show: false
    }
  },
  computed: {
    blockCount: function () {
      if (this.blocks === null) {
        return 0
      }
      return this.blocks.length
    }
  },
  vuex: {
    getters: {
      height: state => state.chain.height,
      currentBlockHash: state => state.chain.currentBlockHash,
      previousBlockHash: state => state.chain.previousBlockHash,
      blocks: state => state.chain.blocks
    },
    actions: {
      getBlock,
      refreshChain: function () {
        this.isSyncd = true
        getChain(this.$store)
        this.isSyncd = false
      },
      updateHand: function () {
        for (var i = 0; i < this.height; i++) {
          getBlock(this.$store, i)
        }
      }
    }
  },
  ready: function () {
    getChain(this.$store)
  }
}
</script>
<style scoped>
.chain {
  border-bottom: 10px;
}

.refresh {
  color: #555;
  cursor:pointer;
}

.refresh:hover {
  color: #000;
}
</style>
