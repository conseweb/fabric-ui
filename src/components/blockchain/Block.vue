<template>
  <div class="block">
    <h1>Block</h1>
    <div>
      <p>previousBlockHash: {{previousBlockHash | showHash}}</p>
      <p>timestemp: {{timestemp | unixToDate}}</p>
      <div>
        <transaction v-for="t in transactions" :trans=t></transaction>
      </div>
    </div>
  </div>
</template>

<script>
import Transaction from './Transaction'

export default {
  props: {
    block: [Object, String]
  },
  components: {
    Transaction
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
