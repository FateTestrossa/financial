import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //state 定义了应用状态的数据结构，同样可以在这里设置默认的初始状态
  state: {
    nowDate: null,
    change: 0,
    recordShow: false,
    userShow: false
  },
  //Actions 即是定义提交触发更改信息的描述
  actions: {
  },
  //mutations 是唯一允许更新应用状态的地方
  mutations: {
    nowDate(state, nowDate) {
      state.nowDate = nowDate
    },
    //数据改变了
    change(state, val) {
      state.change = state.change + val
    },
    recordShow(state, val) {
      state.recordShow = val
    },
    userShow(state, val) {
      state.userShow = val
    },
  },
  //Getters 允许组件从 Store 中获取数据
  getters: {
  }
})
