<template>
  <div class="peer">
    <h1>Peer</h1>
    <div>
      <h3>Name: {{name}}</h3>
      <p>address: {{address}}</p>
      <p>type: {{type}}</p>
    </div>
  </div>
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
