<template>
  <div id="not-found">
    <h2>{{ msg }}</h2>
    <h1> Not Found! </h1>
    <a v-link="{path:'/'}"><h2> 回到首页</h2></a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Halo, 请叫我王导.🎩'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#not-found {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#not-found a {
  color: #42b983;
  text-decoration: none;
}
</style>
