<template>
  <div>
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
    <button type="button" class="btn btn-success" @click="increment">+</button>
    <button type="button" class="btn btn-success" @click="decrement">-</button>
    <button type="button" class="btn btn-success" @click="incrementIfOdd">Increment if odd</button>
    <button type="button" class="btn btn-success" @click="incrementAsync">Increment async</button>
    <div>
      <div>Recent History: {{recentHistory}}</div>
    </div>
  </div>
</template>

<script>
import MainNav from './MainNav'

import * as actions from '../vuex/actions'
import {loadCount} from '../vuex/getters/count'

export default {
  data () {
    return {
      msg: 'hello'
    }
  },
  vuex: {
    getters: {
      loadCount,
      count: state => state.count.count,
      account: state => state.account.state
    },
    actions: actions,
    components: {
      MainNav
    }
  }
}
</script>
