<template>
  <div id="account">
    <div>
      <div>
        Name: <h4>{{account.nicename}}</h4>
      </div>
      <div>
        Email: <h4>{{account.email}}</h4>
      </div>
      <div>
        Phone: <h4>{{account.phone}}</h4>
      </div>

      <div>
        <a @click="sub">aasdafsdf</a>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'hello'
    }
  },
  methods: {
    syncAccount: function () {
      console.log('[data]', '[...]')
    },
    sub: function () {
      console.log(this.$route)
      this.$router.go({path: '/login'})
      console.log('clicked', '[...]')
    }
  },
  vuex: {
    getters: {
      account: state => state.account
    }
  }
}
</script>
