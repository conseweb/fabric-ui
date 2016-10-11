<template>
  <div id="app">
    <header>
      <h2 v-link="{path:'/dashboard'}">Farmer</h2>
      <h5>(dev)</h5>
    </header>
    <router-view></router-view>
    <footer>
    </footer>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-strap/dist/vue-strap'

import store from './vuex/store'

export default {
  data () {
    return {
      isLogin: true
    }
  },
  store
}
</script>

<style>
header {
  color: #42b983;
  font-size: 24px;
  padding-left: 20px;
  background-color: #ccc;
}
h2,h4,h5 {
  display: inline;
}
h2 {
  cursor:pointer;
}
</style>
