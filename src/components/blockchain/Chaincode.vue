<template>
  <div id="chaincode">
    <h2>Transaction</h2>{{ccBody|json}}

    <div id="err-msg" class="alert alert-danger" role="alert" v-if="errMsgs.length !== 0">
      <p v-for="err in errMsgs">{{err}}</p>
    </div>

    <div class="form-horizontal" >
      <div class="form-group">
        <label for="inputArgs" class="col-sm-1 control-label">Chaincode</label>
        <div class="col-sm-10">
          <div class="input-group">
            <span class="input-group-addon">
               Path
            </span>
            <input type="text" class="form-control" v-model="ccPath" placeholder="Path and name two choose one">
          </div>
          <div class="input-group">
            <span class="input-group-addon">
               Name
            </span>
            <input type="text" class="form-control" v-model="ccName" placeholder="Path and name two choose one">
          </div>
          <div class="input-group">
            <span class="input-group-addon">
               Method
            </span>
            <select class="form-control" v-model="ccMethod">
              <option v-for="item in ccMethodEna">{{item}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="inputArgs" class="col-sm-1 control-label">Args</label>
        <div class="col-sm-10">
          <div class="input-group">
            <span class="input-group-addon">
               Function
            </span>
            <input v-if="funcs.length===0" type="text" class="form-control" v-model="ccFunction">
            <select v-else class="form-control" v-model="ccFunction">
              <option v-for="item in funcs">{{item}}</option>
            </select>
          </div>
          <div class="input-group">
            <span class="input-group-addon">
               Args
            </span>
            <label for="inputArgs" class="form-control" disabled >{{argString}}</label>
          </div>

          <div  v-for="(index, arg) in args" track-by="$index">
            <input type="text" class="form-control" id="inputArgs-{{index}}" v-model="arg" @keyup="change(index, $event)">  
          </div>          
        </div>
      </div >

      <div class="form-group">
        <label for="inputArgs" class="col-sm-1 control-label">SecureContext</label>
        <div class="col-sm-10">
          <div class="input-group">
            <span class="input-group-addon">
              <input type="checkbox" v-model="useSecure">
            </span>
            <input type="text" class="form-control" :disabled.sync="!useSecure" v-model="ccSecureContext">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-1 col-sm-10">
         <button type="submit" class="btn btn-default" @click="submit">Submit</button>
        </div>
      </div>

      <div class="alert alert-success" role="alert" v-if="retMsg != ''">
        <p>{{retMsg}}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import apiActions from '../../api/api'
// import {addChaincode} from '../../vuex/actions'

export default {
  data () {
    return {
      errMsgs: [],
      ccPath: 'github.com/conseweb/common/assets/lepuscoin',
      ccName: '',
      ccFunction: '',
      useSecure: false,
      ccSecureContext: '',
      ccMethod: 'deploy',
      ccMethodEna: ['deploy', 'invoke', 'query'],
      args: [''],
      retMsg: ''
    }
  },
  vuex: {
    getters: {
      chaincodes: state => state.chaincode
    }
  },
  ready: function () {
    console.log('ready Chaincode', this.chaincodes)
  },
  computed: {
    cName: function () {
      return ''
    },
    funcs: function () {
      for (var index in this.chaincodes) {
        let cc = this.chaincodes[index]
        if ((cc.name !== '' && cc.name === this.ccName) ||
          (cc.path !== '' && cc.path === this.ccPath)) {
          this.ccFunction = cc.methods[this.ccMethod][0]
          return cc.methods[this.ccMethod]
        }
      }
      return []
    },
    argString: function () {
      if (this.args.length === 1) {
        return '[]'
      }
      return JSON.stringify(this.ccArgs)
    },
    ccArgs: function () {
      return this.args.slice(0, this.args.length - 1)
    },
    ccBody: function () {
      var b = {
        name: this.ccName,
        path: this.ccPath,
        method: this.ccMethod,
        function: this.ccFunction,
        args: this.ccArgs
      }
      if (this.useSecure) {
        b.secureContext = this.ccSecureContext
      }
      return b
    }
  },
  methods: {
    change: function (index, arg) {
      if (index + 1 === this.args.length) {
        this.args.push('')
      } else if (index + 2 === this.args.length && this.args[this.args.length - 2] === '') {
        this.args.pop()
      }
      console.debug(this.args)
    },
    submit: function () {
      this.errMsgs = []
      this.retMsg = ''
      if (this.ccName === '' && this.ccPath === '') {
        this.errMsgs.push('Path and name need at least one')
        return
      }
      if (this.ccFunction === '') {
        this.errMsgs.push('need function')
        return
      }

      apiActions.callChaincode(this.ccBody).then(resp => {
        if (resp.body.error != null) {
          this.errMsgs.push(resp.body.error.message)
          this.errMsgs.push(resp.body.error.code)
          this.errMsgs.push(resp.body.error.data)
          return
        }
        if (resp.body.result != null) {
          this.retMsg = resp.body.result.message
          return
        }
        // addChaincode(this.$store, this.ccBody)
        console.log(resp)
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
