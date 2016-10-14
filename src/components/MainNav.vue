<template>
  <div id="main-nav">
    <div class="row">
      <div class="col-xs-6 col-md-2">
        <div id="sidebar" class="container-fluid">
          <div id="sidebar-title" class="row">
            <h1>{{ title | capitalize }}</h1>
          </div>
          <div class="row">
            <nav id="main-nav" class="list-group">
              <!-- <ul> -->
                <!-- <li> -->
              <!-- <a class="list-group-item active" v-link="{path:'/dashboard'}">Dash Board</a> -->
              <a v-for="link in columns"
                class="list-group-item"
                :class="{active: archiveKey === link.path}"
                role="presentation"
                @click="checkout(link.path)"
                v-link="{path:link.path}"
                value="{link.disc}">{{link.desc}}</a>
            </nav>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-10"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!',
      title: 'BalaBala',
      columns: [
        {path: '/dashboard', desc: 'Dash Board'},
        {path: '/account', desc: '账户'},
        {path: '/chaincode', desc: '交易'},
        {path: '/block', desc: '区块'},
        {path: '/network', desc: '网络'},
        {path: '/setting', desc: '设置'}
      ],
      archiveKey: ''
    }
  },
  methods: {
    checkout: function (key) {
      this.archiveKey = key
    }
  },
  computed: {
  },
  ready: function () {
    let path = this.$route.path
    if (path.length > 0) {
      let arr = path.split('/')
      if (arr.length > 1) {
        this.archiveKey = '/' + arr[1]
      }
    }
  }
}
</script>

<style>
h1 {
  color: #42b983;
}

#sidebar {
  margin: 5px;
}

#sidebar-title {
  text-align: center;
}

#main-nav {
  margin-top: 10px;
}

.list-group-item {
  border: 0;
  text-align: center;
}

.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus {
  background-color: #42b983;
}

ul li a {
  background-color: #DDD;
}
</style>
