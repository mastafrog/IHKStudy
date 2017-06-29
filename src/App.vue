<template>
<div class="app">
  <div class="header">
    <header-bar></header-bar>
  </div>
  <div class="page">
    <div class="container">
      <div class="columns">
        <div class="column">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p>Vue.js 2 Single Page App (SPA) Example with vuex and vue-router.</p>
          <a href="https://github.com/skyronic/vue-spa">View Source Code</a>
        </div>
      </div>
    </div>
  </footer>

</div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
/* import { actions } from '@/store/index' */
export default {
  components: {
    HeaderBar
  },
  /*  vuex: {
    actions: actions
  },  */
  name: 'app'
}
</script>

<style>
app {

}
body {
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
