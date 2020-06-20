/* eslint-disable no-empty-pattern */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async fetchData(
    {},
    { queryType, queryPage, queryOrder, queryParam, querySort, itemsPerPage }
  ) {
    const resp = await this.$axios.get(
      `search/${queryType.toLowerCase()}?page=${queryPage}&order=${queryOrder}&q=${queryParam}&sort=${querySort}&per_page=${itemsPerPage}`
    );
    return resp;
  }
};
