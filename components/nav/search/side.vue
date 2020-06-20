<template>
  <nav class="menu">
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Repositories">
      Repositories
      <span class="counter">{{ trimNumber(count.repositoryCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Code">
      Code
      <span class="counter">{{ trimNumber(count.codeCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Commits">
      Commits
      <span class="counter">{{ trimNumber(count.commitCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Issues">
      Issues
      <span class="counter">{{ trimNumber(count.issueCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Discussions">
      <span>Discussions</span>
      <span class="counter">{{ trimNumber(count.discussionCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=RegistryPackages">
      Packages
      <span class="counter">{{ trimNumber(count.packageCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Marketplace">
      Marketplace
      <span class="counter">{{ trimNumber(count.marketplaceCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Topics">
      Topics
      <span class="counter">{{ trimNumber(count.topicsCount || 0) }}</span>
    </a>
    <a class="menu-item" href="https://github.com/search?q=temit&amp;type=Wikis">
      Wikis
      <span class="counter">{{ trimNumber(count.wikiCount || 0) }}</span>
    </a>
    <a class="menu-item selected" href="/search?q=temit&amp;type=Users">
      Users
      <span class="counter">{{ trimNumber(count.userCount || count.total_count || 0) }}</span>
    </a>
  </nav>
</template>
<script>
export default {
  props: {
    count: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.menu {
  margin-bottom: 15px;
  list-style: none;
  background-color: $white;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  &-item {
    position: relative;
    display: block;
    padding: 8px 10px;
    border-bottom: 1px solid #e1e4e8;
    &.selected:before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 2px;
      content: "";
      background-color: $red;
    }
    &:first-child {
      border-top: 0;
      border-top-right-radius: 2px;
    }
    &:last-child {
      border-bottom: 0;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      &:before {
        border-bottom-left-radius: 2px;
      }
    }
    .counter {
      float: right;
      color: $white;
      background-color: #6a737d;
      display: inline-block;
      padding: 2px 5px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
      border-radius: 20px;
    }
  }
}
</style>