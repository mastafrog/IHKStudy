<template>
<div id="mdeditor" :class="[showMenu ? 'show-menu' : '', 'app']">
  <sideMenu />
  <main>
    <navBar />
    <section>
      <inputer />
      <outputer />
    </section>
  </main>
</div>
</template>

<script>
import sideMenu from '../components/MarkdownEditor/sideMenu.vue'
import navBar from '../components/MarkdownEditor/navBar.vue'
import inputer from '../components/MarkdownEditor/inputer.vue'
import outputer from '../components/MarkdownEditor/outputer.vue'
console.log('jojojo')
export default {
  components: {
    sideMenu,
    navBar,
    inputer,
    outputer
  },
  mounted () {
    this.$store.dispatch('loadCache')
  },
  computed: {
    showMenu () {
      return this.$store.state.showMenu
    }
  }
}
</script>

<style lang="less">
@import url( '../components/MarkdownEditor/markdown.less');

</style>
