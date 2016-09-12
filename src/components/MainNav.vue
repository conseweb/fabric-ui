<template>
  <div id="main-nav">
    <nav id="nnav">
        <ul>
          <li><a v-link="{path:'/dashboard'}">Dash Board</a></li>
          <li><a v-link="'home'">Home</a></li>
          <li><a v-link="'home'">About</a></li>
          <li><a v-link="'home'">Projects</a></li>
          <li><a v-link="'home'">Contact</a></li>
        </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import {nnav} from 'responsive-nav'

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  components: {
    nnav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
