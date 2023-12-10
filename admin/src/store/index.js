import { createStore } from 'vuex'
import { createVuexPersistedState } from "vue-persistedstate";
export default createStore({
  state: {
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    changeUserInfo(state, value) {
      state.userInfo = value
    }

  },
  actions: {
  },
  modules: {
  },
  //持久化存储vuex数据
  plugins: [
    createVuexPersistedState(['userInfo']),
  ],
})
