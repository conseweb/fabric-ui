<template>
<div id="signup">
  <confirm :show.sync="showConfirm"></confirm>
  <h1>注册账号</h1>
  <div id="err-msg">
    <ul class="bg-danger" >
      <li v-for="err in errMsgs"><h4>{{err}}</h4></li>
    </ul>
  </div>
  <div class="input-group input-group-lg" :class="{'has-error': !usernameOk}">
    <span class="input-group-addon fa fa-user fa-3x"></span>
    <input 
      type="text" 
      class="form-control"
      v-model="username"
      placeholder="Username">
  </div>
  <div class="input-group input-group-lg" :class="{'has-error': !phoneOk}">
    <span class="input-group-addon fa fa-phone fa-4x"></span>
    <input
      type="tel"
      class="form-control"
      v-model="phone"
      placeholder="Phone Number">
  </div>
  <div class="input-group input-group-lg" :class="{'has-error': !passwordOk}">
    <span class="input-group-addon fa fa-lock fa-4x"></span>
    <input
      type="password"
      class="form-control"
      v-model="password"
      placeholder="Password">
  </div>
  <div class="input-group input-group-lg" :class="{'has-error': !confirmOk}">
    <span class="input-group-addon fa fa-unlock-alt fa-4x"></span>
    <input
      type="password"
      class="form-control"
      v-model="confirm"
      placeholder="Confirm">
  </div>
  <button type="button"
    class="btn btn-success"
    :class="{'disabled': !ok}"
    @click="submit">
    提__<span class="fa fa-motorcycle fa-2x"></span>__交
  </button>
  <!-- <div></div> -->
</div>
</template>

<script>
import Confirm from './Confirm'

export default {
  components: {
    Confirm
  },
  data () {
    return {
      showConfirm: false,
      errMsgs: [],
      username: '',
      phone: '',
      password: '',
      confirm: ''
    }
  },
  computed: {
    user: function () {
      return {
        username: this.username,
        phone: this.phone,
        password: this.password
      }
    },
    usernameOk: function () {
      return this.username.length > 4 || this.username === ''
    },
    phoneOk: function () {
      return this.phone.length === 11 || this.phone === ''
    },
    passwordOk: function () {
      return this.password.length > 7 || this.password === ''
    },
    confirmOk: function () {
      return this.password === this.confirm
    },
    ok: function () {
      if (true) { return true }
      return this.usernameOk && this.username !== '' &&
        this.phoneOk && this.phone !== '' &&
        this.passwordOk && this.password !== '' &&
        this.confirmOk && this.confirm !== ''
    }
  },
  methods: {
    submit: function () {
      if (!this.ok) { return }
      this.errMsgs = []
      this.showConfirm = true
    }
  }
}
</script>

<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#signup {
  color: #2c3e50;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#signup a {
  color: #42b983;
  text-decoration: none;
}

#err-msg ul {
  text-align: left;
  border-top: 2px;
  border-bottom: 2px;
}

.input-group {
  text-align: center;
}
</style>