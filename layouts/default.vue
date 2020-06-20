<template>
  <div class="app_main">
    <div>
      <top-nav />
      <div class="app_main_content">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from "~/components/nav/top";
export default {
  components: {
    TopNav
  }
};
</script>
<style lang="scss" scoped>
.app_main {
  min-height: 100vh;
  .logo-icon {
    margin: 10px 20px;
    width: 240px;
    padding: 10px;
    @include respond-phone {
      width: 200px;
    }
  }
  &_content {
    margin: 0 auto;
    padding: 20px;
    max-width: 1000px;
    min-height: 100%;
  }
}
</style>