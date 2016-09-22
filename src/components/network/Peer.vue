<template>
  <li class="peer">
    <div class="peer-title">
      <span><h2>Peer: {{name}}</h2></span>
      <span class="peer-type">[{{type}}]</span>
    </div>
    <div>
      <p>address: {{address}}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    peer: [Object]
  },
  computed: {
    name: function () {
      return this.peer.ID.name
    },
    address: function () {
      return this.peer.address
    },
    type: function () {
      switch (this.peer.type) {
        case 1: return 'VALIDATOR'
        case 2: return 'NON_VALIDATOR'
      }
    }
  }
}
</script>

<style scoped>
.peer-title {
  margin-bottom: 15px;
}
.peer-title h2{
  display : inline;
  margin-right: 5px;
}
.peer-type {
  color: #AAA;
}
</style>
