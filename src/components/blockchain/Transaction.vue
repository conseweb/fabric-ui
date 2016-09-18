<template>
<div>
  <h3>Transactions</h3>
   <p>Chaincode ID: {{chaincodeID | showHash}}</p>
  <p>Payload: {{payload | showHash}}</p>
  <p>Txid: <a @click="">{{txid}}</a> </p>
  <p>type: {{type}}</p>
  <p>timestamp: {{timestamp | unixToDate}}</p>
</div>
</template>

<script>
export default {
  props: {
    trans: [Object]
  },
  computed: {
    transactions: function () {
      return []
    },
    chaincodeID: function () {
      if (this.trans !== null) {
        return this.trans.chaincodeID
      }
      return ''
    },
    payload: function () {
      if (this.trans !== null) {
        return this.trans.payload
      }
      return ''
    },
    timestamp: function () {
      if (this.trans !== null) {
        return this.trans.timestamp.seconds * 1000
      }
      return 0
    },
    txid: function () {
      if (this.trans !== null) {
        return this.trans.txid
      }
      return ''
    },
    type: function () {
      switch (this.trans.type) {
        case 1: return 'deploy'
        case 2: return 'invoke'
        case 3: return 'query'
      }
    }
  },
  methods: {
    getTrans: function () {
      return ''
    }
  }
}
</script>
