<template>
  <div>
    <p>
      {{msg}}
    </p>
    <p>
      {{ state }}
    </p>
  </div>
</template>

<script>
import * as actions from '../vuex/actions'

export default {
  data () {
    return {
      msg: 'Nothing!!! Poor farmers!'
    }
  },
  vuex: {
    getters: {
      account: state => state.account.state
    },
    actions: actions
  }
}
</script>
