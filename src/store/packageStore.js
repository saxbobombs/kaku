import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0'
},
  getters: {
    appVersion: (state) => {
      return state.packageVersion
    }
  }
})