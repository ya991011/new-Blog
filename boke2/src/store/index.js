import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serachData: [],
  },
  mutations: {
    serach(state, data) {
      state.serachData = data;
    },
  },
  actions: {},
  modules: {},
});
