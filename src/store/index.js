import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user"))
  },
  getters: {
    user: state => state.user,
    token: state => state.token
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
