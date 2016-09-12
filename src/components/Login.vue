<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username">
    <div>
      <a href="#" v-link="{path:'/'}">Home</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style>
  
</style>
