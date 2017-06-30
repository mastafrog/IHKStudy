<template lang="pug">
nav.nav.is-outlined.has-shadow
  .container
    .nav-left
      router-link.nav-item(to='/') Home
      router-link.nav-item(to='/quiz') Quiz
      router-link.nav-item(to='/editor') Editor ({{ cartCount }})

    span.nav-toggle
      span
      span
      span
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
