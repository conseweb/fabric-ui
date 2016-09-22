<template>
<div class="transaction">
  <a @click="chageShow">{{txid}}</a>
  <div v-if="show">
    <p><strong>Chaincode ID: </strong>{{chaincodeID | showHash}}</p>
    <p><strong>Payload: </strong>{{payload | showHash}}</p>
    <p><strong>Txid: </strong><a @click="">{{txid}}</a> </p>
    <p><strong>type: </strong>{{type}}</p>
    <p><strong>timestamp: </strong>{{timestamp | unixToDate}}</p></div>
  </div>
</template>

<script>
export default {
  props: {
    trans: [Object]
  },
  data () {
    return {
      show: false
    }
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
    },
    chageShow: function () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
.transaction {
  white-space: normal;
  word-wrap: break-word;
  border: 3px;
}

a {
  cursor:pointer;
}
</style>
