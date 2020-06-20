<template>
  <div class="relative-position header-wrapper" id="topPage">
    <header class="page-header">
      <github-logo />
    </header>
  </div>
</template>
<script>
import GithubLogo from "~/components/icons/logo";
export default {
  components: {
    GithubLogo
  }
};
</script>
<style lang="scss" scoped>
.header-wrapper {
  .page-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 16px;
    color: hsla(0, 0%, 100%, 0.7);
    background-color: $primary;
    @include respond-phone {
      padding: 16px;
    }
  }
}
</style>