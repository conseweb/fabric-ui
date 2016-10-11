<template>
  <div id="login">
    <h1>Login</h1>
    <div id="err-msg" class="alert alert-danger" role="alert" v-if="errMsgs.length !== 0">
      <p v-for="err in errMsgs">{{err}}</p>
    </div>

    <div class="input-group input-group-lg" :class="{'has-error': !EoPok}">
      <span class="input-group-addon fa fa-user fa-3x"></span>
      <input 
        type="text" 
        class="form-control"
        v-model="emailOrPhone"
        placeholder="Mobile/Email">
    </div>
    <div class="input-group input-group-lg" :class="{'has-error': !passwordOk}">
      <span class="input-group-addon fa fa-lock fa-4x"></span>
      <input
        type="password"
        class="form-control"
        v-model="password"
        placeholder="Password">
    </div>
    <div class="checkbox">
      <label>
        <input type="checkbox" v-model="rememberMe"> Remember Me
      </label>
    </div>

    <button type="button"
      class="btn btn-success"
      @click="submit">
      提__<span class="fa fa-motorcycle fa-2x"></span>__交
    </button>
  </div>
</template>

<script>
import apiActions from '../../api/api'
import {setAccount} from '../../vuex/actions'

export default {
  data () {
    return {
      errMsgs: [],
      emailOrPhone: '',
      password: '',
      rememberMe: false,
      EoPok: true, // Email or Phone OK?
      passwordOk: true
    }
  },
  methods: {
    submit: function () {
      let ok = true
      let eop = this.emailOrPhone
      let body = {password: this.password}
      if (eop.length < 5) {
        this.EoPok = false
        ok = false
      }
      if (this.password.length < 5) {
        this.passwordOk = false
        ok = false
      }
      if (eop.indexOf('@') < 0) {
        // should be a phone number
        body.phone = eop
        if (eop.length !== 11) {
          this.EoPok = false
          ok = false
        }
      } else {
        body.email = eop
      }
      this.errMsgs = []
      if (!ok) {
        return
      }

      apiActions.Login(body).then(resp => {
        setAccount(this.$store, resp.body)
      }, resp => {
        if (resp.body !== null) {
          this.errMsgs.push(resp.body.error)
        } else {
          this.errMsgs.push('无法连接到服务器')
        }
        console.log(resp)
      })
      console.log(this.emailOrPhone, this.password, this.rememberMe)
      console.log(this)
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

#login {
  color: #2c3e50;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#login a {
  color: #42b983;
  cursor:pointer;
  text-decoration: none;
}

#login .checkbox {
  text-align: left;
  font-size: 18px;
}

#err-msg {
  text-align: left;
  border-top: 2px;
  border-bottom: 2px;
}

.input-group {
  text-align: center;
}

</style>
