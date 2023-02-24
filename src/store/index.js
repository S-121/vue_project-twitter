import Vue from 'vue'
import Vuex from 'vuex'
import Post from  '@/store/Post/index'
import Home from '@/store/Home/index'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Post,
    Home
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  strict: debug
})
