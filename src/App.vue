<template>
  <div id="app">
    <!-- <hello></hello> -->
    <p>
      Welcome, Farmer!
    </p>
    <p>
      {{ state }}
    </p>
    <button @click="getAccountState">Oh, MG</button>

    <div>
      Value: {{ count }}      
    </div>
    <div>
      Value: {{ loadCount }}      
    </div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
    <div>
      <div>Recent History: {{recentHistory}}</div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import VueSocketio from 'vue-socket.io'

import * as actions from './vuex/actions'
import store from './vuex/store'
import {loadCount} from './vuex/getters/count'
// import {API_ROOT} from './config'

// Vue.use(VueSocketio, API_ROOT + '/evt')

export default {
  store,
  vuex: {
    getters: {
      loadCount,
      count: state => state.count.count,
      account: state => state.account.state
    },
    actions: actions
  }
  // watch: {
  //   messages: () => {
  //     console.log('message...', '[...]')
  //   }
  // },
  // sockets: {
  //   on: () => {
  //     console.log('on...')
  //   },
  //   connect: () => {
  //     console.log('connect...', '[...]')
  //   },
  //   customEmit: () => {
  //     console.log('customEmit', '[...]')
  //   },
  //   onopen: () => {
  //     console.log('[data] onopen')
  //   },
  //   onmessage: (msg) => {
  //     console.log('[data] onmessage', msg)
  //   }
  // }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
