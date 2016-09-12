<template>
  <div id="main-nav">
    <header>Farmer</header>
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
                  <a class="list-group-item active" v-link="{path:'/dashboard'}">Dash Board</a>
                <!-- </li> -->
                <!-- <li> -->
                  <a class="list-group-item" v-link="{path:'/dashboard'}">Home</a>
                <!-- </li> -->
                <!-- <li> -->
                  <a class="list-group-item" v-link="{path:'/dashboard'}">About</a>
                <!-- </li> -->
                <!-- <li> -->
                  <a class="list-group-item" v-link="{path:'/dashboard'}">Projects</a>
                <!-- </li> -->
                <!-- <li> -->
                  <a class="list-group-item" v-link="{path:'/dashboard'}">Contact</a>
                <!-- </li> -->
              <!-- </ul> -->
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
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      title: 'Welcome'
    }
  },
  computed: {
  },
  ready () {
    let path = this.$route.path
    if (path.length > 0) {
      let arr = path.split('/')
      if (arr.length > 1) {
        this.$data.title = arr[1]
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
