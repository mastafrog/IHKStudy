<template  lang="pug">
.app
  .header
    header-bar

  .page
    .container
      .columns
        .column
          router-view

  footer.footer
    .container
      .columns
        .column
          p Vue.js 2 Single Page App (SPA) Example with vuex and vue-router.

</template>

<script>
import HeaderBar from '@/components/HeaderBar'
/* import { actions } from '@/store/index' */
export default {
  components: {
    HeaderBar
  },

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
.page {
  padding: 30px;
}

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
