<template>
  <div id="chain" @scroll="onScroll($event)">
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
      <div v-for="blk in blocks|reverse" track-by="$index">
        <block :height="blocks.length-1-$index" v-if="blk != null" :block=blk></block>
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
      show: false,
      scrollTimes: 0,
      currentMin: 0
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
        if (this.currentMin === 0) {
          this.currentMin = this.height - 1
        }
        let once = 10
        for (var i = this.currentMin; i >= 0 && once > 0; i--, once--) {
          getBlock(this.$store, i)
          this.currentMin = i
        }
      }
    }
  },
  methods: {
    onScroll: function (event) {
      if (event.target.scrollHeight === event.target.scrollTop + event.currentTarget.offsetHeight) {
        this.scrollTimes++
        if (this.scrollTimes > 0) {
          this.updateHand()
          this.scrollTimes = 0
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
#chain {
  border: 0px solid;
  border-bottom: 10px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.refresh {
  color: #555;
  cursor:pointer;
}

.refresh:hover {
  color: #000;
}
</style>
