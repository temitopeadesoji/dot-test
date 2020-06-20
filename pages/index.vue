<template>
  <div>Welcome</div>
</template>

<script>
export default {
  asyncData({ redirect }) {
    return redirect("/search");
  }
};
</script>

<style lang="scss" scoped>
</style>