import Vue from 'vue'
import Vuex from 'vuex'
import env from '_conf/env'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: env !== 'production',
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
