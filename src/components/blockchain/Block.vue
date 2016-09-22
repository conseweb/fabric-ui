<template>
  <div class="block">
    <h1 @click="chageShow">Block {{height}}</h1>
    <div v-if="show">
      <p>previousBlockHash: {{previousBlockHash | showHash}}</p>
      <p>timestemp: {{timestemp | unixToDate}}</p>
      <div>
        <h3 v-if="transactions.length !== 0">Transactions:</h3>
        <transaction v-for="t in transactions" track-by="txid" :trans=t></transaction>
      </div>
    </div>
  </div>
</template>

<script>
import Transaction from './Transaction'

export default {
  props: {
    block: [Object, String],
    height: Number
  },
  components: {
    Transaction
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    chageShow: function () {
      this.show = !this.show
    }
  },
  computed: {
    previousBlockHash: function () {
      if (this.block !== null) {
        if (this.block.previousBlockHash !== null) {
          return this.block.previousBlockHash
        }
      }
      return ''
    },
    timestemp: function () {
      if (this.block !== null) {
        if (this.block.nonHashData !== null) {
          return this.block.nonHashData.localLedgerCommitTimestamp.seconds * 1000
        }
      }
      return 0
    },
    transactions: function () {
      if (this.block !== null) {
        if (this.block.transactions !== null) {
          return this.block.transactions
        }
      }
      return []
    }
  },
  ready: function () {
  }
}
</script>

<style scoped>
h1 {
  cursor:pointer;
}
</style>
