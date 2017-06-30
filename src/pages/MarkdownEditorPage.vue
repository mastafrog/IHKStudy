<template  lang="pug">
#editor
  textarea :value="input" @input="update"
  div v-html="compiledMarkdown"
</template>

<script>
</script>
