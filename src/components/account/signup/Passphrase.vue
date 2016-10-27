<template>
<div class="modal-mask" v-show="show" transition="modal">
  <div class="modal-wrapper">
    <div class="modal-container">

      <div class="modal-header">
        <slot name="header">
          <h2>您的安全种子</h2>
        </slot>
      </div>

      <div class="content">
        <strong>{{msg}}</strong>
      </div>
      <div class="alert alert-warning" role="alert">
        <strong>
          您的安全种子将不再显示。
          如果安全种子丢失，您将无法访问您的钱包。
        </strong>
      </div>

      <div class="checkbox confirm">
        <label>
          <input type="checkbox" v-model="isSave">我已经将安全种子写下来或以其它方式安全的妥善存储
        </label>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          <button class="modal-default-button"
            :disabled.sync="!isSave"
            @click="completeReg">
            确定
          </button>
        </slot>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    msg: {
      type: String,
      required: true,
      twoWay: true
    }
  },
  data () {
    return {
      isSave: false
    }
  },
  methods: {
    completeReg: function () {
      this.show = !this.show
      this.$router.go({path: '/login'})
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

.content {
  background-color: #EEE;
  font-size: 21px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  padding: 10px;
}

.confirm {
  text-align: left;
  font-size: 18px;
}
</style>