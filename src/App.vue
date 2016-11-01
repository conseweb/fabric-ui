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
import {isLogin} from './vuex/getters/getters'
import {setAccount} from './vuex/actions'
import apiActions from './api/api'

export default {
  store,
  data () {
    return {
      errMsgs: []
      // isLogin: true
    }
  },
  vuex: {
    getters: {
      isLogin
    }
  },
  created: function () {
    console.log('created App', this.isLogin())
    if (!this.isLogin()) {
      apiActions.loadAccountState().then(resp => {
        setAccount(this.$store, resp.body)
      }, resp => {
        if (resp.body !== null) {
          this.errMsgs.push(resp.body.error)
        } else {
          this.errMsgs.push('无法连接到服务器')
        }
        console.log(resp)
      })
    }
  }
}
</script>

<style>
header {
  color: #42b983;
  font-size: 26px;
  padding-left: 20px;
  background-color: #efe;
}
h2,h4,h5 {
  display: inline;
}
h2 {
  cursor:pointer;
}
</style>
