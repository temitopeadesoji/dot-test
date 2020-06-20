<template>
  <div class="false_content">
    <div class="content_image">
      <img class="no-network" src="/404.svg" />
    </div>
    <h1 class="content_title">404 Error</h1>
    <h1 class="content_title_sub">Page not found</h1>
    <nuxt-link to="/search" tag="button" class="mt-40">Return Home</nuxt-link>
  </div>
</template>
<script>
export default {
  name: "NuxtError"
};
</script>
<style lang="scss" scoped>
.no-network {
  width: 220px;
  margin: 0 auto;
}
h1 {
  font-size: 1.7em;
  font-weight: 900;
  &.content_title_sub {
    font-size: 1em;
  }
}
</style>