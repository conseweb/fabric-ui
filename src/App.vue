<template>
  <div id="app">
    <router-view></router-view>
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

