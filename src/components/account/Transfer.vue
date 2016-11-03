<template>
<div class="modal-mask" v-show="show" transition="modal">
  <div class="modal-wrapper">
    <div class="modal-container">

      <div class="modal-header">
        <slot name="header">
          <h3>Transfer</h3>
        </slot>
      </div>

      <div class="form-group">
        <div class="col-sm-10">
          <div class="input-group">
            <span class="input-group-addon">
               地址
            </span>
            <input type="text" class="form-control" v-model="tAddr" placeholder="Address">
          </div>
          <div class="input-group">
            <span class="input-group-addon">
               金额
            </span>
            <input type="number" class="form-control" v-model="tAmount" placeholder="Transfer Amount">
          </div>
          <div class="input-group">
            <span class="input-group-addon">
               找零
            </span>
            <select class="form-control" v-model="chargeAddr">
              <option v-for="item in devices">{{item.address}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          <button class="modal-default-button"
            :disabled.sync="!isOk"
            @click="submit">
            确定
          </button>
          <button class="modal-default-button"
            @click="cancel">
            取消
          </button>
        </slot>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import apiActions from '../../api/api'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    devices: {
      type: Array,
      required: true,
      twoWay: true
    }
  },
  data () {
    return {
      tAddr: '',
      tAmount: 0,
      chargeAddr: this.devices[0].address
    }
  },
  vuex: {
    getters: {
      lepuscoinCc: state => state.ccLepuscoin
    }
  },
  computed: {
    isOk: function () {
      if (this.tAddr.length <= 3) {
        return false
      }
      if (this.tAmount <= 0) {
        return false
      }
      return true
    },
    txOut: function () {
      if (!this.isOk) {
        return []
      }
      return [{
        addr: this.tAddr,
        amount: parseInt(this.tAmount)
      }]
    }
  },
  methods: {
    completeReg: function () {
      this.show = !this.show
    },
    cancel: function () {
      this.show = !this.show
    },
    submit: function () {
      let addrs = []
      for (let i in this.devices) {
        addrs.push(this.devices[i].address)
      }
      console.log('from addrs.', addrs, 'to addr', this.tAddr, 'out amount.', this.tAmount)
      let ccBody = {
        name: this.lepuscoinCc.name,
        path: this.lepuscoinCc.path,
        method: 'query',
        function: 'query_addrs',
        args: addrs
      }
      apiActions.callChaincode(ccBody).then(queryResp => {
        if (queryResp.body.error) {
          console.log('error', queryResp.body.error)
          return
        }
        let txIn = this.getTx(queryResp.body.result.message)
        apiActions.getTxSeque({in: txIn, out: this.txOut}).then(txResp => {
          ccBody.method = 'invoke'
          ccBody.function = 'invoke_transfer'
          ccBody.args = [txResp.body.message]
          apiActions.callChaincode(ccBody).then(ccResp => {
            console.log('call deploy', ccResp)
            if (ccResp.body.error) {
              console.log(ccResp.body.error)
            }
            console.log('call message', ccResp.body.result.message)
            this.show = false
          }, ccResp => {
            console.log('call deploy', ccResp)
          })
        }, txResp => {
          console.log('get tx failed', txResp)
        })
      }, queryResp => {
        console.log('get coinbase tx', queryResp)
      })
    },
    getTx: function (str) {
      let ret = JSON.parse(str)
      console.log('query ret: ', ret)
      let txIn = []
      for (let addr in ret.accounts) {
        let d = ret.accounts[addr]
        for (let hi in d.txouts) {
          let hashIndex = hi.split(':')
          txIn.push({
            addr: addr,
            pre_tx_hash: hashIndex[0],
            tx_out_index: hashIndex[1],
            balance: d.txouts[hi].value
          })
        }
      }
      return txIn
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.confirm {
  text-align: left;
  font-size: 18px;
}
</style>