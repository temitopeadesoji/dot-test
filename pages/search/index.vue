<template>
  <div class="search-page" id="searchPage">
    <template v-if="!queryParam">
      <div class="search-container">
        <h2 class="text-normal">
          <search-icon class="search-icon" />Search more than
          <strong>174M</strong> repositories
        </h2>
        <form
          id="search_form"
          class="mb-20 mt-20"
          action="/search"
          accept-charset="UTF-8"
          method="get"
        >
          <div class="row d-flex flex-wrap">
            <div class="column xs-12 sm-8 md-8 mb-10">
              <input
                aria-label="Search GitHub"
                autocapitalize="off"
                autocomplete="off"
                autofocus
                class="form-control input-block"
                data-hotkey="s"
                name="q"
                placeholder="Search GitHub"
                spellcheck="false"
                type="text"
              />
              <input name="type" type="hidden" value="Users" />
              <input name="o" type="hidden" value="desc" />
            </div>
            <div class="column xs-12 sm-4 md-4 mb-10 align-left">
              <button class="btn btn-sm-block" type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
    </template>
    <template v-else>
      <div class="row d-flex flex-wrap">
        <div class="column xs-12 sm-3 md-3 mb-10">
          <side-nav :count="{ ...searchData, items: '' }" />
        </div>
        <div class="column xs-12 sm-9 md-9 mb-10">
          <div class="row d-flex flex-wrap position-relative top-result mb-20">
            <h3>{{ numberWithCommas(searchData.total_count || 0) }} users</h3>

            <details class="select-menu">
              <summary
                id="sortButton"
                class="btn btn-sm select-menu-button"
                aria-haspopup="menu"
                role="button"
              >
                <i>Sort:</i>
                <template v-for="(n, i) in sortItems">
                  <span
                    :key="`selected${i}`"
                    v-if="querySort == n.value && queryOrder == n.order"
                    class="select-menu-item-text"
                  >{{ n.title }}</span>
                </template>
              </summary>
              <div
                class="select-menu-modal absolute-position right-0"
                style="z-index: 99;"
                aria-label="Sort options"
                role="menu"
              >
                <div class="select-menu-header" tabindex="-1">
                  <span class="select-menu-title">Sort options</span>
                </div>
                <div class="select-menu-list">
                  <template v-for="(n, i) in sortItems">
                    <nuxt-link
                      tag="a"
                      :key="i"
                      class="select-menu-item"
                      aria-checked="true"
                      @click.native="goToLink(1, n.order, n.value)"
                      :to="`/search?o=${n.order}&q=${queryParam}&s=${n.value}&type=${queryType}`"
                    >
                      <check-icon
                        v-show="querySort == n.value && queryOrder == n.order"
                        class="select-menu-item-icon"
                      />
                      <span class="select-menu-item-text">{{ n.title }}</span>
                    </nuxt-link>
                  </template>
                </div>
              </div>
            </details>
          </div>
          <div class="result_list" v-if="searchData && searchData.items">
            <template v-for="(n, i) in searchData.items">
              <div :key="i" class="user-list-item d-flex">
                <div>
                  <a class="d-table" :href="`https://github.com/${n.login}`">
                    <img
                      class="avatar-user"
                      style="margin-top: 2px;"
                      :src="`${n.avatar_url}`"
                      width="20"
                      height="20"
                      :alt="`@${n.login}`"
                    />
                  </a>
                </div>

                <div class="info-box">
                  <div class="d-flex">
                    <div class="text-normal">
                      <a class="mr-10" :href="`https://github.com/${n.login}`">{{ n.name }}</a>

                      <a class="text-gray" :href="`https://github.com/${n.login}`">{{ n.login }}</a>
                    </div>

                    <div class="follow_button" v-if="n.type == 'User'">
                      <span class="user-following-container">
                        <form action="https://github.com" accept-charset="UTF-8" method="post">
                          <input
                            type="submit"
                            name="commit"
                            value="Follow"
                            class="btn btn-sm"
                            :title="`Follow ${n.login}`"
                            aria-label="Follow this person"
                            data-disable-with="Follow"
                          />
                        </form>
                      </span>
                    </div>
                  </div>

                  <p class="mb-10">{{ n.bio || n.description }}</p>

                  <div class="d-flex text-small">
                    <div class="mr-10">{{ n.location }}</div>

                    <div>
                      <a class="muted-link" :href="`mailto:${n.email}`">{{ n.email }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="paginate-container">
        <div
          v-if="totalPages > 0"
          role="navigation"
          aria-label="Pagination"
          class="d-flex pagination"
          data-pjax="true"
        >
          <span v-if="!queryPage || queryPage == 1" class="previous_page disabled">Previous</span>
          <nuxt-link
            v-else
            tag="a"
            class="next_page"
            rel="next"
            :to="`/search?p=${Number(queryPage) - 1}&o=${queryOrder}&q=${queryParam}&s=${querySort}&type=${queryType}`"
          >Previous</nuxt-link>
          <template v-for="(pageNumber, i) in totalPages">
            <em :key="`${i}-current`" class="current" v-if="queryPage == pageNumber">{{ queryPage }}</em>
            <span
              :key="`${i}-aftergap`"
              v-if="pageNumber == totalPages-1 && Math.abs(pageNumber - queryPage) > 3"
              class="gap"
            >…</span>
            <nuxt-link
              :key="i"
              tag="a"
              @click.native="goToLink(pageNumber)"
              v-if="(Math.abs(pageNumber - queryPage) < 3 || pageNumber >= totalPages-1 || pageNumber <= 2) && queryPage != pageNumber"
              :to="`/search?p=${pageNumber}&o=${queryOrder}&q=${queryParam}&s=${querySort}&type=${queryType}`"
            >{{ pageNumber }}</nuxt-link>
            <span
              :key="`${i}-beforegap`"
              v-if="pageNumber == 2 && Math.abs(pageNumber - queryPage) > 3"
              class="gap"
            >…</span>
          </template>
          <span v-if="!queryPage || queryPage >= totalPages" class="previous_page disabled">Next</span>
          <nuxt-link
            v-else
            tag="a"
            class="next_page"
            rel="next"
            :to="`/search?p=${Number(queryPage) + 1}&o=${queryOrder}&q=${queryParam}&s=${querySort}&type=${queryType}`"
          >Next</nuxt-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SearchIcon from "~/components/icons/search";
import CheckIcon from "~/components/icons/check";
import SideNav from "~/components/nav/search/side";

export default {
  components: {
    CheckIcon,
    SearchIcon,
    SideNav
  },
  data() {
    return {
      sortItems: [
        {
          title: "Best match",
          order: "desc",
          value: ""
        },
        {
          title: "Most followers",
          order: "desc",
          value: "followers"
        },
        {
          title: "Fewest followers",
          order: "asc",
          value: "followers"
        },
        {
          title: "Most recently joined",
          order: "desc",
          value: "joined"
        },
        {
          title: "Least recently joined",
          order: "asc",
          value: "joined"
        },
        {
          title: "Most repositories",
          order: "desc",
          value: "repositories"
        },
        {
          title: "Least repositories",
          order: "asc",
          value: "repositories"
        }
      ],
      queryPage: this.$route.query.p || 1,
      queryCursor: this.$route.query.c || null,
      querySort: this.$route.query.s || "",
      queryOrder: this.$route.query.o || "desc",
      queryParam: this.$route.query.q,
      queryType: this.$route.query.type || "users",
      itemsPerPage: 10,
      searchData: {}
    };
  },
  async asyncData({ store, route }) {
    if (!route.query.type) {
      return true;
    } else {
      const resp = await store.dispatch("fetchData", {
        queryType: route.query.type || "users",
        queryPage: route.query.p || 0,
        queryOrder: route.query.o || "desc",
        queryParam: route.query.q || "",
        querySort: route.query.s || "",
        itemsPerPage: 10
      });
      return { searchData: resp.data };
    }
  },
  computed: {
    totalPages: function() {
      let total = Math.ceil(this.searchData.total_count / this.itemsPerPage);
      return total <= 100 ? total : 100;
    }
  },
  methods: {
    async goToLink(pageNumber, order, sort) {
      this.queryPage = pageNumber;
      this.querySort = sort || sort == "" ? sort : this.querySort;
      this.queryOrder = order || this.queryOrder;
      const resp = await this.$store.dispatch("fetchData", {
        queryType: this.queryType,
        queryPage: this.queryPage,
        queryOrder: this.queryOrder,
        queryParam: this.queryParam,
        querySort: this.querySort,
        itemsPerPage: 10
      });
      this.searchData = resp.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-page {
  .search-container {
    padding: 40px !important;
    h2 {
      .search-icon {
        vertical-align: text-bottom;
        display: inline-block;
        fill: currentColor;
        margin-right: 10px;
      }
    }
  }
  .top-result {
    justify-content: space-between !important;
    details {
      summary {
      }
      &[open] > summary {
        &:before {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 80;
          display: block;
          cursor: default;
          content: " ";
          background: transparent;
        }
      }
      & > summary {
        list-style: none;
      }
      .select-menu-modal {
        position: relative;
        right: 0 !important;
        width: 300px;
        margin-top: 4px;
        margin-bottom: 20px;
        overflow: hidden;
        font-size: 12px;
        color: #586069;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(27, 31, 35, 0.15);
        border-radius: 3px;
        box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);
        .select-menu-header {
          padding: 8px 10px;
          line-height: 16px;
          background: #f6f8fa;
          border-bottom: 1px solid #e1e4e8;
        }
        .select-menu-item {
          display: block;
          padding: 8px 8px 8px 30px;
          overflow: hidden;
          color: inherit;
          cursor: pointer;
          border-bottom: 1px solid #eaecef;
          text-align: left;
          background-color: #fff;
          border-top: 0;
          border-right: 0;
          border-left: 0;
          &-icon {
            display: inline-block;
            vertical-align: middle;
            float: left;
            margin-left: -20px;
            fill: inherit;
          }
          &:hover {
            background-color: blue;
            color: $white;
            .select-menu-item-icon {
              fill: $white;
            }
          }
        }
      }
    }
  }
  .result_list {
    .user-list-item {
      border-top: 1px solid #e1e4e8;
      padding-top: 24px !important;
      padding-bottom: 24px !important;
      .avatar-user {
        border-radius: 4px;
        margin-right: 10px;
      }
      .info-box {
        width: 100%;
      }
      .follow_button {
        text-align: right;
        flex: auto;
        flex-shrink: 0;
      }
    }
  }
  .paginate-container {
    margin-top: 20px;
    margin-bottom: 15px;
    text-align: center;
    .pagination {
      display: inline-block !important;
      & > :first-child {
        display: inline-block;
        margin-left: 0;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
      &:before {
        display: table;
        content: "";
      }
      .current {
        z-index: 3;
        color: #fff;
        background-color: $blue;
        border-color: $blue;
      }
      .gap,
      .disabled {
        color: #d1d5da;
        cursor: default;
        background-color: #fafbfc;
      }
      span,
      a,
      em {
        position: relative;
        float: left;
        padding: 7px 12px;
        margin-left: -1px;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        color: #0366d6;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background: #fff;
        border: 1px solid #e1e4e8;
      }
    }
  }
}
</style>