<template>
  <nav class="nav is-outlined has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item" to="/">Home</router-link>
        <router-link class="nav-item" to="/quiz">Quiz</router-link>
        <router-link class="nav-item" to="/cart">Cart ({{ cartCount }})</router-link>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'cartCount'

    ])
  }
}
</script>

<style>
.menu-links a {
  display: inline-block;
  text-decoration: none;
  color: #555;
  margin-right: 30px;
}
</style>
