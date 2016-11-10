<template>
<div class="balance">
  <table style="width: 110px" class="table table-striped table-hover table-condensed">
    <thead>
      <td style="width: 90px">Address</td>
      <td style="width: 20px">Balance</td>
    </thead>
    <tbody v-for="key in accounts">
      <tr>
        <td>{{key.addr}}</td>
        <td><strong>{{key.balance}}</strong></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: {
    accounts: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data () {
    return {
      seconds: 90
    }
  },
  computed: {
  },
  created: function () {

  },
  ready: function () {
    console.log('balance', this.accounts)
    for (var k in this.accounts) {
      console.log('k', k)
      console.log(this.accounts[k].balance)
    }
  }
}
</script>
