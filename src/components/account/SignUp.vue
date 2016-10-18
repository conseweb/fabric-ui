<template>
<div id="signup">
  <h1>注册账号</h1>
  <a v-link="{path:'/login'}">Login</a>
  <passphrase :show.sync="showPassphrase" :msg.sync="passphrase"></passphrase>
  <div id="err-msg" class="alert alert-danger" role="alert" v-if="errMsgs.length !== 0">
    <p v-for="err in errMsgs">{{err}}</p>
  </div>

  <div id="email-confirm">
    <div class="input-group input-group-lg" :class="{'has-success': emailPass}">
      <span class="input-group-addon fa fa-at fa-3x"></span>
      <input 
        :disabled.sync=emailPass
        type="email" 
        class="form-control"
        v-model="email"
        placeholder="Email">
      <span class="input-group-btn">
        <button class="btn btn-default"
          type="button"
          @click="submitEmail"
          :disabled.sync=!emailOk||emailPass>
          {{emailSubmitMsg}}
        </button>
      </span>
    </div>
    <div class="input-group input-group-lg" :class="{'has-success': emailPass}">
      <span class="input-group-addon fa fa-gift fa-3x"></span>
      <input type="text"
        class="form-control"
        v-model="captcha"
        placeholder="输入验证码"
        :disabled.sync=emailPass>
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" :disabled.sync=emailPass @click="verifyCaptcha">验证</button>
      </span>
    </div>
  </div>

  <div id="account-info" :class="{'disabled': !ok}">
    <div class="input-group input-group-lg" :class="{'has-error': !usernameOk}">
      <span class="input-group-addon fa fa-user fa-3x"></span>
      <input 
        type="text" 
        class="form-control"
        v-model="username"
        placeholder="Username">
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
    <div class="input-group input-group-lg">
      <span class="input-group-addon fa fa-language fa-4x"></span>
      <select class="form-control" v-model="language">
        <option v-for="l in languageSupport" track-by="$index">{{l}}</option>
      </select>
    </div>

    <button type="button"
      class="btn btn-success"
      :disabled.sync="!emailPass||!ok"
      @click="submit">
      提__<span class="fa fa-motorcycle fa-2x"></span>__交
    </button>
  </div>
</div>
</template>

<script>
import apiActions from '../../api/api'
import {setAccount} from '../../vuex/actions'
import Passphrase from './signup/Passphrase'

export default {
  components: {
    Passphrase
  },
  data () {
    return {
      showConfirm: false,
      errMsgs: [],
      emailSubmitMsg: '获取验证码',
      seconds: 60,
      timerEmail: {}, // 允许重新发送验证信息的时间
      username: '',
      email: '',
      language: '简体中文',
      captcha: '',
      password: '',
      confirm: '',
      languageSupport: [
        '简体中文',
        '繁體中文',
        'English',
        '日本語',
        'español',
        'français',
        'ITALIAN'
      ],

      passphrase: '',
      showPassphrase: false,
      emailOk: false, // 邮箱输入完成并且格式合法
      emailPass: false // 邮箱验证通过
    }
  },
  computed: {
    usernameOk: function () {
      return this.username.length > 4 || this.username === ''
    },
    emailOk: function () {
      return this.email.length > 5 || this.email === ''
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
        this.passwordOk && this.password !== '' &&
        this.confirmOk && this.confirm !== ''
    }
  },
  methods: {
    submitEmail: function () {
      this.errMsgs = []
      this.emailPass = false
      if (!this.emailOk) {
        vm.errMsgs.push('输入正确的邮箱地址')
        return
      }
      var vm = this
      apiActions.setVerificationEmail({email: this.email}).then(resp => {
        vm.timerEmail = setInterval(function () {
          if (vm.seconds > 0) {
            vm.seconds--
            vm.emailSubmitMsg = vm.seconds + '秒后可重发'
          }
        }, 1000)
        setTimeout(function () {
          vm.seconds = 60
          vm.emailOk = !vm.emailOk
          vm.emailSubmitMsg = '获取验证码'
          clearInterval(vm.timerEmail)
        }, vm.seconds * 1000)
        vm.emailOk = !vm.emailOk
      }, resp => {
        vm.errMsgs = []
        if (resp.body !== null) {
          vm.errMsgs.push(resp.body.error)
        } else {
          vm.errMsgs.push('无法连接到服务器')
        }
        console.log(resp)
      })
    },
    verifyCaptcha: function () {
      var vm = this
      vm.errMsgs = []
      var body = {
        email: this.email,
        captcha: this.captcha,
        type: 'email'
      }
      apiActions.verifyCaptcha(body).then(resp => {
        vm.seconds = 60
        vm.emailOk = true
        vm.emailPass = true
        vm.emailSubmitMsg = '获取验证码'
        clearInterval(vm.timerEmail)
      }, resp => {
        if (resp.body !== null) {
          vm.errMsgs.push(resp.body.error)
        } else {
          vm.errMsgs.push('无法连接到服务器')
        }
        console.log(resp)
      })
    },
    submit: function () {
      this.errMsgs = []
      var body = {
        email: this.email,
        type: 'email',
        nickname: this.username,
        language: this.language,
        password: this.password
      }
      apiActions.registryUser(body).then(resp => {
        setAccount(this.$store, resp.body)
        this.passphrase = resp.body.passphrase
        this.showPassphrase = !this.showPassphrase
      }, resp => {
        this.errMsgs = []
        if (resp.body !== null) {
          this.errMsgs.push(resp.body.error)
        }
        console.log(resp)
      })
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
  cursor:pointer;
  text-decoration: none;
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