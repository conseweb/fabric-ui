<template>
  <div class="not-found">
    <h1>Not Found: {{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Halo!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
